import Image from 'next/image'

/**
 * Figma `Frame 7` (1920 × 927). Measured on the 1:1 export: the panel seam is at x805 (41.88%),
 * left panel `#FFFFFF`, right `#F7F5F0`. Both text blocks are **right-aligned** to x670 — one page
 * inset from the seam — with the heading in Merriweather 56px on a 77px line, three lines, and the
 * subline in 20px Space Grotesk. The crowd illustration fills the right panel edge to edge and is
 * cropped by it, so it is `object-cover` rather than contained.
 */
export default function CaseStudiesSection() {
  return (
    <section
      id="casos-de-estudio"
      className="relative w-full overflow-hidden bg-bg lg:aspect-[1920/927]"
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[41.88%_1fr]">
        <div className="page-inset flex h-full flex-col justify-center bg-surface py-20 lg:py-0 lg:pl-12">
          <h2 className="font-serif text-[30px] leading-[1.37] text-ink-text md:text-[36px] lg:text-right lg:text-[38px] xl:text-[42px] 2xl:text-[46px] 3xl:text-[56px]">
            <span className="lg:block">La base sólida</span>{' '}
            <span className="lg:block">detrás de marcas</span>{' '}
            <span className="lg:block">en crecimiento</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.3] text-ink-text lg:mt-[5.7%] lg:text-right lg:text-[15px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px]">
            <span className="lg:block">No es una promesa — es lo que ya sostiene a</span>{' '}
            <span className="lg:block">otros negocios en crecimiento.</span>
          </p>
        </div>

        <div className="relative h-full min-h-[320px] bg-bg">
          <Image
            src="/illustrations/casos_de_estudio_1.png"
            alt="Un grupo de personas dibujadas a mano, los negocios que ya se apoyan en un sistema de marca"
            width={1115}
            height={911}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  )
}
