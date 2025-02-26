import { NextResponse } from 'next/server'
import { auth } from './lib/api/auth'

export default auth(async (req) => {
  if (!process.env.WP_USER || !process.env.WP_APP_PASS) {
    return NextResponse.next()
  }

  const basicAuth = `${process.env.WP_USER}:${process.env.WP_APP_PASS}`

  const pathnameWithoutTrailingSlash = req.nextUrl.pathname.replace(/\/$/, '')

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/redirection/v1/redirect/?filterBy%5Burl-match%5D=plain&filterBy%5Burl%5D=${pathnameWithoutTrailingSlash}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(basicAuth).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }
  )

	const data = await response.json()

  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
	
})

export const config = { matcher: ['/((?!api|_next|.*\\..*|login).*)'] }

// const protectedPaths = [
//   '/',
//   '/about',
//   '/contact',
//   '/work',
//   '/work/:path',
//   '/journal',
//   '/journal/:path',
//   '/pricing',
//   '/email-signature',
// ]

// export async function middleware(request: NextRequest) {
//   if (!process.env.WP_USER || !process.env.WP_APP_PASS) {
//     return NextResponse.next()
//   }

//   const basicAuth = `${process.env.WP_USER}:${process.env.WP_APP_PASS}`

//   const pathnameWithoutTrailingSlash = request.nextUrl.pathname.replace(
//     /\/$/,
//     ''
//   )

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/redirection/v1/redirect/?filterBy%5Burl-match%5D=plain&filterBy%5Burl%5D=${pathnameWithoutTrailingSlash}`,
//     {
//       headers: {
//         Authorization: `Basic ${Buffer.from(basicAuth).toString('base64')}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )

//   const data = await response.json()

//   if (data?.items?.length > 0) {
//     const redirect = data.items.find(
//       (item: any) => item.url === pathnameWithoutTrailingSlash
//     )

//     if (!redirect) {
//       return NextResponse.next()
//     }

//     const newUrl = new URL(
//       redirect.action_data.url,
//       process.env.NEXT_PUBLIC_BASE_URL
//     ).toString()

//     return NextResponse.redirect(newUrl, {
//       status: redirect.action_code === 301 ? 308 : 307,
//     })
//   }
// }
