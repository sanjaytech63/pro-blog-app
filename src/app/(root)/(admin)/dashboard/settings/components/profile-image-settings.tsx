'use client'

import { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { SettingsSection } from './settings-section'
import { useQueryClient } from '@tanstack/react-query'
import { AuthUser } from '@/types/auth'
import { authService } from '@/services/client/auth.service'
import { toast } from 'sonner'
import { Loader } from '@/components/ui/loader'
import { clientError } from '@/utils/clientError'

export function ProfileImageSettings() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const queryClient = useQueryClient()

  const me = queryClient.getQueryData<AuthUser>(['me'])

  if (!me) return null

  const handleSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files allowed')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB')
      return
    }

    try {
      setUploading(true)

      // 1️⃣ Get signed params
      const sign = await authService.getAvatarUploadSignature()

      // 2️⃣ Upload to Cloudinary
      const form = new FormData()
      form.append('file', file)
      form.append('api_key', sign.apiKey)
      form.append('timestamp', sign.timestamp)
      form.append('signature', sign.signature)
      form.append('folder', sign.folder)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
        { method: 'POST', body: form },
      )

      const uploadData = await uploadRes.json()

      const res = await authService.updateAvatar(uploadData.secure_url)

      queryClient.setQueryData<AuthUser>(['me'], res.data)

      toast.success(res.message)
    } catch (error) {
      clientError(error, 'Failed to update avatar')
    } finally {
      setUploading(false)
    }
  }

  return (
    <SettingsSection
      title="Profile photo"
      description="This image will be shown on your profile and dashboard"
    >
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          {me.avatar && (
            <AvatarImage
              src={me.avatar}
              alt={me.fullName}
              referrerPolicy="no-referrer"
            />
          )}

          {!me.avatar && (
            <AvatarFallback>
              {me.fullName?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files && handleSelect(e.target.files[0])}
          />

          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader label="Uploading..." /> : 'Change photo'}
          </Button>

          <p className="text-muted-foreground text-xs">JPG / PNG · Max 2MB</p>
        </div>
      </div>
    </SettingsSection>
  )
}
