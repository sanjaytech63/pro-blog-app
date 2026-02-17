'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'

import { authService } from '@/services/client/auth.service'
import { updateProfileSchema, UpdateProfileDto } from '@/validators/user.schema'
import { clientError } from '@/utils/clientError'
import { useAuthStore } from '@/store/auth.store'
import { useLogout } from '@/hooks/use-logout'
import { ConfirmActionDialog } from '@/components/common/confirm-action-dialog'

type UpdateProfileForm = z.infer<typeof updateProfileSchema>

export function ProfileForm() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()
  const { logout, isLoggingOut } = useLogout()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UpdateProfileDto) => {
    try {
      setLoading(true)
      const res = await authService.updateProfile(data)
      const me = await authService.me()
      useAuthStore.getState().setUser(me)
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <p className="text-muted-foreground text-xs">
            Email is managed by your login provider
          </p>
        </div>

        {user && (
          <div className="bg-muted rounded-md px-4 py-3 text-sm">
            Logged in with <strong>{user.provider}</strong>
          </div>
        )}

        <div className="flex justify-end gap-4 md:col-span-2">
          <Button
            className="cursor-pointer"
            type="submit"
            disabled={!isDirty || loading}
          >
            {loading ? <Loader label="Saving..." /> : 'Save changes'}
          </Button>
          <ConfirmActionDialog
            title="Are you sure you want to logout?"
            description="You will need to log in again to access your account."
            confirmLabel="Logout"
            cancelLabel="Stay logged in"
            variant="destructive"
            loading={isLoggingOut}
            onConfirm={logout}
            trigger={<Button className="cursor-pointer">Logout</Button>}
          />
        </div>
      </form>
    </div>
  )
}
