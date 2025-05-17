'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/')
    } else {
      const data: any = await res.json()
      setError(data.error || '登录失败')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">登录到您的账户</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" name="email" type="email" required placeholder="请输入邮箱"
                value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input id="password" name="password" type="password" required placeholder="请输入密码"
                value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <div className="flex gap-4 pt-2">
              <Button className="w-full" type="submit" disabled={loading}>{loading ? '登录中...' : '登录'}</Button>
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => router.push('/signup')}
                disabled={loading}
              >
                注册
              </Button>
            </div>
            <div className="pt-2 text-center">
              <a href="/auth/forgot" className="text-blue-600 hover:underline text-sm">忘记密码？</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}