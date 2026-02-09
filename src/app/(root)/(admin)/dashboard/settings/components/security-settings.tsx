'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'

import { authService } from '@/services/client/auth.service'
import { clientError } from '@/utils/clientError'
import {
  UpdatePasswordDto,
  updatePasswordSchema,
} from '@/validators/auth.schema'
import { Loader } from '@/components/ui/loader'

export function SecuritySettings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordDto>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const onSubmit = async (data: UpdatePasswordDto) => {
    try {
      await authService.updatePassword(data)
      toast.success('Password updated successfully')
      reset()
    } catch (error) {
      clientError(error || 'Failed to update password')
    }
  }

  return (
    <SettingsSection
      title="Security"
      description="Manage your password and account security"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label>Current password</Label>
          <Input
            type="password"
            autoComplete="current-password"
            {...register('currentPassword')}
          />
          {errors.currentPassword && (
            <p className="text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>New password</Label>
          <Input
            type="password"
            autoComplete="new-password"
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Confirm password</Label>
          <Input
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader label="Updating..." /> : 'Update password'}
          </Button>
        </div>
      </form>
    </SettingsSection>
  )
}
