'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHome() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    setLoading(true);
    const res = await fetch("/api/signout", { method: "POST" });
    setLoading(false);
    if (res.ok) {
      router.push("/login");
    } else {
      alert("退出失败");
    }
  };

  return (
    <>
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
    </>
  );
} 