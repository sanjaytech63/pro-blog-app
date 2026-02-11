'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsSection } from './settings-section'
import { Loader } from '@/components/ui/loader'

import { authService } from '@/services/client/auth.service'
import { updateProfileSchema, UpdateProfileDto } from '@/validators/user.schema'
import { AuthUser } from '@/types/auth'
import { clientError } from '@/utils/clientError'

type UpdateProfileForm = z.infer<typeof updateProfileSchema>

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const meResponse = queryClient.getQueryData<AuthUser>(['me'])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
  })

  useEffect(() => {
    if (meResponse) {
      reset({
        fullName: meResponse.fullName,
        email: meResponse.email,
      })
    }
  }, [meResponse, reset])

  const onSubmit = async (data: UpdateProfileDto) => {
    try {
      setLoading(true)
      const res = await authService.updateProfile(data)
      queryClient.setQueryData<AuthUser>(['me'], res.data)
      reset({
        fullName: res.data.fullName,
        email: res.data.email,
      })

      toast.success(res.message)
    } catch (error) {
      clientError(error || 'Profile update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsSection
      title="Profile"
      description="Update your personal information"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-end md:col-span-2">
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={!isDirty || loading}
          >
            {loading ? <Loader label="Saving..." /> : 'Save changes'}
          </Button>
        </div>
      </form>
    </SettingsSection>
  )
}
