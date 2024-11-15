'use client'

import Image from 'next/image'
import { Container } from '@/src/components/craft'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Post, Tag } from '@/src/gql/graphql'
import { Text } from '@/src/components/ui/text'
import Link from 'next/link'
import CustomIcons from '@/src/components/custom-icons'
import ShareButton from '@/src/components/ui/share'

export default function JournalHero({ post }: { post: Post }) {
  const date = new Date(post?.date as string)
  const dateString = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.')

  return (
    <header className="relative h-auto overflow-hidden border-b border-t">
      <div className="flex flex-col lg:h-[90vh] lg:flex-row">
        <Container className="flex h-full flex-col justify-between pb-12 pt-6 lg:basis-1/2 lg:pl-24">
          <div className="flex justify-end">
            <ShareButton />
          </div>
          <div className="space-y-12">
            <Text type="label">{dateString}</Text>
            <div className="space-y-6">
              <Text type="title1" tag="h1" className="text-accent-foreground">
                {post.title}
              </Text>
              <Text type="label" className="block">
                BY {post.author?.node?.name?.toUpperCase()}
              </Text>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-32 lg:pt-0">
            {(post.tags?.nodes as Tag[]).map((tag, index) => {
              return (
                <Link
                  href={`/journal?tag=${tag.slug}`}
                  key={index}
                  className="rounded-lg border border-accent px-4 py-1.5 text-accent hover:bg-accent hover:text-background"
                >
                  <Text className="text-[14px] leading-5">{tag.name}</Text>
                </Link>
              )
            })}
          </div>
        </Container>
        <div className="h-full lg:basis-1/2">
          <div className="relative aspect-[200/259] h-full w-full lg:aspect-auto">
            <Image
              src={post.postData?.heroImage?.node.mediaItemUrl ?? ''}
              alt={post.postData?.featuredImage?.node.altText ?? ''}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              className="brightness-75 filter"
              loader={imageLoader}
              priority={true}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
