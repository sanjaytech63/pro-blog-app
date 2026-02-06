'use client'

import { AuthUser } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Trash2, RotateCcw, Loader } from 'lucide-react'
import { useAdminUserActions } from '@/hooks/admin/use-admin-user-actions'

interface Props {
  user: AuthUser
}

export function UserRowActions({ user }: Props) {
  const { restoreUser, permanentDeleteUser } = useAdminUserActions()

  const isLoading = restoreUser.isPending || permanentDeleteUser.isPending

  if (user.isDeleted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled={isLoading}
        onClick={() => restoreUser.mutate(user._id)}
        className="cursor-pointer"
      >
        {restoreUser.isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <RotateCcw className="h-4 w-4 text-green-600" />
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isLoading}
      onClick={() => permanentDeleteUser.mutate(user._id)}
      className="cursor-pointer"
    >
      {permanentDeleteUser.isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4 text-red-600" />
      )}
    </Button>
  )
}
