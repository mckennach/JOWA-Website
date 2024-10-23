'use client'

import { Post } from "@/src/gql/graphql"
import { Section, Container } from "../../craft"
import { Text } from "../../ui/text"
export default function NextPost({ post }: { post: Post } ) {
	return (
		<Section className="bg-accent py-32 text-background">
			<Container className="">
				<Text tag="h2" className="text-[48px] leading-8 text-foreground">NEXT JOURNAL POST</Text>
			</Container>
		</Section>
	)
}