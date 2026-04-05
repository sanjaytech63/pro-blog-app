'use client'

import React, { useEffect, useMemo, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Loader } from '@/components/ui/loader'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createPostSchema, CreatePostDto } from '@/validators/post.schema'
import { useCreatePost, useUpdatePost } from '@/hooks/admin/use-posts'
import { PostEntity } from '@/types/post'

import CoverImageUpload from '@/components/common/cover-image-upload'
import { clientError } from '@/utils/clientError'
import { z } from 'zod'

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
})

interface Props {
  open: boolean
  onClose: () => void
  post?: PostEntity | null
}

type FormValues = z.infer<typeof createPostSchema>

export default function PostFormDialog({ open, onClose, post }: Props) {
  const isEdit = !!post
  const [uploading, setUploading] = useState(false)

  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()

  const defaultValues = useMemo<CreatePostDto>(
    () => ({
      title: post?.title || '',
      content: post?.content || '',
      category: post?.category || '',
      status: post?.status || 'DRAFT',
      coverImageBase64: post?.coverImage || '',
      tags: post?.tags ?? [],
    }),
    [post],
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const editorRef = useRef<string>(null)

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      height: 360,
      placeholder: 'Start typings...',
      toolbarSticky: false,
      toolbarButtonSize: 'middle',
      buttons:
        'bold,italic,underline,strikethrough,|,ul,ol,|,link,|,align,|,outdent,indent,|,source',
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
    }),
    [],
  )

  useEffect(() => {
    if (open) {
      reset(defaultValues)
    }
  }, [open, defaultValues, reset])

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

  const onSubmit: SubmitHandler<CreatePostDto> = async (data: FormValues) => {
    try {
      if (isEdit && post) {
        await updateMutation.mutateAsync({
          id: post._id,
          payload: data,
        })
      } else {
        await createMutation.mutateAsync(data)
      }

      reset()
      onClose()
    } catch (err) {
      clientError(
        err,
        isEdit ? 'Failed to update post' : 'Failed to create post',
      )
    }
  }

  const coverImage = watch('coverImageBase64')
  const loading =
    isSubmitting || createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{isEdit ? 'Edit Post' : 'Create Post'}</DialogTitle>
        </DialogHeader>

        <div className="custom-scroll max-h-[80vh] overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              label="Title"
              required
              placeholder="Enter post title"
              {...register('title')}
              error={errors.title}
            />

            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <JoditEditor
                    ref={editorRef}
                    value={field.value || ''}
                    config={editorConfig}
                    onBlur={(newContent) => {
                      field.onChange(newContent)
                    }}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-400">
                      {errors.content.message}
                    </p>
                  )}
                </div>
              )}
            />

            <FormField
              label="Category"
              required
              placeholder="Enter category"
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
