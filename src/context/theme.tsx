'use client'
import { usePathname } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  console.log(pathname)
  const getTheme = () => {
    let theme = 'green'
    if (pathname.includes('/work') || pathname.includes('/journal')) {
      theme = 'dawn'
    }

    if (pathname.includes('/about')) {
      theme = 'brown'
    }

    return theme
  }

  return (
    <NextThemesProvider
      defaultTheme={getTheme()}
      themes={['green', 'brown', 'dawn']}
      forcedTheme={getTheme()}
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
