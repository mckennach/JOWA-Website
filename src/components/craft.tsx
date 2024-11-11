import * as React from 'react'

// cn util
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Layout Component
type LayoutProps = {
  children: React.ReactNode
  className?: string
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('scroll-smooth antialiased focus:scroll-auto', className)}
    >
      {children}
    </html>
  )
}

// Main Component
type MainProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Main = ({ children, className, id }: MainProps) => {
  return (
    <main
      className={cn(
        // `Main` Specific Styles
        // "max-w-none prose-p:m-0",
        // // General Prose
        // "prose prose-neutral prose:font-maisonNeueExt dark:prose-invert xl:prose-lg",
        // // Prose Headings
        // "prose-headings:font-normal",
        // // Prose Strong
        // "prose-strong:font-semibold",
        // // Inline Links
        // "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        // // Inline Link Hover
        // "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        // // Blockquotes
        // "prose-blockquote:not-italic",
        // // Pre and Code Blocks
        // "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
        className
      )}
      id={id}
    >
      {children}
    </main>
  )
}

// Section Component
type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, id }, ref) => {
    return (
      <section className={cn(className)} id={id} ref={ref}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

// Container Component
type ContainerProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, id }, ref) => {
    return (
      <div className={cn('container', className)} id={id} ref={ref}>
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

// Article Component
type ArticleProps = {
  children?: React.ReactNode
  className?: string
  id?: string
  dangerouslySetInnerHTML?: { __html: string }
}

const Article = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}: ArticleProps) => {
  return (
    <article
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={cn(
        // General Prose
        'prose:font-maisonNeueExt prose prose-neutral dark:prose-invert xl:prose-lg',
        // Prose Headings
        'prose-headings:font-normal',
        // Prose Paragraphs
        'prose-p:mb-2',
        // Prose Strong
        'prose-strong:font-semibold',
        // Inline Links
        'prose-a:text-foreground/75 prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:transition-all',
        // Inline Link Hover
        'hover:prose-a:text-foreground hover:prose-a:decoration-primary',
        // Blockquotes
        'prose-blockquote:not-italic',
        // Pre and Code Blocks
        'prose-pre:border prose-pre:bg-muted/25',
        // Images
        'prose-img:overflow-hidden prose-img:rounded-lg prose-img:border',
        className
      )}
      id={id}
    >
      {children}
    </article>
  )
}

interface FadedDivProps {
  children?: React.ReactNode
  className?: string
}

export default function FadeDiv({ children, className }: FadedDivProps) {
  return (
    <div className={cn('animate-fade-in opacity-0', className)}>{children}</div>
  )
}

export { Layout, Main, Section, Container, Article, FadeDiv }
