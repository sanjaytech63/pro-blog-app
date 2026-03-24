'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { UploadCloud, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  value?: string
  uploading?: boolean
  onChange: (file: File) => void
  onRemove?: () => void
}

export default function CoverImageUpload({
  value,
  uploading,
  onChange,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onChange(file)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Cover Image</label>

      <div
        onClick={handleClick}
        className={cn(
          'group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all',
          'hover:border-primary hover:bg-muted/40',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Preview */}
        {value ? (
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={value}
              alt="Cover preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Remove button */}
            {onRemove && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-3 right-3 h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Overlay while uploading */}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <>
            {uploading ? (
              <Loader2 className="text-muted-foreground mb-2 h-6 w-6 animate-spin" />
            ) : (
              <UploadCloud className="text-muted-foreground group-hover:text-primary mb-2 h-8 w-8 transition-colors" />
            )}

            <p className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Click to upload'}
            </p>

            <p className="text-muted-foreground text-xs">
              PNG, JPG, WebP (max 5MB)
            </p>
          </>
        )}
      </div>
    </div>
  )
}
