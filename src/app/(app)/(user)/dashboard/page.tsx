"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { Link } from "lucide-react";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdArticle } from "react-icons/md";


const stats = [
    { label: "Articles Created", value: 12, icon: "📝" },
    { label: "Drafts", value: 3, icon: "🗂️" },
    { label: "Followers", value: 120, icon: "👥" },
    { label: "Comments", value: 45, icon: "💬" },
];
const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FaHome },
    { name: "Profile", href: "/dashboard/profile", icon: BsFillPersonFill },
    { name: "My Articles", href: "/dashboard/articles", icon: MdArticle },
    { name: "Create Article", href: "/dashboard/create", icon: IoIosCreate },
];
export default function DashboardPage() {
    const [dark, setDark] = useState(false);

    return (
            // <div className={dark ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white" : "bg-gray-100 text-gray-900"}>
            //     {/* Header */}
            //     <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-800">
            //         <h1 className="text-2xl font-bold">Dashboard</h1>
            //         <button
            //             onClick={() => setDark((d) => !d)}
            //             className="rounded px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            //         >
            //             {dark ? "Light Mode" : "Dark Mode"}
            //         </button>
            //     </header>
            //     <div className="flex min-h-screen">
            //         {/* Sidebar */}
            //         <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
            //             <nav className="flex flex-col gap-2 p-6">
            //                 {navItems.map((item) => (
            //                     <Link
            //                         key={item.name}
            //                         href={item.href}
            //                         className="rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            //                     >
            //                         {item.name}
            //                     </Link>
            //                 ))}
            //             </nav>
            //         </aside>
            //         {/* Main Content */}
            //         <main className="flex-1 p-6">
            //             {/* Stats Cards */}
            //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            //                 {stats.map((stat) => (
            //                     <div
            //                         key={stat.label}
            //                         className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center"
            //                     >
            //                         <span className="text-3xl mb-2">{stat.icon}</span>
            //                         <span className="text-2xl font-bold">{stat.value}</span>
            //                         <span className="text-gray-500 dark:text-gray-400">{stat.label}</span>
            //                     </div>
            //                 ))}
            //             </div>
            //             {/* Extra Dashboard Content */}
            //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            //                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            //                     <h2 className="text-xl font-semibold mb-2">Quick Create</h2>
            //                     <p className="mb-4 text-gray-600 dark:text-gray-400">
            //                         Start a new article or draft quickly.
            //                     </p>
            //                     <Link
            //                         href="/dashboard/create"
            //                         className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            //                     >
            //                         Create Article
            //                     </Link>
            //                 </div>
            //                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            //                     <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            //                     <ul className="text-gray-600 dark:text-gray-400">
            //                         <li>📝 Published &#34;How to use Next.js&#34; 2 days ago</li>
            //                         <li>💬 3 new comments on your articles</li>
            //                         <li>🗂️ Saved a draft &#34;React Patterns&#34;</li>
            //                     </ul>
            //                 </div>
            //             </div>
            //         </main>
            //     </div>
            //     {/* Mobile Sidebar */}
            //     <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow md:hidden flex justify-around py-2 z-50">
            //         {navItems.map((item) => (
            //             <Link
            //                 key={item.name}
            //                 href={item.href}
            //                 className="flex flex-col items-center text-xs"
            //             >
            //                 {item.name}
            //             </Link>
            //         ))}
            //     </nav>
            // </div>

        
        <div className="flex h-screen dark:bg-gray-900" style={{
            background: "url('/images/body-background.png') 0% 0% / cover"
        }}>
            <div>
                <Sidebar />
            </div>
            <div className="ml-6 mt-6 w-full mr-6">
                <Breadcrumb />
                <hr className="my-2 border-gray-300 dark:border-gray-700" />
            </div>
        </div>
    );
}