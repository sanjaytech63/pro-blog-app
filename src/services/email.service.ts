import nodemailer from 'nodemailer'
import { env } from '@/src/config/env'

class EmailService {
  private transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_EMAIL,
      pass: env.SMTP_PASSWORD,
    },
  })

  async sendOtp(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Auth Service" <${env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is <b>${otp}</b>. It expires in ${env.OTP_EXPIRES_MINUTES} minutes.</p>`,
    })
  }

  async sendResetPassword(email: string, resetUrl: string) {
    await this.transporter.sendMail({
      from: `"Password Reset" <${env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested to reset your password.</p>
        <p>Click the link below to set a new password:</p>
        <p><a href="${resetUrl}" target="_blank" style="color:#0066ee;">Reset Password</a></p>
        <br />
        <p>If you did not request this, please ignore this email.</p>
        <p><small>This link is valid for 10 minutes.</small></p>
      `,
    })
  }
}

export const emailService = new EmailService()
