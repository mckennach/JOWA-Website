'use client'

import { Text } from '@/src/components/ui/text'
import { Tag } from '@/src/gql/graphql'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { forwardRef, useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export type FilterItem = {
  label: string
  value: string
  count?: number
}

export type FilterProps = {
  label?: string
  items?: Tag[]
  onChange?: (value: Tag | null) => void
  columns?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Filter = forwardRef<HTMLDivElement, FilterProps>(
  (
    {
      label = 'Filter By',
      items,
      className,
      onChange = () => null,
      columns = false,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const searchCategory = searchParams.get('q')
    const router = useRouter()
    const pathname = usePathname()
    const [clickedOpen, setClickedOpen] = useState(false)
    const [activeItem, setActiveItem] = useState<Tag | null>(null)
    const [isOpen, setIsOpen] = useState(true)

    const handleSetActiveItem = useCallback(
      (item: Tag | null) => {
        setActiveItem(item)
        setIsOpen(false)
        onChange(item)
        const params = new URLSearchParams(searchParams.toString())
        if (item) {
          const slug = item.slug
          let newurl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?q=' +
            slug
          window.history.pushState({ path: newurl }, '', newurl)
        } else {
          let newurl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname
          window.history.pushState({ path: newurl }, '', newurl)
        }
      },
      [onChange, searchParams]
    )

    const handleScroll = () => {
      if (window.scrollY > 500) {
        if (clickedOpen) return
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [clickedOpen])

    useEffect(() => {
      if (searchCategory && items) {
        const category = items.find((item) => item.slug === searchCategory)
        setActiveItem(category || null)
      }
    }, [searchCategory, items])

    const handleClose = () => {
      setIsOpen(false)
      setClickedOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
      if (e.key === 'Enter') {
        callback()
      }
    }

    const handleClick = () => {
      setIsOpen(!isOpen)
      setClickedOpen(!isOpen)
    }

    useOnClickOutside(containerRef as RefObject<HTMLDivElement>, handleClose)

    return (
      <div ref={ref} className={cn('max-w-full', className)} {...props}>
        <div className="flex items-baseline" ref={containerRef}>
          <div
            className="flex basis-1/2 cursor-pointer border-b lg:basis-[12.5%]"
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, handleClick)}
            role="button"
          >
            <Text type="label" className="">
              {label}:
            </Text>
          </div>
          <div
            className={cn(
              'grid flex-shrink basis-1/2 grid-rows-4 lg:basis-[87.5%] lg:grid-flow-col lg:grid-cols-7',
              isOpen && '!hidden opacity-0'
            )}
          >
            <div
              className={cn('flex cursor-pointer border-b')}
              tabIndex={0}
              role="button"
              onClick={() => setIsOpen(true)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(true))}
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
              'grid flex-shrink basis-1/2 grid-rows-8 lg:basis-[87.5%] lg:grid-flow-col lg:grid-cols-5',
              columns && 'grid-rows-4',
              !isOpen && 'invisible hidden opacity-0'
            )}
          >
            <Link
              href={pathname}
              className={cn('flex border-b')}
              tabIndex={0}
              role="button"
              onMouseOver={() => {
                router.prefetch(pathname)
              }}
              onClick={(e) => {
                e.preventDefault()
                handleSetActiveItem(null)
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleSetActiveItem(null))
              }
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
            </Link>
            {items &&
              items.map((item, index) => (
                <Link
                  href={`${pathname}?q=${item.slug}`}
                  key={index}
                  tabIndex={0}
                  role="button"
                  className={cn(
                    'flex cursor-pointer border-b',
                    !isOpen && 'invisible opacity-0',
                    activeItem === item && isOpen && 'text-accent-foreground'
                  )}
                  onMouseOver={() => {
                    router.prefetch(`${pathname}?q=${item.slug}`)
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSetActiveItem(item)
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, () => handleSetActiveItem(item))
                  }
                >
                  <Text type="label" className="hover:text-accent-foreground">
                    {item.name}
                  </Text>
                </Link>
              ))}
          </div>
        </div>
      </div>
    )
  }
)

Filter.displayName = 'Filter'

export { Filter }
