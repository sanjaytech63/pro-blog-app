import { User } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { UpdateProfileDto } from '@/validators/user.schema'

interface ListUsersQuery {
  page?: number
  limit?: number
  search?: string
  includeDeleted?: boolean
  isDeleted?: boolean
}

class UserService {
  async getProfile(userId: string) {
    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      '-password',
    )

    if (!user) throw new ApiError(404, 'User not found')
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

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getById(userId: string) {
    const user = await User.findById(userId).select('-password')

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    return user
  }
}

export const userService = new UserService()
