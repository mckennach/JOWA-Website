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
import { useMediaQuery } from 'usehooks-ts'
interface ShareButtonProps {
  className?: string
  children?: React.ReactNode
}

const ShareButton = forwardRef<HTMLDivElement, ShareButtonProps>(
  ({ children, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const matches = useMediaQuery('(min-width: 1024px)')

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
              side={matches ? 'right' : 'bottom'}
              sideOffset={matches ? 15 : 10}
              alignOffset={matches ? 0 : 0}
              align={matches ? 'center' : 'start'}
              hideWhenDetached={false}
              onPointerDownOutside={() => setIsOpen(false)}
              className={cn('px-2 py-4')}
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
                    padding: 0,
                  },
                  copyContainer: {
                    color: 'hsla(16 37% 18% / 0.9)',
                    background: 'hsla(39 78% 93% / 1)',
                  },
                  copyUrl: {
                    color: 'hsla(16 37% 18% / 0.9)',
                    whiteSpace: 'wrap',
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
