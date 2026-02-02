import Link from 'next/link'

export function Logo() {
  return (
    <Link href={'/'} className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black shadow-sm sm:h-8 sm:w-8 md:h-10 md:w-10 dark:bg-white">
        <span className="text-sm font-bold text-white sm:text-base md:text-lg dark:text-black">
          B
        </span>
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <h1 className="text-foreground text-base font-bold tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] sm:text-lg md:text-2xl dark:drop-shadow-[0_1px_2px_rgba(255,255,255,0.15)]">
          BlogMint
        </h1>
      </div>
    </Link>
  )
}
