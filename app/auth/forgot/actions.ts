export const runtime = 'edge'

'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function sendResetEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_SITE_URL + '/auth/reset',
  })
  // 你可以根据需要自定义跳转或提示
  if (error) {
    // 这里可以跳转到错误页或返回错误信息
    redirect('/error')
  }
  // 发送成功后跳转到登录页或提示页
  redirect('/login')
} 