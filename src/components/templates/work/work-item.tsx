'use client'

import Image from 'next/image'
import { imageLoader } from '@/src/lib/utils'
import { Post, Tag } from '@/src/gql/graphql'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'

export default function WorkItem({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <div
      key={post.id}
      className={cn('border-b border-foreground py-8')}
      data-slug={post.slug}
    >
      <div className="flex">
        <div className="flex basis-1/2 items-end">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push(`/${post.slug}`)
            }}
          >
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
        <div className="basis-1/2">
          <div className="relative aspect-[800/620] cursor-pointer" onClick={() => {
              router.push(`/${post.slug}`)
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}