import { Like } from '@/models/like.model'
import { Types } from 'mongoose'

class LikeService {
  async toggleLike(userId: string, postId: string) {
    const existing = await Like.findOne({
      user: userId,
      post: postId,
    })

    let liked: boolean

    if (existing) {
      await existing.deleteOne()
      liked = false
    } else {
      await Like.create({
        user: userId,
        post: postId,
      })
      liked = true
    }

    const likesCount = await Like.countDocuments({
      post: new Types.ObjectId(postId),
    })

    return {
      liked,
      likesCount,
    }
  }
}

export const likeService = new LikeService()
