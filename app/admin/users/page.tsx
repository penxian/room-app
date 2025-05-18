'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type User = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editEmail, setEditEmail] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users')
      const data = (await res.json()) as { error?: string; users: User[] }
      if (!res.ok) throw new Error(data.error || '获取用户失败')
      setUsers(data.users)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除该用户吗？')) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = (await res.json()) as { error?: string; message?: string }
      if (!res.ok) throw new Error(data.error || '删除失败')
      fetchUsers()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditId(user.id)
    setEditEmail(user.email)
  }

  const handleEditSave = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, email: editEmail }),
      })
      const data = (await res.json()) as { error?: string; user?: { id: string; email: string } }
      if (!res.ok) throw new Error(data.error || '修改失败')
      setEditId(null)
      fetchUsers()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">用户管理</h2>
          <Button onClick={fetchUsers} disabled={loading}>刷新</Button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">邮箱</th>
              <th className="border px-2 py-1">注册时间</th>
              <th className="border px-2 py-1">最后登录</th>
              <th className="border px-2 py-1">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="border px-2 py-1">{u.id}</td>
                <td className="border px-2 py-1">
                  {editId === u.id ? (
                    <input
                      className="border px-1"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="border px-2 py-1">{u.created_at}</td>
                <td className="border px-2 py-1">{u.last_sign_in_at || '-'}</td>
                <td className="border px-2 py-1">
                  {editId === u.id ? (
                    <>
                      <Button size="sm" onClick={handleEditSave} disabled={loading}>保存</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditId(null)} disabled={loading}>取消</Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" onClick={() => handleEdit(u)} disabled={loading}>编辑</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)} disabled={loading}>删除</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !loading && <div className="text-gray-500 mt-4">暂无用户</div>}
      </Card>
    </div>
  )
} 