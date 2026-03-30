import Image from 'next/image'

export function OptimizedImage({
  src,
  alt,
  priority = false,
}: {
  src?: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className="relative aspect-video h-54 overflow-hidden">
      <Image
        src={src || '/images/bluer-image.png'}
        alt={alt || 'Blog image'}
        fill
        priority={priority}
        quality={75}
        placeholder="blur"
        blurDataURL="/images/bluer-image.png"
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          (max-width: 1280px) 33vw,
          25vw
        "
        className="object-cover transition-transform duration-500 ease-out hover:scale-110"
      />
    </div>
  )
}
