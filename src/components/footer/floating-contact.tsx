import Link from "next/link";
import { Section, Container } from "../craft";
import CustomIcons from "../custom-icons";
import { Text } from "../ui/text";

export default function FloatingContact() {
	return (
		<div className="hidden lg:block fixed bottom-10 lg:right-24 z-40">
			<Link href="/contact">
				<Text type="label" className="text-cream inline-flex items-center gap-2">
					CONTACT US <CustomIcons name="link" />
			</Text>
			</Link>
		</div>
	)
}