import { User } from '@/models/user.model'
import ApiError from '@/utils/ApiError'
import { hashPassword, comparePassword } from '@/utils/hash'
import { generateOTP } from '@/utils/otp'
import { env } from '@/config/env'
import { emailService } from '@/services/email.service'
import crypto from 'crypto'
import { log } from 'console'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@/lib/jwt'

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
      role: 'user',
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

    const user = await User.findOne({ email: normalizedEmail }).select(
      '+verifyOTP +verifyOTPExpires',
    )

    if (!user) {
      throw new ApiError(400, 'User not found')
    }

    if (!user.verifyOTP || user.verifyOTP !== otp) {
      throw new ApiError(400, 'Invalid OTP')
    }

    if (user.verifyOTPExpires! < new Date()) {
      throw new ApiError(400, 'OTP expired')
    }

    user.isVerified = true
    user.verifyOTP = undefined
    user.verifyOTPExpires = undefined
    await user.save()

    return { verified: true }
  }

  /* ---------- LOGIN ---------- */
  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({ email: normalizedEmail }).select(
      '+password +refreshToken +refreshTokenExpires',
    )

    if (!user) throw new ApiError(404, 'User not found')
    if (!user.isVerified) throw new ApiError(403, 'Account not verified')

    const match = await comparePassword(password, user.password)
    if (!match) throw new ApiError(401, 'Invalid credentials')

    const accessToken = signAccessToken({
      id: user._id.toString(),
      role: user.role,
    })

    const refreshToken = signRefreshToken({
      id: user._id.toString(),
    })

    user.refreshToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex')

    user.refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    await user.save()

    return { accessToken, refreshToken }
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

  async resendVerificationOtp(email: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })

    if (!user) throw new ApiError(404, 'User not found')
    if (user.isVerified) throw new ApiError(400, 'User already verified')

    // rate-limit protection
    if (
      user.verifyOTPExpires &&
      user.verifyOTPExpires > new Date(Date.now() - 2 * 60 * 1000)
    ) {
      throw new ApiError(429, 'OTP already sent, wait before retry')
    }

    const otp = generateOTP()
    user.verifyOTP = otp
    user.verifyOTPExpires = new Date(
      Date.now() + env.OTP_EXPIRES_MINUTES * 60000,
    )
    await user.save()

    await emailService.sendOtp(normalizedEmail, otp)
    return { email: normalizedEmail }
  }

  /* ---------- REFRESH TOKEN ---------- */
  async refresh(refreshToken: string) {
    const decoded = verifyRefreshToken<{ id: string }>(refreshToken)

    const hashed = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex')

    const user = await User.findOne({
      _id: decoded.id,
      refreshToken: hashed,
      refreshTokenExpires: { $gt: new Date() },
    })

    if (!user) throw new ApiError(401, 'Invalid refresh token')

    const newAccessToken = signAccessToken({
      id: user._id.toString(),
      role: user.role,
    })

    const newRefreshToken = signRefreshToken({
      id: user._id.toString(),
    })

    user.refreshToken = crypto
      .createHash('sha256')
      .update(newRefreshToken)
      .digest('hex')

    user.refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    await user.save()

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
  /* ---------- LOGOUT ---------- */
  async logout(userId: string) {
    await User.findByIdAndUpdate(userId, {
      refreshToken: null,
      refreshTokenExpires: null,
    })
  }
}

export const authService = new AuthService()
