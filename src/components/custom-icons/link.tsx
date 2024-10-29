import { cn } from '@/src/lib/utils'
import { type Icon } from '.'

export const Link = ({ color = 'currentColor', className, ...props }: Icon) => {
  return (
    <svg
      {...props}
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2334 1.36572C12.2334 0.951509 11.8976 0.615722 11.4834 0.615722L4.7334 0.615722C4.31919 0.615722 3.9834 0.951508 3.9834 1.36572C3.9834 1.77994 4.31919 2.11572 4.7334 2.11572H10.7334V8.11572C10.7334 8.52994 11.0692 8.86572 11.4834 8.86572C11.8976 8.86572 12.2334 8.52994 12.2334 8.11572L12.2334 1.36572ZM2.01373 11.8961L12.0137 1.89605L10.9531 0.835392L0.953068 10.8354L2.01373 11.8961Z"
        fill={color}
      />
    </svg>
  )
}
