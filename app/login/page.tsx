import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">登录到您的账户</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" name="email" type="email" required placeholder="请输入邮箱" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input id="password" name="password" type="password" required placeholder="请输入密码" />
            </div>
            <div className="flex gap-4 pt-2">
              <Button className="w-full" formAction={login} type="submit">登录</Button>
              <Button className="w-full" variant="outline" formAction={signup} type="submit">注册</Button>
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