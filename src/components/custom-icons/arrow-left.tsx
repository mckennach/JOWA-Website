import { cn } from '@/src/lib/utils'
import { type Icon } from '.'

export const ArrowLeft = ({
  color = 'currentColor',
  className,
  ...props
}: Icon) => {
  return (
    <svg
      className="rotate-180 transform"
      width="63"
      height="114"
      viewBox="0 0 63 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 112L61 57L2 2"
        stroke="#FBF1DF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
