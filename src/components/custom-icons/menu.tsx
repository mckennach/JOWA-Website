import { type Icon } from '.'

export const Menu = ({ color = 'currentColor', ...props }: Icon) => {
  return (
    <svg
      width="27"
      height="18"
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 17.5V14.6667H26.25V17.5H0.75ZM0.75 10.4167V7.58333H26.25V10.4167H0.75ZM0.75 3.33333V0.5H26.25V3.33333H0.75Z"
        fill={color}
      />
    </svg>
  )
}
