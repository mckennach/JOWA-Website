'use client'
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children }: {
	children: React.ReactNode;
}) => {
	const pathname = usePathname();

	const getTheme = () => {
		switch (pathname) {
			case '/':
				return 'green';
			case '/work/':
					return 'dawn';
			default:
				return 'green';
		}
	};

  return (
    <NextThemesProvider defaultTheme={getTheme()} themes={[
			'green',
			'brown',
			'dawn'
		]} 
		forcedTheme={getTheme()}
		attribute="class">
      {children}
    </NextThemesProvider>
  );
};