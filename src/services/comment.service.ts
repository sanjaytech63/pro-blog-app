import { Comment } from '@/models/comment.model'
import ApiError from '@/utils/ApiError'

class CommentService {
  async create(
    userId: string,
    postId: string,
    content: string,
    parent?: string,
  ) {
    if (!content || content.trim() === '') {
      throw new ApiError(400, 'Comment is required')
    }

    return await Comment.create({
      user: userId,
      post: postId,
      content,
      parent: parent || null,
    })
  }

  async list(postId: string) {
    return await Comment.find({ post: postId })
      .populate('user', 'fullName avatar')
      .sort({ createdAt: -1 })
      .lean()
  }
}

export const commentService = new CommentService()
