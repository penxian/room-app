import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const supabase = createClient()
  // 查询用户表（Supabase 需开启服务端权限，或用 service_role key）
  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  // 只返回部分字段
  const users = data.users.map(u => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at,
  }))
  return NextResponse.json({ users })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json() as { id: string }
  const supabase = createClient()
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ message: '删除成功' })
}

export async function PUT(req: NextRequest) {
  const { id, email } = await req.json() as { id: string, email: string }
  const supabase = createClient()
  const { data, error } = await supabase.auth.admin.updateUserById(id, { email })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ user: { id: data.user?.id, email: data.user?.email } })
} 