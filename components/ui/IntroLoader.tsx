'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * `public/brand/intro.mp4` is a derived asset. The source, `assets/loader/test_Intro_BASE.gif`, is
 * a 2.73 MB 1920×1080 GIF whose last 18 seconds are blank white padding — only 0–7s carries the
 * animation. Trimmed to that window and sped up 1.6×, H.264 brings it to 4.36s / 286 KB. VP9 came
 * out at 896 KB on the same source (the airbrushed grain defeats it), so there is no WebM variant.
 * Regenerate with:
 *
 *   ffmpeg -y -t 7.0 -i assets/loader/test_Intro_BASE.gif -vf \
 *     "setpts=0.62*PTS,fps=25,scale=1280:-2,format=yuv420p" \
 *     -c:v libx264 -crf 28 -preset slow -movflags +faststart -an public/brand/intro.mp4
 *
 * The overlay's own first render is identical on the server and on the client's first pass, and
 * every conditional — session flag, scroll lock, listeners — runs in the effect after mount. This
 * is the same constraint documented in `sections/FadeInSection.tsx`: an element whose *initial*
 * state diverges between the two renders hydrates mismatched under React 19.
 *
 * Returning visitors are handled before paint by the `.intro-overlay` rule in `globals.css`
 * (driven by the inline script in `app/layout.tsx`), so they never see a frame of white.
 *
 * 2026-08-30: no longer also skipped for `prefers-reduced-motion` — that OS flag is frequently on
 * involuntarily (Windows Battery Saver / power-efficiency mode disables "Animation effects"
 * system-wide) and was silently killing the intro, and every other animation on the site, for
 * affected visitors. See `.claude/rules/accessibility.md`.
 */

/** Matches the CSS transition below, and the safety timeout allows the 4.36s clip plus buffering. */
const FADE_MS = 500
const SAFETY_MS = 6000
const SRC = '/brand/intro.mp4'

type Phase = 'playing' | 'fading' | 'done'

export default function IntroLoader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const dismissedRef = useRef(false)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const previousOverflowRef = useRef('')
  const [phase, setPhase] = useState<Phase>('playing')

  /**
   * Idempotent: playback ending, an interaction, an error and the safety timer all race here.
   * Scroll is released at the *start* of the fade, not the end, so the same wheel gesture that
   * dismissed the intro scrolls the page. The effect's cleanup cannot be relied on for this —
   * reaching `'done'` renders `null` but does not unmount the component, so the cleanup never runs.
   */
  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    document.body.style.overflow = previousOverflowRef.current
    setPhase('fading')
    fadeTimerRef.current = setTimeout(() => setPhase('done'), FADE_MS)
  }, [])

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('base-intro') === '1'
    } catch {
      // Private-mode Safari throws on access. Treat it as a first visit.
    }

    if (seen) {
      dismissedRef.current = true
      setPhase('done')
      return
    }

    try {
      sessionStorage.setItem('base-intro', '1')
    } catch {
      // Non-fatal: the intro simply plays again next load.
    }

    const events = ['click', 'keydown', 'wheel', 'touchstart'] as const
    events.forEach((event) => window.addEventListener(event, dismiss, { passive: true }))

    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const video = videoRef.current
    if (video) {
      // The source is attached here rather than in JSX on purpose: a `src` in the server-rendered
      // markup makes the browser download all 286 KB before this effect can decide the intro is
      // not wanted, so a returning visitor would pay for a video they never see. Autoplay can also
      // still be refused (data saver, low power mode) — drop the overlay if it is.
      //
      // `muted` set imperatively here too, not just via the JSX prop: React does not emit the
      // `muted` attribute in server-rendered markup (facebook/react#10389), and on some browsers
      // the DOM property isn't reliably synced from the JSX boolean by the time this effect runs.
      // Without it read back as `true`, the autoplay policy rejects `.play()` with
      // `NotAllowedError` and the whole intro silently disappears — on affected browsers only,
      // which is why this only reproduces on some computers.
      video.muted = true
      video.src = SRC
      video.play().catch(dismiss)
    }

    const safetyTimer = setTimeout(dismiss, SAFETY_MS)

    return () => {
      events.forEach((event) => window.removeEventListener(event, dismiss))
      document.body.style.overflow = previousOverflowRef.current
      clearTimeout(safetyTimer)
      clearTimeout(fadeTimerRef.current)
    }
  }, [dismiss])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        // z-[100] clears the skip link's focus:z-50 in the root layout; nothing else in the site
        // goes above z-10. bg-surface is the video's own ground, so `object-contain` letterboxes
        // invisibly and the outer marks survive on portrait viewports.
        'intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-surface',
        'transition-opacity duration-500 ease-out',
        phase === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100',
      )}
    >
      {/* A raw <video> rather than next/image: the rule that bans <img> is about images, and
          next/image cannot render video. `src` is assigned in the effect — see above. */}
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        muted
        playsInline
        preload="auto"
        onEnded={dismiss}
        onError={dismiss}
      />
    </div>
  )
}
