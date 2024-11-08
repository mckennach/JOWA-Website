'use client'

import { useEffect, useState } from "react";
import { useSessionStorage } from 'usehooks-ts'
import Link from "next/link";
import { Text } from "../ui/text";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function PricingCTA() {
	const [closed, setClosed] = useSessionStorage('pricingCTA', false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setClosed(true);
		setOpen(false);
	};

	useEffect(() => {
		if(!closed) {
			setTimeout(() => setOpen(true), 1000);
		}
	}, [closed]);

	if(closed) return null;
	return (
		<div className={cn("flex items-start p-4 gap-4 bg-cream/85 text-jowa-red fixed bottom-28 right-0 z-40 transition-all duration-700 ease-in-out", 
			open ? "opacity-100" : "opacity-0 pointer-events-none"
		)}>
			<Link href="/pricing" className="flex flex-col items-start justify-start">
				<Text type="label" tag="p" className="leading-[21.25px]">NEED AN ESTIMATE?</Text>
				<Text tag="p" className="font-maisonNeue text-[14px]">Try our pricing calculator</Text>
			</Link>
			<button onClick={handleClose}>
				<X className="text-jowa-red mt-1" width={20} height={20} strokeWidth={1} />
			</button>
		</div>
	)
}