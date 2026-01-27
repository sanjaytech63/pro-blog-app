export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black shadow-md dark:bg-white">
        <span className="text-lg font-bold text-white dark:text-black">B</span>
      </div>

      <div className="leading-tight">
        <h1 className="text-foreground text-2xl font-bold tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_1px_2px_rgba(255,255,255,0.15)]">
          BlogMint
        </h1>
      </div>
    </div>
  )
}
