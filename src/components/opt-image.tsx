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
    <div className="aspect-video overflow-hidden">
      <Image
        src={src || '/images/placeholder.jpg'}
        alt={alt || 'Blog image'}
        fill
        priority={priority}
        quality={85}
        placeholder="blur"
        blurDataURL="/images/blur-placeholder.jpg"
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
