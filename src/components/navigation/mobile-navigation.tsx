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

type MobileNavigationProps = {
  menuItems: RootQueryToMenuItemConnection
}

export function MobileNavigation({ menuItems }: MobileNavigationProps) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2 lg:hidden">
        <span className="sr-only">Toggle Menu</span>
        <CustomIcons name="menu" className="w-[25px]" />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="flex h-screen flex-col bg-popover p-0 text-popover-foreground"
      >
        <header className="flex basis-1/4 items-start px-3.5 py-8">
          <div className="flex w-full items-center justify-between">
            <MobileLink href="/" onOpenChange={setOpen}>
              <CustomIcons name="submark" className="text-background" />
            </MobileLink>
            <SheetClose className="p-2">
              <X className="text-background" width={30} />
            </SheetClose>
          </div>
        </header>
        <div className="my-4 h-[calc(100vh)] flex flex-col justify-end">
          <div className="flex flex-col space-y-3 text-secondary-foreground">
            <ul className="w-full [&>li]:px-14 [&>li]:py-6 [&>li]:border-b [&>li]:border-b-background">
              {menuItems.nodes.map((item: MenuItem, index: number) => {
                if (!item.uri) return null
                return (
                  <li key={index}>
                    <MobileLink href={item.uri} className={cn("text-[32px] text-secondary-foreground uppercase")}>{item.label}</MobileLink>
                  </li>
                )
              })}
            </ul>
          </div>
					<div className="py-6 text-center">
						<p className="font-maisonNeue text-background">Where your vision unfolds.</p>
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
      href="/"
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
