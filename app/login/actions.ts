'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signUpData, error } = await supabase.auth.signUp(data)
  console.log(signUpData, error)
  if (error) {
    redirect('/error')
  }

  // 注册成功后，插入 profile
  if (signUpData.user) {
    await supabase.from('profiles').insert({
      id: signUpData.user.id,
      username: data.email.split('@')[0], // 默认用邮箱前缀
    })
  }

  revalidatePath('/', 'layout')
  redirect('/')
}