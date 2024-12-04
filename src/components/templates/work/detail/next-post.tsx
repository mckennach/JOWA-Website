'use client'

import {
  Post,
  Category,
  Project,
  RootQueryToProjectConnection,
} from '@/src/gql/graphql'
import Link from 'next/link'
import { Section, Container } from '../../../craft'
import { Text } from '../../../ui/text'
import Image from 'next/image'
import { cn, imageLoader, zeroPad } from '@/src/lib/utils'
import CustomIcons from '@/src/components/custom-icons'
import { useRouter } from 'next/navigation'
export default function NextPost({
  projects,
  currentId,
}: {
  projects: RootQueryToProjectConnection
  currentId: string
}) {
  const router = useRouter()
  const numberOfPosts = projects.nodes.length
  const currentIndex = projects.nodes.findIndex(
    (project: Project) => project.id === currentId
  )
  const nextPostIndex = (currentIndex + 1) % numberOfPosts
  const nextPost = projects.nodes[nextPostIndex]
  const date = new Date(nextPost?.date as string)

  return (
    <Section className="bg-foreground py-10 lg:py-32">
      <Container className="">
        <div className="relative w-full">
          <div>
            <div>
              <div className="space-y-8 lg:flex lg:space-y-0 lg:px-4">
                <div className="flex flex-col justify-between gap-y-28 lg:basis-1/2 lg:gap-y-0">
                  <Text tag="h3" type="title1" className="text-background">
                    NEXT PROJECT
                  </Text>
                  <div
                    className="max-w-[700px] cursor-pointer"
                    onClick={() => {
                      router.push(`/work/${nextPost.slug}`)
                    }}
                  >
                    <div className="space-y-4">
                      <Text
                        type="title1"
                        tag="h4"
                        className="uppercase text-accent"
                      >
                        {nextPost.title}
                      </Text>
                      <div>
                        {nextPost &&
                          nextPost.categories &&
                          nextPost.categories.nodes.map(
                            (category: Category) => {
                              if (category.parentId === 'dGVybToxMzcw') {
                                return (
                                  <Text
                                    type="label"
                                    key={category.id}
                                    className="text-accent"
                                  >
                                    {category.name}
                                  </Text>
                                )
                              }
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group lg:basis-1/2">
                  <div
                    className="image-hover relative aspect-[800/624] cursor-pointer"
                    onClick={() => {
                      router.push(`/work/${nextPost.slug}`)
                    }}
                  >
                    <Image
                      src={nextPost.featuredImage?.node.mediaItemUrl ?? ''}
                      alt={nextPost.featuredImage?.node.altText ?? ''}
                      fill={true}
                      style={{
                        objectFit: 'cover',
                      }}
											sizes="800px"
                      className="brightness-75 filter"
                      loader={imageLoader}
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/work/${projects.nodes[0].slug}`}
            className={cn(
              'absolute right-5 top-[65%] hidden -translate-y-1/2 opacity-30 hover:opacity-100 lg:right-12 lg:top-1/2 lg:block'
            )}
          >
            <CustomIcons name="arrow-right" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
