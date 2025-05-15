import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Room Admin</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700">
                <span className="material-icons mr-3">dashboard</span>
                仪表盘
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700">
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <a href="#" className="flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="material-icons mr-3">logout</span>
            退出登录
          </a>
        </div>
      </aside>
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">后台管理系统</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">管理员</span>
            <Image src="/vercel.svg" alt="avatar" width={32} height={32} className="rounded-full bg-gray-200" />
            <form action="/auth/signout" method="post">
              <button type="submit" className="ml-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition">
                退出登录
              </button>
            </form>
          </div>
        </header>
        {/* 内容区 */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">欢迎来到后台管理系统</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">在这里你可以管理用户、查看数据、配置系统等。</p>
          {/* 示例仪表盘卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-gray-500 dark:text-gray-400">今日访问量</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">1,234</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-gray-500 dark:text-gray-400">注册用户</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">567</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="text-gray-500 dark:text-gray-400">系统消息</div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">3</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
