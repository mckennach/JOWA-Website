import _clsx, { type ClassValue } from 'clsx'
import { ImageLoaderProps } from 'next/image'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(_clsx(inputs))
}

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const imageUrl = new URL(src)
  return imageUrl.search
    ? `${src}&w=${width}&q=${quality || 75}`
    : `${src}?w=${width}&q=${quality || 75}`
}

export const zeroPad = (num: number, places = 2) =>
  String(num).padStart(places, '0')
