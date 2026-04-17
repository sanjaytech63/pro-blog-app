import { useEffect, useState } from 'react'

export function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)

    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [target, duration])

  return count
}
