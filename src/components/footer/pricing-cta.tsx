'use client'

import { useState } from "react";
import Link from "next/link";
import { Text } from "../ui/text";
import { X } from "lucide-react";

export default function PricingCTA() {
	const [open, setOpen] = useState(true);

	if(!open) return null;
	return (
		<div className="flex items-start p-4 gap-4 bg-cream/90 text-jowa-red fixed bottom-36 right-0 z-40">
			<Link href="/pricing" className="flex flex-col items-start justify-start">
				<Text type="label" tag="p" className="leading-[21.25px]">NEED AN ESTIMATE?</Text>
				<Text tag="p" className="font-maisonNeue text-[14px]">Try our pricing calculator</Text>
			</Link>
			<button onClick={() => setOpen(false)}>
				<X className="text-jowa-red mt-1" width={20} height={20} strokeWidth={1} />
			</button>
		</div>
	)
}