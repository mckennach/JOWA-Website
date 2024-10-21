import { Logo } from './logo'
import { LogoText } from './logo-text'
import { Menu } from './menu'
import { Submark } from './submark'

export type Icon = {
  name: 'logo' | 'logo-text' | 'submark' | 'menu' | 'arrow-right-square'
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
    default:
      return null
  }
}
