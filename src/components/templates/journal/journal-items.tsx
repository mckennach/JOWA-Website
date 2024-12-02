'use client'

import { Post, Tag } from '@/src/gql/graphql'
import { Container, Section } from '../../craft'
import Image from 'next/image'
import { cn, imageLoader } from '../../../lib/utils'
import { Text } from '../../ui/text'
import { useRouter, useSearchParams } from 'next/navigation'

const JournalItems = ({ posts }: { posts: Post[] }) => {
  const searchParams = useSearchParams()
  const searchCategory = searchParams.get('category')
  const router = useRouter()
  return (
    <Section className="overflow-hidden">
      <Container className=" ">
        <div className="grid gap-y-14 pb-24 pt-10 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-32">
          {posts.map((post, index) => {
            const categoryExists =
              post &&
              post.tags &&
              post?.tags.nodes.some((tag: Tag) => tag.slug === searchCategory)
            if (!searchCategory || categoryExists)
              return <JournalItem key={index} post={post} />
            return null
          })}
        </div>
      </Container>
      <div className="py-24 lg:border-b-[1.5px]">{/* PAG */}</div>
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
      className={cn(
        'group relative cursor-pointer space-y-4 before:absolute before:-bottom-20 before:-left-16 before:hidden before:h-[1.5px] before:w-[calc(112px+100%)] before:bg-walnut lg:before:block [&:nth-last-child(-n+3)]:before:opacity-0'
      )}
      onClick={() => {
        router.push(`/journal/${post.slug}`)
      }}
      role="button"
    >
      <div className="card-container relative space-y-6">
        <div className="image-hover relative aspect-square">
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
        <div className="space-y-2">
          <Text type="label" tag="p" className="text-accent-foreground">
            {dateString}
          </Text>
          <Text type="label" tag="p" className="text-[24px] leading-8">
            {post.title}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { JournalItems }
