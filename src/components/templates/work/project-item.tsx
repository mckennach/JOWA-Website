'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Category, Project, Tag } from '@/src/gql/graphql'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
export default function ProjectItem({
  project,
  index,
}: {
  project: Project
  index: number
}) {
	const searchParams = useSearchParams();
	const searchCategory = searchParams.get('category');
  const router = useRouter()
  const featuredImage =
    project?.featuredImage?.node ?? project?.projectFields?.heroImage?.node
  const categoryExists = project && project.categories && project?.categories.nodes.some(
		(category: Category) => category.slug === searchCategory
	);

	if(searchCategory && !categoryExists) return null;

  return (
    <div
      key={project.id}
      className={cn('border-b border-foreground py-8')}
      data-slug={project.slug}
    >
      <div className="flex flex-col-reverse gap-y-8 lg:flex-row">
        <div className="flex basis-full items-end lg:basis-1/2">
          <div
            className="flex cursor-pointer flex-col gap-8 lg:gap-12"
            onClick={() => {
              router.push(`/work/${project.slug}`)
            }}
          >
            <p>{zeroPad(index + 1, 2)}</p>
            <div>
              <h2 className="font-maisonNeueExt text-clamp uppercase text-accent">
                {project.title}
              </h2>
              <div>
                {project &&
                  project.categories &&
                  project.categories.nodes.map((category: Category) => {
                    if (category.parentId === 'dGVybToxMzcw') {
                      return (
                        <p key={category.id} className="uppercase text-accent">
                          {category.name}
                        </p>
                      )
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div
            className="relative aspect-[800/620] cursor-pointer after:absolute after:z-30 after:h-full after:w-full after:bg-transparent after:transition-all after:duration-300 hover:after:bg-accent/40"
            onClick={() => {
              router.push(`/work/${project.slug}`)
            }}
          >
            <Image
              src={featuredImage?.mediaItemUrl ?? ''}
              alt={featuredImage?.altText ?? ''}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              className=""
              loader={imageLoader}
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
