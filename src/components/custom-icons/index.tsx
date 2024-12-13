import { AboutLogo } from './about-logo'
import { ArrowLeft } from './arrow-left'
import { ArrowRight } from './arrow-right'
import { Link } from './link'
import { Logo } from './logo'
import { LogoText } from './logo-text'
import { Menu } from './menu'
import { Submark } from './submark'
export type Icon = {
  name:
    | 'arrow-right'
    | 'arrow-left'
    | 'about-logo'
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
    case 'about-logo':
      return <AboutLogo {...props} />
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
