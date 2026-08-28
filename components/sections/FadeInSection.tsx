'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * IntersectionObserver + a CSS transition rather than Framer Motion. A `motion.div` with an
 * `initial` state renders its hidden style during SSR but not on the client's first render, which
 * React 19 reports as a hydration mismatch on every section of the page. Here the first client
 * render matches the server exactly (always the hidden class), and the observer flips it after
 * mount. `prefers-reduced-motion` skips straight to the visible state.
 */
export default function FadeInSection({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-80px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        'transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
