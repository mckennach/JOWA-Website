'use client'

import { Post, Tag } from '@/src/gql/graphql'
import { Container, Section } from '../../craft'
import Image from 'next/image'
import { imageLoader } from '../../../lib/utils'
import { Text } from '../../ui/text'
import { useRouter, useSearchParams } from 'next/navigation'

const JournalItems = ({ posts }: { posts: Post[] }) => {
  const searchParams = useSearchParams()
  const searchCategory = searchParams.get('category')
  const router = useRouter()
  return (
    <Section>
      <Container className="border-b">
        <div className="grid gap-14 pb-24 pt-10 lg:grid-cols-3 lg:gap-4">
          {posts.map((post, index) => {
						const categoryExists =
							post &&
							post.tags &&
							post?.tags.nodes.some(
								(tag: Tag) => tag.slug === searchCategory
							);
						if(!searchCategory || categoryExists) return <JournalItem key={index} post={post} />
            return null;
          })}
        </div>
      </Container>
    </Section>
  )
}

const JournalItem = ({ post }: { post: Post }) => {
  const router = useRouter()
  const date = new Date(post?.date as string)
  const dateString = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.')

  return (
    <div
      className="group cursor-pointer space-y-4"
      onClick={() => {
        router.push(`/journal/${post.slug}`)
      }}
      role="button"
    >
      <div className="relative aspect-square after:absolute after:z-30 after:h-full after:w-full after:bg-transparent after:transition-all after:duration-300 group-hover:after:bg-accent/40">
        <Image
          src={post?.postData?.featuredImage?.node?.mediaItemUrl ?? ''}
          alt={post?.postData?.featuredImage?.node?.altText ?? ''}
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          loader={imageLoader}
        />
      </div>

      <Text type="label" tag="p" className="text-accent-foreground">
        {dateString}
      </Text>
      <Text type="label" tag="p" className="text-[24px] leading-8">
        {post.title}
      </Text>
    </div>
  )
}

export { JournalItems }
