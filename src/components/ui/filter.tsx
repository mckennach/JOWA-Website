import { cn } from '@/src/lib/utils'
import { forwardRef } from 'react'
import { Text } from '@/src/components/ui/text'
export type FilterItem = {
  label: string
  value: string
  count?: number
}

export type FilterProps = {
  label?: string
  items?: Array<FilterItem>
  activeItem?: FilterItem
  onChange?: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const Filter = forwardRef<HTMLDivElement, FilterProps>(
  (
    {
      label = 'Filter By',
      items,
      activeItem,
      className,
      onChange = () => null,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex max-w-full flex-col', className)}
        {...props}
      >
        <div className="grid grid-cols-3 lg:grid-cols-8">
          <div className="flex border-b">
            <Text type="label" className="">
              {label}:
            </Text>
          </div>
          <div className="flex border-b">
            <Text type="label" className="">
              {activeItem?.label}
            </Text>
          </div>
        </div>
      </div>
    )
  }
)

Filter.displayName = 'Filter'

export { Filter }
