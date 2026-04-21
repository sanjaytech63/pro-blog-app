import { Comment } from '@/models/comment.model'
// import { cache } from '@/lib/cache'
import ApiError from '@/utils/ApiError'
import { CommentEntity } from '@/types/comment'

class CommentService {
  async create(
    userId: string,
    postId: string,
    content: string,
    parent?: string | null,
  ) {
    if (!content?.trim()) {
      throw new ApiError(400, 'Comment is required')
    }

    const comment = await Comment.create({
      user: userId,
      post: postId,
      content,
      parent: parent || null,
    })

    return comment
  }

  async delete(userId: string, commentId: string) {
    const comment = await Comment.findById(commentId)
    if (!comment) throw new ApiError(404, 'Comment not found')

    if (comment.user.toString() !== userId) {
      throw new ApiError(403, 'Unauthorized')
    }

    await Comment.deleteMany({
      $or: [{ _id: commentId }, { parent: commentId }],
    })

    return true
  }

  async list(postId: string, userId?: string) {
    const comments = await Comment.find({ post: postId })
      .populate('user', 'fullName avatar')
      .sort({ createdAt: 1 })
      .lean()

    const map = new Map<string, CommentEntity>()
    const roots: CommentEntity[] = []

    comments.forEach((c) => {
      map.set(c._id.toString(), {
        _id: c._id.toString(),
        content: c.content,
        createdAt: c.createdAt.toISOString(),
        user: {
          fullName: c.user.fullName,
          avatar: c.user.avatar,
        },
        isOwner: userId ? c.user._id.toString() === userId : false,
        children: [],
      })
    })

    comments.forEach((c) => {
      const node = map.get(c._id.toString())
      if (!node) return

      if (c.parent) {
        const parent = map.get(c.parent.toString())
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(node)
        }
      } else {
        roots.push(node)
      }
    })

    return roots
  }
}

export const commentService = new CommentService()
