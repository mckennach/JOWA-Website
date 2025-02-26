'use client'

import { Project, Tag } from '@/src/gql/graphql'
import { cn, imageLoader, zeroPad } from '@/src/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomIcons from '../../custom-icons'
import { Text } from '../../ui/text'
export default function ProjectItem({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const searchParams = useSearchParams()
  const searchCategory = searchParams.get('q')
  const router = useRouter()
  const featuredImage =
    project?.projectFields?.landingImage?.node ??
    project?.projectFields?.landingImage?.node

  const categoryExists =
    project &&
    project.tags &&
    project?.tags.nodes.some((tag: Tag) => tag.slug === searchCategory)

  if (searchCategory && !categoryExists) return null

  return (
    <div
      key={project.id}
      className={cn('border-b border-foreground py-8')}
      data-slug={project.slug}
    >
      <div className="flex flex-col-reverse gap-y-8 lg:flex-row">
        <div className="flex basis-full items-end lg:basis-1/2">
          <Link
            href={`/work/${project.slug}`}
            aria-disabled={project?.projectFields?.comingSoon ?? false}
            tabIndex={project?.projectFields?.comingSoon ? -1 : 0}
            className={
              project?.projectFields?.comingSoon
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            }
          >
            <p>{zeroPad(index + 1, 2)}</p>
            <div className="space-y-2">
              <Text
                type="title1"
                tag="h2"
                className="font-maisonNeueExt text-clamp uppercase text-accent"
              >
                {project.title}
              </Text>
              <div>
                {project.projectFields?.projectInfo?.category && (
                  <Text type="label" className="text-accent">
                    {project?.projectFields?.comingSoon
                      ? 'COMING SOON'
                      : project.projectFields?.projectInfo?.category}
                  </Text>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="basis-1/2">
          <Link
            href={`/work/${project.slug}`}
            aria-disabled={project?.projectFields?.comingSoon ?? false}
            tabIndex={project?.projectFields?.comingSoon ? -1 : 0}
            className={
              project?.projectFields?.comingSoon
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            }
          >
            <div className="relative aspect-[800/620] bg-cream cursor-pointer after:absolute after:z-30 after:h-full after:w-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-accent/40">
              {featuredImage?.sourceUrl ? (
                <Image
                  src={featuredImage?.sourceUrl ?? '/placeholder.svg'}
                  alt={featuredImage?.altText ?? ''}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  sizes={featuredImage?.sizes ?? ''}
                  className=""
                  loader={featuredImage?.sourceUrl ? imageLoader : undefined}
                  priority={true}
                />
              ) : (
                <CustomIcons
                  name="submark"
                  className={cn(
                    'scale-[4] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nav-foreground transition-all duration-300 ease-in-out'
                  )}
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
