import { AriaRole, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export type TextProps = {
  children: React.ReactNode
  className?: string
  tag?:
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div'
    | 'label'
    | 'caption'
    | 'small'
    | 'strong'
    | 'em'
    | 'blockquote'
  size?: 'default'
  type?:
    | 'footer'
    | 'default'
    | 'heading'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'title5'
    | 'title6'
    | 'body'
    | 'caption'
    | 'label'
    | 'small'
    | 'strong'
    | 'em'
    | 'blockquote'
    | 'eyebrow'
} & React.HTMLAttributes<HTMLElement>

const textVariants = cva('', {
  variants: {
    variant: {
      default: '',
      heading: 'heading-xl-fluid',
      footer: 'footer-link',
      title1: 'title-xl-fluid',
      title2: 'title-lg-fluid',
      title3: 'title-md-fluid',
      title4: 'title-sm-fluid',
      title5: 'title-xs-fluid',
      title6: 'title-xxs-fluid',
      body: 'body-xl-fluid',
      caption: 'caption-sm-fluid',
      label: 'label-fluid',
      small: 'text-xs',
      strong: 'font-bold',
      em: 'italic',
      blockquote: 'italic',
      eyebrow: 'text-eyebrow',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      tag = 'span',
      size = 'default',
      type = 'default',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const Tag = tag

    const classes = cn(textVariants({ size, variant: type, className }))

    return (
      // @ts-ignore
      <Tag className={classes} {...props} ref={ref}>
        {children}
      </Tag>
    )
  }
)

Text.displayName = 'Text'

export { Text }
