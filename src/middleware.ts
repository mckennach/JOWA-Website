import { NextResponse } from 'next/server'
import { auth as middleware } from './lib/api/auth'

export default middleware(async function middleware(req) {
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

  const data = await response.json();

	console.log(data);

  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})



export const config = { matcher: ['/((?!api|_next|.*\\..*|login).*)'] }