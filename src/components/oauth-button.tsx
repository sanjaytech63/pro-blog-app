'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader } from './ui/loader'

type OAuthButtonProps = {
  provider: 'google' | 'github'
  label: string
  icon: string
  iconsText?: string
}

export function OAuthButton({
  provider,
  label,
  icon,
  iconsText,
}: OAuthButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (loading) return
    setLoading(true)

    window.location.href = `/api/auth/${provider}`
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="border-input hover:bg-accent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader />
      ) : (
        <Image
          src={icon}
          width={20}
          height={20}
          alt={label}
          className={`${iconsText}`}
        />
      )}
      <span>{loading ? 'Redirecting…' : label}</span>
    </button>
  )
}
