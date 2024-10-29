import { Logo } from './logo'
import { LogoText } from './logo-text'
import { Menu } from './menu'
import { Link } from './link'
import { Submark } from './submark'
import { ArrowRight } from './arrow-right'
import { ArrowLeft } from './arrow-left'

export type Icon = {
  name:
    | 'arrow-right'
    | 'arrow-left'
    | 'logo'
    | 'logo-text'
    | 'submark'
    | 'menu'
    | 'arrow-right-square'
    | 'link'
  color?: string
} & React.SVGProps<SVGSVGElement>

export default function CustomIcons({ ...props }: Icon) {
  switch (props.name) {
    case 'logo':
      return <Logo {...props} />
    case 'logo-text':
      return <LogoText {...props} />
    case 'submark':
      return <Submark {...props} />
    case 'menu':
      return <Menu {...props} />
    case 'link':
      return <Link {...props} />
    case 'arrow-right':
      return <ArrowRight {...props} />
    case 'arrow-left':
      return <ArrowLeft {...props} />
    default:
      return null
  }
}
