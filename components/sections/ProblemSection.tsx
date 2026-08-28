/**
 * Figma `Problemática` (1920 × 530). Measured on the 1:1 export: three text blocks on `#212121`,
 * tops aligned at y104, 34px Space Grotesk on a 35px line. Columns 1 and 2 are accent and
 * right-aligned; column 3 is cream and left-aligned. Their x-extents are 253–531, 708–1014 and
 * 1187–1693, so the widths below are the comp's own wrap widths as percentages of the flex content
 * box (the frame minus the 13.18% left inset), not of the frame itself — the
 * type ladder is kept roughly proportional to the viewport so the line breaks survive the scale
 * down. There is no heading and no eyebrow: the section opens on body copy alone.
 */
export default function ProblemSection() {
  return (
    <section
      id="nuestra-historia"
      className="w-full bg-ink py-20 text-[16px] leading-[1.3] lg:flex lg:gap-[10.5%] lg:py-0 lg:pb-[5.99%] lg:pl-[13.18%] lg:pt-[5.42%] lg:text-[18px] lg:leading-[1.03] xl:text-[22px] 2xl:text-[27px] 3xl:text-[34px]"
    >
      <div className="page-inset flex flex-col gap-10 lg:contents">
        <p className="font-medium text-accent lg:w-[17.88%] lg:text-right">
          Muchas marcas crecen sin haber <strong className="font-bold">sentado base.</strong>
        </p>
        <p className="font-medium text-accent lg:w-[18.36%] lg:text-right">
          Un logo aquí, una plantilla allá, una decisión de última hora antes de un lanzamiento.
          Funciona un tiempo.
        </p>
        <p className="font-medium text-cream-ink lg:w-[30.35%]">
          Pero cuando el negocio crece, esas decisiones sueltas empiezan a chocar entre sí: cada
          canal dice algo distinto, cada persona del equipo interpreta la marca a su manera, y lo
          que debería ser una identidad se vuelve una colección de parches.
        </p>
      </div>
    </section>
  )
}
