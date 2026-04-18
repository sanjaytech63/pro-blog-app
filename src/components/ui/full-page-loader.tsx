'use client'

export const FullPageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg">
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-indigo-600 text-4xl text-indigo-600">
          <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-600 text-2xl text-red-600"></div>
        </div>
      </div>
    </div>
  </div>
)
