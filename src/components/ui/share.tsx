'use client'

import { forwardRef, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/src/lib/utils'
import CustomIcons from '../custom-icons'
import { ShareSocial } from 'react-share-social'
import { usePathname } from 'next/navigation'
import { fontFamily } from 'tailwindcss/defaultTheme'

interface ShareButtonProps {
  className?: string
  children?: React.ReactNode
}

const ShareButton = forwardRef<HTMLDivElement, ShareButtonProps>(
  ({ children, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    return (
      <div ref={ref}>
        <TooltipProvider>
          <Tooltip disableHoverableContent={true} open={isOpen}>
            <TooltipTrigger
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                (className =
                  'flex items-center justify-center gap-1 tracking-wider lg:justify-start'),
                className
              )}
            >
              SHARE <CustomIcons name="link" />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={15}
              hideWhenDetached={false}
              onPointerDownOutside={() => setIsOpen(false)}
            >
              <ShareSocial
                title="Share this page"
                url={window.location.href}
                socialTypes={['facebook', 'twitter', 'linkedin']}
                style={{
                  root: {
                    background: 'transparent',
                    borderRadius: 3,
                    border: 0,
                    color: 'hsla(16 37% 18% / 0.9)',
                  },
                  copyContainer: {
                    color: 'hsla(16 37% 18% / 0.9)',
                    background: 'hsla(39 78% 93% / 1)',
                  },
                  copyUrl: {
                    color: 'hsla(16 37% 18% / 0.9)',
                  },
                  copyIcon: {
                    color: 'hsla(16 37% 18% / 0.9)',
                  },
                  title: {
                    fontFamily:
                      'Maison Neue Ext,ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
                    color: 'hsla(16 37% 18% / 0.9)',
                    fontWeight: '400',
                  },
                }}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
)

ShareButton.displayName = 'ShareButton'

export default ShareButton
