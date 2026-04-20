import { cache } from '@/lib/cache'
import { User } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { UpdatePasswordDto } from '@/validators/auth.schema'
import { UpdateProfileDto } from '@/validators/user.schema'
import bcrypt from 'bcryptjs'

interface ListUsersQuery {
  page?: number
  limit?: number
  search?: string
  includeDeleted?: boolean
  isDeleted?: boolean
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
}

class UserService {
  async getProfile(userId: string) {
    const cacheKey = `user:profile:${userId}`

    const cached = await cache.get(cacheKey)
    if (cached) return cached

    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      '-password',
    )

    if (!user) throw new ApiError(404, 'User not found')
    await cache.set(cacheKey, user, 300)

    return user
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      dto,
      { new: true },
    ).select('-password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    return user
  }

  async softDeleteUser(userId: string, adminId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,
      },
      { new: true },
    ).select('-password')

    if (!user) throw new ApiError(404, 'User not found or already deleted')
    return user
  }

  async restoreUser(userId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: true },
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      { new: true },
    ).select('-password')

    if (!user) throw new ApiError(404, 'User not found or not deleted')
    return user
  }

  async hardDeleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId)
    if (!user) throw new ApiError(404, 'User not found')
    return true
  }

  async list(query: ListUsersQuery) {
    const cacheKey = `users:user-list:${JSON.stringify(query)}`

    const cached = await cache.get(cacheKey)
    if (cached) return cached

    const { page = 1, limit = 20, search, includeDeleted = false } = query

    const filter: ListUsersQuery = {}

    if (!includeDeleted) filter.isDeleted = false

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const [data, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter),
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

  async getById(userId: string) {
    const cacheKey = `user:id:${userId}`

    const cached = await cache.get(cacheKey)
    if (cached) return cached

    const user = await User.findById(userId).select('-password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    await cache.set(cacheKey, user, 300)

    return user
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await User.findById(userId).select('+password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    if (user.provider !== 'credentials') {
      throw new ApiError(400, 'Password change not allowed for OAuth accounts')
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password)

    if (!isMatch) {
      throw new ApiError(400, 'Current password is incorrect')
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 12)

    user.password = hashedPassword

    user.refreshTokenExpires = new Date()
    await user.save()

    return true
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { avatar: avatarUrl },
      { new: true },
    ).select('-password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    return user
  }
}

export const userService = new UserService()
