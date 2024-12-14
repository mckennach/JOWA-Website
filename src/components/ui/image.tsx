'use client'

import { forwardRef } from 'react';
import NextImage, { ImageProps } from 'next/image';

const Image = forwardRef<HTMLPictureElement, ImageProps>(({ ...props }, ref) => {
	return (
		<NextImage {...props} />
	)
});

Image.displayName = 'Image';

export { Image };