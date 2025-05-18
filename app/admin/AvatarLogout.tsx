'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AvatarLogout() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    const res = await fetch("/api/signout", { method: "POST" });
    if (res.ok) {
      router.push("/login");
    } else {
      alert("退出失败");
    }
  };

  return (
    <div
      className="relative group flex flex-col items-center"
      onMouseEnter={() => setShowLogout(true)}
      onMouseLeave={() => setShowLogout(false)}
    >
      <Image
        src="/vercel.svg"
        alt="avatar"
        width={48}
        height={48}
        className="rounded-full bg-gray-200 cursor-pointer"
      />
      {showLogout && (
        <button
          onClick={handleSignout}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-red-500 text-white text-sm shadow"
        >
          退出登录
        </button>
      )}
    </div>
  );
} 