'use client'

import CustomIcons from '@/src/components/custom-icons'
import { Post, RootQueryToPostConnection } from '@/src/gql/graphql'
import { cn, imageLoader } from '@/src/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Container, Section } from '../../../craft'
import { Text } from '../../../ui/text'
export default function NextPost({
  posts,
  currentId,
}: {
  posts: RootQueryToPostConnection
  currentId: string
}) {
  const router = useRouter()
  const numberOfPosts = posts.nodes.length
  const currentIndex = posts.nodes.findIndex(
    (post: Post) => post.id === currentId
  )
  const nextPostIndex = (currentIndex + 1) % numberOfPosts
  const nextPost = posts.nodes[nextPostIndex]
  const date = new Date(nextPost?.date as string)
  const dateString = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.')
  return (
    <Section className="bg-accent py-10 text-background lg:py-32">
      <Container className="">
        <div className="relative w-full">
          <div>
            <div>
              <div className="space-y-8 lg:flex lg:space-y-0 lg:px-4">
                <div className="flex flex-col justify-between gap-y-28 lg:basis-1/2 lg:gap-y-0">
                  <Text tag="h3" type="title1" className="text-foreground">
                    {nextPostIndex > 0 ? 'NEXT STORY' : 'FIRST STORY'}
                  </Text>
                  <div
                    className="max-w-[700px] cursor-pointer space-y-4 lg:space-y-12"
                    onClick={() => {
                      router.push(`/journal/${nextPost?.slug}`)
                    }}
                  >
                    <Text type="label">{dateString}</Text>
                    <div className="space-y-6">
                      <Text
                        type="title1"
                        tag="h4"
                        className="uppercase text-background"
                      >
                        {nextPost?.title}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="group lg:basis-1/2">
                  <div
                    className="image-hover relative aspect-[800/624] cursor-pointer"
                    onClick={() => {
                      router.push(`/journal/${nextPost?.slug}`)
                    }}
                  >
                    <Image
                      src={
                        nextPost?.postData?.featuredImage?.node.mediaItemUrl ??
                        ''
                      }
                      alt={
                        nextPost?.postData?.featuredImage?.node.altText ?? ''
                      }
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
            </div>

            <button
              onClick={() => {
                router.push(`/journal/${nextPost?.slug}`)
              }}
              className={cn(
                'absolute right-12 top-1/2 hidden -translate-y-1/2 opacity-30 hover:opacity-100 lg:block'
              )}
            >
              <CustomIcons name="arrow-right" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
