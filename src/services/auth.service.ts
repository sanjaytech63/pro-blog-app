import { User } from '@/src/models/user.model'
import ApiError from '@/src/utils/ApiError'
import { hashPassword, comparePassword } from '@/src/utils/hash'
import { generateOTP } from '@/src/utils/otp'
import { signToken } from '@/src/libs/jwt'
import { env } from '@/src/config/env'
import { emailService } from '@/src/services/email.service'
import crypto from 'crypto'
import { log } from 'console'

class AuthService {
  async register(fullName: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const exists = await User.findOne({ email: normalizedEmail })
    if (exists) throw new ApiError(400, 'User already exists')

    const hashed = await hashPassword(password)
    const otp = generateOTP()

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashed,
      verifyOTP: otp,
      verifyOTPExpires: new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60000),
    })

    await emailService.sendOtp(normalizedEmail, otp)

    return { email: user.email }
  }

  async sendOtp(email: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) throw new ApiError(404, 'User not found')

    const otp = generateOTP()
    user.verifyOTP = otp
    user.verifyOTPExpires = new Date(
      Date.now() + env.OTP_EXPIRES_MINUTES * 60000,
    )
    await user.save()

    await emailService.sendOtp(normalizedEmail, otp)

    return { email: normalizedEmail }
  }

  async verifyOtp(email: string, otp: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) throw new ApiError(404, 'User not found')

    if (user.verifyOTP !== otp) throw new ApiError(400, 'Invalid OTP')
    if (user.verifyOTPExpires! < new Date())
      throw new ApiError(400, 'OTP expired')

    user.isVerified = true
    user.verifyOTP = undefined
    user.verifyOTPExpires = undefined
    await user.save()

    return { verified: true }
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })

    if (!user) throw new ApiError(404, 'User not found')
    if (!user.isVerified) throw new ApiError(400, 'Account not verified')

    const match = await comparePassword(password, user.password)
    if (!match) throw new ApiError(400, 'Invalid password')

    const token = signToken({ id: user._id, email: normalizedEmail })
    return { token }
  }

  async forgotPassword(email: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })

    // silent fail for security
    if (!user) return { email: normalizedEmail }

    // cooldown protection (10 minutes)
    if (user.resetPasswordExpires && user.resetPasswordExpires > new Date()) {
      throw new ApiError(429, 'Reset link already sent, try again later')
    }

    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex')

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000)
    await user.save()

    const resetUrl = `${env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${rawToken}`
    await emailService.sendResetPassword(normalizedEmail, resetUrl)
    log(rawToken)

    return { email: normalizedEmail }
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) throw new ApiError(400, 'Invalid or expired token')

    user.password = await hashPassword(newPassword)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    return { success: true }
  }
}

export const authService = new AuthService()
