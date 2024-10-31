'use client'

import { Post, RootQueryToPostConnection } from '@/src/gql/graphql'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'
import { Section, Container } from '../../../craft'
import { Text } from '../../../ui/text'
import Image from 'next/image'
import { cn, imageLoader, zeroPad } from '@/src/lib/utils'
import CustomIcons from '@/src/components/custom-icons'
import { useRouter } from 'next/navigation'
export default function NextPost({
  posts,
  currentId,
}: {
  posts: RootQueryToPostConnection
  currentId: string
}) {
  const router = useRouter()

  return (
    <Section className="bg-accent py-32 text-background">
      <Container className="">
        <Text tag="h3" className="text-[48px] leading-8 text-foreground">
          NEXT JOURNAL POST
        </Text>
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
          }}
        >
          <CarouselContent>
            {posts.nodes
              .filter((post: Post) => post.id !== currentId)
              .map((post: Post, index: number) => {
                const date = new Date(post?.date as string)
                const dateString = date
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replaceAll('/', '.')
                return (
                  <CarouselItem key={index}>
                    <div className="space-y-8 lg:flex lg:px-4">
                      <div className="flex items-end lg:basis-1/2">
                        <div
                          className="max-w-[700px] cursor-pointer space-y-12"
                          onClick={() => {
                            router.push(`/journal/${post.slug}`)
                          }}
                        >
                          <Text type="label">{dateString}</Text>
                          <div className="space-y-6">
                            <Text
                              type="heading"
                              tag="h4"
                              className="text-[48px] uppercase text-background"
                            >
                              {post.title}
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="lg:basis-1/2">
                        <div
                          className="relative aspect-[800/624] cursor-pointer"
                          onClick={() => {
                            router.push(`/journal/${post.slug}`)
                          }}
                        >
                          <Image
                            src={
                              post.postData?.featuredImage?.node.mediaItemUrl ??
                              ''
                            }
                            alt={
                              post.postData?.featuredImage?.node.altText ?? ''
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
                  </CarouselItem>
                )
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </Section>
  )
}

const CarouselPrevious = () => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        'absolute left-12 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100',
        !canScrollPrev && 'hidden'
      )}
    >
      <CustomIcons name="arrow-left" />
    </button>
  )
}

const CarouselNext = () => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        'absolute right-12 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100',
        !canScrollNext && 'hidden'
      )}
    >
      <CustomIcons name="arrow-right" />
    </button>
  )
}
