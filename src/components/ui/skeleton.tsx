import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-black/30', className)} {...props} />
  )
}

export { Skeleton }
