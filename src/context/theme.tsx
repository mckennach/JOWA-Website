'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const getTheme = () => {
    let theme = 'cream'
    if (pathname.includes('/work') || pathname.includes('/journal')) {
      theme = 'cream'
      if (pathname.includes('/work') && pathname.split('/').length > 2) {
        theme = 'cream-detail'
      }
    }

    if (pathname.includes('/contact')) {
      theme = 'sencha'
    }

    if (pathname.includes('/about')) {
      theme = 'walnut'
    }

    if (pathname === '/') {
      return 'cream'
    }

    return theme
  }

  return (
    <NextThemesProvider
      defaultTheme={getTheme()}
      themes={['default', 'cream', 'cream-detail', 'walnut', 'sencha']}
      forcedTheme={getTheme()}
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
