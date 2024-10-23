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
  size?:
    | 'default'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
  type?:
    | 'default'
    | 'heading'
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
      heading: 'uppercase text-[48px] leading-heading font-normal',
      body: 'font-normal',
      caption: 'text-xs',
      label: 'uppercase text-xl leading-label font-normal',
      small: 'text-xs',
      strong: 'font-bold',
      em: 'italic',
      blockquote: 'italic',
      eyebrow: 'text-eyebrow',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
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
