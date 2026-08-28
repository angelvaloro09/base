/**
 * The source marks in `assets/particles/*.png` are 2160 × 2160 canvases in which the drawing
 * occupies anywhere from 12% to 52% of the frame, so a shared render size produced wildly
 * inconsistent marks. `public/brand/particles/*.png` are those files cropped to their alpha
 * bounding box — generated, not hand-drawn. Regenerate one with:
 *
 *   ffmpeg -y -i assets/particles/07_Fig.png -vf "crop=948:852:612:708" public/brand/particles/07.png
 *
 * (crop values are w:h:x:y of the alpha bbox in the 2160² source.)
 *
 * `ratio` is width / height of the cropped file, so callers can size a mark by width alone and
 * still get its true proportions.
 */
export const PARTICLES = {
  '01': { src: '/brand/particles/01.png', ratio: 756 / 612 },
  '02': { src: '/brand/particles/02.png', ratio: 972 / 1020 },
  '03': { src: '/brand/particles/03.png', ratio: 840 / 852 },
  '04': { src: '/brand/particles/04.png', ratio: 432 / 480 },
  '05': { src: '/brand/particles/05.png', ratio: 516 / 492 },
  '06': { src: '/brand/particles/06.png', ratio: 696 / 756 },
  '07': { src: '/brand/particles/07.png', ratio: 948 / 852 },
  '08': { src: '/brand/particles/08.png', ratio: 204 / 264 },
  '09': { src: '/brand/particles/09.png', ratio: 516 / 492 },
  '10': { src: '/brand/particles/10.png', ratio: 612 / 756 },
  '11': { src: '/brand/particles/11.png', ratio: 1140 / 804 },
  '12': { src: '/brand/particles/12.png', ratio: 624 / 480 },
} as const

export type ParticleId = keyof typeof PARTICLES
