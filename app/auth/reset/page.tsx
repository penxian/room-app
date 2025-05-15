'use client'
import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    if (access_token && refresh_token) {
      const supabase = createClient()
      supabase.auth.setSession({
        access_token,
        refresh_token,
      })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      alert('重置失败: ' + error.message)
    } else {
      alert('密码重置成功，请重新登录')
      router.push('/login')
    }
  }

  return (
    <form className="w-full max-w-md bg-white rounded shadow p-8 space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-4">重置密码</h2>
      <div className="space-y-2">
        <Label htmlFor="password">新密码</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="请输入新密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? '重置中...' : '重置密码'}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}