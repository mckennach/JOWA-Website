'use client'

import { cn } from '@/src/lib/utils'
import { forwardRef, useState, useCallback, useEffect } from 'react'
import { Text } from '@/src/components/ui/text'
import { Category, Tag } from '@/src/gql/graphql'
import { useRouter, usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
export type FilterItem = {
  label: string
  value: string
  count?: number
}

export type FilterProps = {
  label?: string
  items?: Tag[]
  onChange?: (value: Tag | null) => void
} & React.HTMLAttributes<HTMLDivElement>

const Filter = forwardRef<HTMLDivElement, FilterProps>(
  (
    { label = 'Filter By', items, className, onChange = () => null, ...props },
    ref
  ) => {
    const searchParams = useSearchParams()
    const searchCategory = searchParams.get('category')
    const router = useRouter()
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState<Tag | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const handleSetActiveItem = useCallback(
      (item: Tag | null) => {
        setActiveItem(item)
        setIsOpen(false)
        onChange(item)
        if (item) {
          const slug = item.slug
          const params = new URLSearchParams(searchParams.toString())
          slug && params.set('category', slug)
          router.push(`${pathname}?${params.toString()}`)
        } else {
          router.push(pathname)
        }
      },
      [onChange, router, pathname]
    ) // eslint-disable-line

    useEffect(() => {
      if (searchCategory && items) {
        const category = items.find((item) => item.slug === searchCategory)
        setActiveItem(category || null)
      }
    }, [searchCategory, items])

    return (
      <div ref={ref} className={cn('max-w-full', className)} {...props}>
        <div className="flex items-baseline">
          <div
            className="flex basis-1/2 lg:basis-[12.5%] cursor-pointer border-b"
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsOpen(!isOpen)
              }
            }}
            role="button"
          >
            <Text type="label" className="">
              {label}:
            </Text>
          </div>
          <div
            className={cn(
              'grid flex-shrink basis-1/2 lg:basis-[87.5%] lg:grid-flow-col lg:grid-cols-7 grid-rows-4',
              isOpen && '!hidden opacity-0'
            )}
          >
            <div
              className={cn('flex cursor-pointer border-b')}
              tabIndex={0}
              role="button"
              onClick={() => {
                setIsOpen(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsOpen(true)
                }
              }}
            >
              <Text
                className={cn(
                  !activeItem && isOpen && 'text-accent-foreground'
                )}
                type="label"
              >
                {activeItem ? activeItem.name : 'All'}
              </Text>
            </div>
          </div>
          <div
            className={cn(
              'grid flex-shrink basis-1/2 lg:basis-[87.5%] lg:grid-flow-col lg:grid-cols-7 grid-rows-4',
              !isOpen && 'invisible hidden opacity-0'
            )}
          >
            <div
              className={cn('flex border-b')}
              tabIndex={0}
              role="button"
              onClick={() => handleSetActiveItem(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSetActiveItem(null)
                }
              }}
            >
              <Text
                className={cn(
                  'hover:text-accent-foreground',
                  !activeItem && isOpen && 'text-accent-foreground'
                )}
                type="label"
              >
                All
              </Text>
            </div>
            {items &&
              items.map((item, index) => {
                return (
                  <div
                    key={index}
                    tabIndex={0}
                    role="button"
                    className={cn(
                      'flex cursor-pointer border-b',
                      !isOpen && 'invisible opacity-0',
                      activeItem === item && isOpen && 'text-accent-foreground'
                    )}
                    onClick={() => handleSetActiveItem(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSetActiveItem(item)
                      }
                    }}
                  >
                    <Text type="label" className="hover:text-accent-foreground">
                      {item.name}
                    </Text>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
)

Filter.displayName = 'Filter'

export { Filter }
