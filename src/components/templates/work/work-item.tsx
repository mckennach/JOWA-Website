'use client'

import Image from 'next/image'
import { imageLoader, zeroPad } from '@/src/lib/utils'
import { Post, Tag } from '@/src/gql/graphql'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'

export default function WorkItem({ post, index }: { post: Post, index: number }) {
  const router = useRouter()
  return (
    <div
      key={post.id}
      className={cn('border-b border-foreground py-8')}
      data-slug={post.slug}
    >
      <div className="flex flex-col-reverse gap-y-8 lg:flex-row">
        <div className="flex basis-full lg:basis-1/2 items-end">
          <div
            className="flex flex-col gap-8 lg:gap-12 gap-cursor-pointer"
            onClick={() => {
              router.push(`/work/${post.slug}`)
            }}
          >
						<p>{zeroPad(index + 1, 2)}</p>
						<div>
							<h2 className="font-maisonNeueExt text-[48px] uppercase text-accent-foreground">
								{post.title}
							</h2>
							<div>
								{post &&
									post.tags &&
									post.tags.nodes.map((tag) => (
										<span key={(tag as Tag).name}>{(tag as Tag).name}</span>
									))}
							</div>
						</div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="relative aspect-[800/620] cursor-pointer" onClick={() => {
              router.push(`/work/${post.slug}`)
            }}>
            <Image
              src={post.featuredImage?.node?.sourceUrl ?? ''}
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