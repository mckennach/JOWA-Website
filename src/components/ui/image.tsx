'use client'

import NextImage, { ImageProps } from 'next/image'
import { forwardRef } from 'react'

const Image = forwardRef<HTMLPictureElement, ImageProps>(
  ({ ...props }, ref) => {
    return <NextImage {...props} />
  }
)

Image.displayName = 'Image'

export { Image }
