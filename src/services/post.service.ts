import { Post } from '@/models/post.model'
import ApiError from '@/utils/ApiError'
import slugify from 'slugify'
import cloudinary from '@/lib/cloudinary'
import { CreatePostDto, UpdatePostDto } from '@/validators/post.schema'
import mongoose from 'mongoose'
import { cache } from '@/lib/cache'

interface ListPostsQuery {
  page?: number
  limit?: number
  search?: string
  status?: 'DRAFT' | 'PUBLISHED'
  category?: string
  includeDeleted?: boolean
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
}

type MongoFilter = ListPostsQuery & {
  isDeleted?: boolean
  $text?: { $search: string }
}

class PostService {
  private async generateUniqueSlug(title: string) {
    const baseSlug = slugify(title, { lower: true, strict: true })
    let slug = baseSlug
    let counter = 1

    while (await Post.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`
    }

    return slug
  }

  async create(userId: string, dto: CreatePostDto) {
    const slug = await this.generateUniqueSlug(dto.title)

    let imageUrl: string | undefined

    if (dto.coverImageBase64) {
      const upload = await cloudinary.uploader.upload(dto.coverImageBase64, {
        folder: 'posts',
      })
      imageUrl = upload.secure_url
    }

    const post = await Post.create({
      ...dto,
      slug,
      coverImage: imageUrl,
      author: userId,
    })

    return post
  }

  async list(query: ListPostsQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      category,
      includeDeleted = false,
    } = query

    const cacheKey = `posts:list:${JSON.stringify(query)}`

    const cached = await cache.get<typeof result>(cacheKey)
    if (cached) return cached

    const filter: MongoFilter = {}

    if (!includeDeleted) filter.isDeleted = false
    if (status) filter.status = status
    if (category) filter.category = category

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ]
    }

    const [data, total] = await Promise.all([
      Post.find(filter)
        .populate('author', 'fullName email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter),
    ])

    const result = {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }

    await cache.set(cacheKey, result, 60)

    return result
  }

  async getBySlug(slug: string) {
    const cacheKey = `post:slug:${slug}`

    const cached = await cache.get(cacheKey)
    if (cached) return cached

    const post = await Post.findOne({
      slug,
      isDeleted: false,
      status: 'PUBLISHED',
    })
      .populate('author', 'fullName avatar')
      .lean()

    if (!post) throw new ApiError(404, 'Post not found')

    const result = {
      ...post,
      author: {
        fullName: post.author?.fullName ?? 'Unknown Author',
        avatar: post.author?.avatar ?? '/images/default-avatar.png',
      },
    }

    await cache.set(cacheKey, result, 300)

    return result
  }

  async getById(postId: string) {
    if (!mongoose.Types.ObjectId.isValid(postId))
      throw new ApiError(400, 'Invalid post id')

    const post = await Post.findById(postId)
      .populate('author', 'fullName email')
      .lean()

    if (!post) throw new ApiError(404, 'Post not found')

    return post
  }

  async update(postId: string, dto: UpdatePostDto) {
    const post = await Post.findById(postId)

    if (!post || post.isDeleted) throw new ApiError(404, 'Post not found')

    if (dto.title) {
      post.slug = await this.generateUniqueSlug(dto.title)
    }

    if (dto.coverImageBase64) {
      const upload = await cloudinary.uploader.upload(dto.coverImageBase64, {
        folder: 'posts',
      })
      dto.coverImageBase64 = undefined
      post.coverImage = upload.secure_url
    }

    Object.assign(post, dto)

    await post.save()

    return post
  }

  async softDelete(postId: string, adminId: string) {
    const post = await Post.findOneAndUpdate(
      { _id: postId, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,
      },
      { new: true },
    )

    if (!post) throw new ApiError(404, 'Post not found')

    return post
  }

  async restore(postId: string) {
    const post = await Post.findOneAndUpdate(
      { _id: postId, isDeleted: true },
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      { new: true },
    )

    if (!post) throw new ApiError(404, 'Post not found or not deleted')

    return post
  }

  async hardDelete(postId: string) {
    const post = await Post.findByIdAndDelete(postId)

    if (!post) throw new ApiError(404, 'Post not found')

    return true
  }

  async getCategoriesWithCount(status: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED') {
    return await Post.aggregate([
      {
        $match: {
          isDeleted: false,
          status,
        },
      },
      {
        $group: {
          _id: {
            $toLower: '$category',
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          slug: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ])
  }
}

export const postService = new PostService()
