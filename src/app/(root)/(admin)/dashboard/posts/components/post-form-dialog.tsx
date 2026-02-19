'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Loader } from '@/components/ui/loader'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useCreatePost, useUpdatePost } from '@/hooks/admin/use-posts'
import { createPostSchema, CreatePostDto } from '@/validators/post.schema'
import { PostEntity } from '@/types/post'
import CoverImageUpload from '@/components/common/cover-image-upload'
import RichTextEditor from './RichTextEditor'

interface Props {
  open: boolean
  onClose: () => void
  post?: PostEntity | null
}

export default function PostFormDialog({ open, onClose, post }: Props) {
  const isEdit = !!post
  const [uploading, setUploading] = useState(false)

  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      status: 'DRAFT',
      coverImageBase64: '',
    },
  })

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        category: post.category,
        status: post.status,
        coverImageBase64: post.coverImage || '',
      })
    } else {
      reset()
    }
  }, [post, reset])

  const handleUpload = (file: File) => {
    setUploading(true)

    const reader = new FileReader()

    reader.onloadend = () => {
      setValue('coverImageBase64', reader.result as string, {
        shouldValidate: true,
      })
      setUploading(false)
    }

    reader.readAsDataURL(file)
  }

  const onSubmit = (data: CreatePostDto) => {
    if (isEdit && post) {
      updateMutation.mutate(
        { id: post._id, payload: data },
        {
          onSuccess: () => {
            onClose()
          },
        },
      )
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset()
          onClose()
        },
      })
    }
  }

  const coverImage = watch('coverImageBase64')
  const loading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-4">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Post' : 'Create Post'}</DialogTitle>
        </DialogHeader>
        <div className="custom-scroll max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Title"
              required
              {...register('title')}
              error={errors.title}
            />

            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <FormField
              label="Category"
              required
              {...register('category')}
              error={errors.category}
            />

            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Cover Image */}
            <CoverImageUpload
              value={coverImage}
              uploading={uploading}
              onChange={handleUpload}
              onRemove={() =>
                setValue('coverImageBase64', '', {
                  shouldValidate: true,
                })
              }
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader label="Saving..." />
              ) : isEdit ? (
                'Update Post'
              ) : (
                'Create Post'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
