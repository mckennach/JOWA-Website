'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileNavigation } from './mobile-navigation'
import { cn } from '@/src/lib/utils'
import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql'
import CustomIcons from '../custom-icons'
import { useMediaQuery } from 'usehooks-ts'

export default function Navigation({
  menuItems,
  className,
}: {
  menuItems: RootQueryToMenuItemConnection
  className?: string
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const matches = useMediaQuery('(min-width: 1285px)')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn('sticky top-0 z-[100] bg-transparent', 'fade-in', className)}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <div className="flex h-20 items-center justify-between px-4 lg:px-12">
        <Link
          className="flex items-center gap-2 transition-all hover:opacity-75"
          href="/"
        >
          <h2 className="sr-only">JOWA INTERIORS</h2>
          {isScrolled || !matches ? (
            <CustomIcons name="submark" />
          ) : (
            <CustomIcons name="logo-text" />
          )}
        </Link>
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden lg:flex lg:gap-24">
            {menuItems.nodes.map((item: MenuItem, index: number) => {
              if (!item.uri) return null

              return (
                <Link
                  itemProp="url"
                  href={item.uri}
                  key={index}
                  target={item.target || '_self'}
                  className="text-base uppercase"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )
            })}
          </div>
          <MobileNavigation menuItems={menuItems} />
          {/* <MobileNav /> */}
        </div>
      </div>
    </nav>
  )
}
