'use client'

import { useState } from 'react'
import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X } from 'lucide-react'
import CustomIcons from '../custom-icons'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { usePathname } from 'next/navigation'
type MobileNavigationProps = {
  menuItems: RootQueryToMenuItemConnection
}

export function MobileNavigation({ menuItems }: MobileNavigationProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isWorkDetail =
    pathname.includes('work') && pathname.split('/').length > 3
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2 lg:hidden">
        <span className="sr-only">Toggle Menu</span>
        <CustomIcons
          name="menu"
          className={cn('w-[25px]', isWorkDetail && 'text-background')}
        />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="mobile-navigation flex h-screen flex-col bg-popover p-0"
      >
        <header className="flex basis-1/4 items-start px-3.5 py-8">
          <div className="flex w-full items-center justify-between">
            <MobileLink href="/" onOpenChange={setOpen}>
              <CustomIcons name="submark" className="text-accent-foreground" />
            </MobileLink>
            <SheetClose className="p-2">
              <X className="text-accent-foreground" width={30} />
            </SheetClose>
          </div>
        </header>
        <div className="my-4 flex h-[calc(100vh)] flex-col justify-end">
          <div className="flex flex-col space-y-3 text-foreground">
            <ul className="w-full [&>li]:border-b [&>li]:px-14 [&>li]:py-6">
              {menuItems.nodes.map((item: MenuItem, index: number) => {
                if (!item.uri) return null
                return (
                  <li key={index}>
                    <MobileLink
                      href={item.uri}
                      className={cn('text-[32px] uppercase text-foreground')}
                      onOpenChange={setOpen}
                    >
                      {item.label}
                    </MobileLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="py-6 text-center">
            <p className="font-maisonNeue text-accent-foreground">
              Where your vision unfolds.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href.toString()}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn('', className)}
      {...props}
    >
      {children}
    </Link>
  )
}
