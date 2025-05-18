import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export const runtime = 'edge'
export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin/home')
  } else {
    redirect('/login')
  }
  return null
}
