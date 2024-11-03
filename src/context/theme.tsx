'use client'
import { usePathname } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const getTheme = () => {
    let theme = 'default'
    if (pathname.includes('/work') || pathname.includes('/journal')) {
      theme = 'cream'
    }

    if (pathname.includes('/contact')) {
      theme = 'sencha'
    }

    if (pathname.includes('/about')) {
      theme = 'walnut'
    }

    return theme
  }

  return (
    <NextThemesProvider
      defaultTheme={getTheme()}
      themes={['default', 'cream', 'walnut', 'sencha']}
      forcedTheme={getTheme()}
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
