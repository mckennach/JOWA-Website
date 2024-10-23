'use client'
import { Post } from '@/src/gql/graphql'
import { Container, Section } from '../../craft'
import { Text } from '../../ui/text'
import Image from 'next/image'
import { imageLoader } from '../../../lib/utils'
export default function PostHero({ post }: { post: Post }) {
	const date = new Date(post?.date as string)
  const dateString = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.')
  return (
    <Section className="">
      <div className="flex h-[90vh] border-b border-t">
        <div className="basis-1/2 pl-12 h-full flex items-center lg:border-r">
					<div className="space-y-8">
						<Text>{dateString}</Text>
						<Text tag="h1" className="text-accent-foreground text-[48px]">{post?.title}</Text>
					</div>
					
        </div>
        <div className="relative block basis-1/2">
          <Image
            src={post?.postData?.heroImage?.node?.mediaItemUrl ?? ''}
            alt={post?.postData?.heroImage?.node?.altText ?? ''}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            loader={imageLoader}
          />
        </div>
      </div>
			<Container className="py-24 border-b">
					<Text tag="h2" className="text-[24px] leading-8">CONTENT COMING SOON</Text>
			</Container>
    </Section>
  )
}
