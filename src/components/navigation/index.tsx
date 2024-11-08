'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileNavigation } from './mobile-navigation'
import { cn } from '@/src/lib/utils'
import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql'
import CustomIcons from '../custom-icons'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'

export default function Navigation({
  menuItems,
  className,
}: {
  menuItems: RootQueryToMenuItemConnection
  className?: string
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const matches = useMediaQuery('(min-width: 1024px)')
  const pathname = usePathname();
	

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isWorkDetail =
    pathname.includes('work') && pathname.split('/').length > 2

  return (
    <nav
      className={cn(
        'group sticky top-0 z-[150] w-full bg-transparent',
        'fade-in',
        isWorkDetail && 'fixed',
        className
      )}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <div className="flex h-[var(--nav-height)] items-center justify-between px-4 transition-all duration-300 ease-in-out lg:px-12">
        <Link
          className={cn(
            'relative flex items-center gap-2 transition-all hover:opacity-75',
            isScrolled || !matches ? 'h-[26px] w-[54px]' : 'h-[24px] w-[314px]'
          )}
          href="/"
        >
          <h2 className="sr-only">JOWA INTERIORS</h2>
          <CustomIcons
            name="submark"
            className={cn(
              'absolute top-0 transition-all duration-300 ease-in-out',
              isWorkDetail && 'text-cream',
              isScrolled ? 'opacity-1 visible' : 'lg:invisible lg:opacity-0'
            )}
          />
          <CustomIcons
            name="logo-text"
            className={cn(
              'absolute top-0 hidden transition-all duration-300 ease-in-out lg:block',
              isWorkDetail && 'text-cream',
              !isScrolled ? 'lg:opacity-1 lg:visible' : 'invisible opacity-0'
            )}
          />
        </Link>
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden lg:flex lg:gap-14 xl:gap-24 transition-all duration-75">
            {menuItems.nodes.map((item: MenuItem, index: number) => {
              if (!item.uri) return null
              const isActive =
                item.uri.split('/')[1] === pathname.split('/')[1]
                  ? 'active'
                  : ''
              return (
                <Link
                  itemProp="url"
                  href={item.uri}
                  key={index}
                  target={item.target || '_self'}
                  className={cn(
                    'nav-fluid transition-all',
                    isActive,
                    isWorkDetail && 'text-cream before:bg-background'
                  )}
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )
            })}
          </div>
					{!matches && (
	          <MobileNavigation menuItems={menuItems} />
					)}
          {/* <MobileNav /> */}
        </div>
      </div>
    </nav>
  )
}
