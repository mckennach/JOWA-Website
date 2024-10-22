'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Category, Project, Tag } from '@/src/gql/graphql'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'

export default function WorkItem({ project, index }: { project: Project, index: number }) {
  const router = useRouter();
	console.log(project);
  return (
    <div
      key={project.id}
      className={cn('border-b border-foreground py-8')}
      data-slug={project.slug}
    >
      <div className="flex flex-col-reverse gap-y-8 lg:flex-row">
        <div className="flex basis-full lg:basis-1/2 items-end">
          <div
            className="flex flex-col gap-8 lg:gap-12 gap-cursor-pointer"
            onClick={() => {
              router.push(`/work/${project.slug}`)
            }}
          >
						<p>{zeroPad(index + 1, 2)}</p>
						<div>
							<h2 className="font-maisonNeueExt text-[48px] uppercase text-accent-foreground">
								{project.title}
							</h2>
							<div>
								{project && project.categories && project.categories.nodes.map((category: Category) => {
									if(category.parentId === 'dGVybToxMzcw') {
										return (
											<p key={category.id} className="text-accent-foreground uppercase">{category.name}</p>
										)
									}
								})}
							</div>
						</div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="relative aspect-[800/620] cursor-pointer" onClick={() => {
              router.push(`/work/${project.slug}`)
            }}>
            <Image
              src={project.projectFields?.heroImage?.node.mediaItemUrl ?? ''}
              alt="alt"
              layout="fill"
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