import { User } from '@/src/models/user.model'
import ApiError from '@/src/utils/ApiError'
import { UpdateProfileDto } from '@/src/validators/user.schema'

class UserService {
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await User.findByIdAndUpdate(userId, dto, {
      new: true,
    }).select('-password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    return user
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password')
    if (!user) throw new ApiError(404, 'User not found')
    return user
  }
}

export const userService = new UserService()
