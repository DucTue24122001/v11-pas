import { Noto_Sans, Roboto, Teko } from 'next/font/google';

export const roboto_font = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ["100", "300", "500", "700", "900"],
})

export const teko_font = Teko({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teko',
  weight: ["400", "500"],
})
export const noto_sans_font = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export const roboto = roboto_font.className
export const teko = teko_font.className
export const noto = noto_sans_font.className

