'use client'

import { useState } from "react"
import Image from "next/image"
import CustomIcons from "../custom-icons"
import { Container } from "../craft"
import { imageLoader } from '@/src/lib/utils';
export default function Loading({}) {
	const [hasLoaded, setHasLoaded] = useState(false);
	return (
		<div className="fixed top-0 left-0 w-screen h-screen z-[999]">
			<Container className="h-full w-full flex items-center justify-between relative z-10 bg-background animate-fade-out">
				<div className="basis-1/2">
					<CustomIcons name="logo" className="w-[381px] text-cream" color="hsla(39, 78%, 93%, 1)" />
				</div>
				<div className="basis-1/2">
					<p className="text-cream font-maisonNeue text-[32px]">Where your vision unfolds.</p>
				</div>
				
			</Container>
			<div className="absolute top-0 left-0 h-screen w-screen z-0">
				<Image 
					src="https://jowadotca.wpcomstaging.com/wp-content/uploads/2024/10/af664baaf2b4e5165685ce6efe90852a-1.png?w=3840&q=75" 
					alt="alt" 
					fill={true}
					priority={true}
					style={{
						objectFit: 'cover'
					}}
					loader={imageLoader}
				/>
			</div>
		</div>
	)
}