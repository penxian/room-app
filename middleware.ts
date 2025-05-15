import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export interface Env{
  API_HOST: string
}

export async function middleware(request: NextRequest) {
  // 公开路由白名单
  const publicPaths = ['/login', '/auth/forgot', '/auth/reset', '/auth/confirm']
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 其余路由做鉴权
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|notes|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}