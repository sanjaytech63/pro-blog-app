'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Loader } from '@/components/ui/loader'
import { useDeletePost } from '@/hooks/admin/use-posts'
import { Loader2 } from 'lucide-react'

interface Props {
  postId: string | null
  open: boolean
  onClose: () => void
}

export default function PostDeleteDialog({ postId, open, onClose }: Props) {
  const deleteMutation = useDeletePost()

  const handleConfirm = () => {
    if (!postId) return

    deleteMutation.mutate(postId, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value && !deleteMutation.isPending) {
          onClose()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <Loader label="Deleting post..." />
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
