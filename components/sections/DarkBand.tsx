import React from 'react'

/**
 * Figma node `Servicios`: a solid `--ink` band, 100px tall, with no content. It is 2225px wide
 * against a 1920px frame — it deliberately bleeds past the page, so it is rendered full-bleed and
 * outside the site container.
 */
export default function DarkBand() {
  return (
    <div aria-hidden="true" role="presentation" className="h-[60px] w-full bg-ink md:h-[100px]" />
  )
}
