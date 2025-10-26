import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db } from '@/lib/db'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    try {
      // Get admin token from cookie
      const token = request.cookies.get('admin-token')?.value

      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // Verify token in database
      const session = await db.session.findUnique({
        where: { token },
        include: { user: true }
      })

      if (!session || session.expiresAt < new Date() || session.user.role !== 'ADMIN') {
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.delete('admin-token')
        return response
      }

      // Token is valid, proceed
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}