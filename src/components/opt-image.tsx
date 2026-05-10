import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  src?: string
  alt: string
  priority?: boolean
  className?: string
  containerClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  containerClassName,
}: Props) {
  return (
    <div
      className={clsx(
        'relative h-54 w-full overflow-hidden',
        containerClassName,
      )}
    >
      <Image
        src={src || '/images/bluer-image.png'}
        alt={alt || 'Blog image'}
        fill
        priority={priority}
        quality={75}
        placeholder="blur"
        blurDataURL="/images/bluer-image.png"
        sizes="100vw"
        className={clsx(
          'object-cover transition-transform duration-500 ease-out hover:scale-105',
          containerClassName,
        )}
      />
    </div>
  )
}
