import AvatarLogout from './AvatarLogout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col relative">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Room Admin</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="/admin/home" className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700">
                <span className="material-icons mr-3">dashboard</span>
                仪表盘
              </a>
            </li>
            <li>
              <a href="/admin/users" className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700">
                <span className="material-icons mr-3">people</span>
                用户管理
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700">
                <span className="material-icons mr-3">settings</span>
                系统设置
              </a>
            </li>
          </ul>
        </nav>
        {/* 左下角头像+退出 */}
        <div className="mt-auto p-4">
          <AvatarLogout />
        </div>
      </aside>
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">后台管理系统</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">管理员</span>
            {/* 头像和退出按钮可根据需要引入 */}
          </div>
        </header>
        {/* 内容区 */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
} 