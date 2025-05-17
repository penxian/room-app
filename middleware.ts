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
  // 只对 /api/user/*、/api/notes/*、/private/*、/account/* 做鉴权
  if (
    request.nextUrl.pathname.startsWith('/api/user') ||
    request.nextUrl.pathname.startsWith('/api/notes') ||
    request.nextUrl.pathname.startsWith('/private') ||
    request.nextUrl.pathname.startsWith('/account')
  ) {
    return await updateSession(request)
  }
  // 其它路由不做鉴权
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/user/:path*',
    '/api/notes/:path*',
    '/private/:path*',
    '/account/:path*',
  ],
}