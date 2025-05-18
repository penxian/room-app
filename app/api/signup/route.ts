import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json() as { email: string, password: string }
  const supabase = createClient()
  const { data: signUpData, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  // 注册成功后，插入 profile
  if (signUpData.user) {
    await supabase.from('profiles').insert({
      id: signUpData.user.id,
      username: email.split('@')[0],
    })
  }
  return NextResponse.json({ success: true })
}