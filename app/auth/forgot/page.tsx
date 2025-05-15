import { sendResetEmail } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="w-full max-w-md bg-white rounded shadow p-8 space-y-6" action={sendResetEmail}>
        <h2 className="text-2xl font-bold text-center mb-4">忘记密码</h2>
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" name="email" type="email" required placeholder="请输入注册邮箱" />
        </div>
        <Button className="w-full" type="submit">发送重置邮件</Button>
      </form>
    </div>
  )
} 