import { Like } from '@/models/like.model'
import { Post } from '@/models/post.model'
import ApiError from '@/utils/ApiError'
import mongoose from 'mongoose'

class LikeService {
  async toggleLike(userId: string, postId: string) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ApiError(400, 'Invalid post id')
    }

    const post = await Post.findById(postId)
    if (!post) throw new ApiError(404, 'Post not found')

    const existing = await Like.findOne({ user: userId, post: postId })

    if (existing) {
      await existing.deleteOne()

      await Post.findByIdAndUpdate(postId, {
        $inc: { likesCount: -1 },
      })

      return { liked: false }
    }

    await Like.create({
      user: userId,
      post: postId,
    })

    await Post.findByIdAndUpdate(postId, {
      $inc: { likesCount: 1 },
    })

    return { liked: true }
  }
}

export const likeService = new LikeService()
