import React from 'react'
import Link from "next/link";
import Image from 'next/image';

import { BsFillPersonFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { MdArticle } from "react-icons/md";
import { FaHome } from "react-icons/fa";
;
import { usePathname } from 'next/navigation';
const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FaHome },
    { name: "Profile", href: "/dashboard/profile", icon: BsFillPersonFill },
    { name: "My Articles", href: "/dashboard/articles", icon: MdArticle },
    { name: "Create Article", href: "/dashboard/create", icon: IoIosCreate },
];

function Sidebar() {

    const pathName = usePathname()

    return (
        <aside className="left-0 top-15 pt-3 w-72 h-full bg-white/70 dark:bg-gray-800/70 shadow-md hidden md:block backdrop-blur-md">
            <nav className="sticky left-0 top-15 flex flex-col gap-2 p-6">
                <Image src={"/images/logo.png"} alt={"Website Logo"} width={75} height={75} className='rounded m-auto' />
                <hr className="my-6 border-t-2 border-gray-300 dark:border-gray-600 rounded-full shadow-sm" />
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex gap-2 rounded px-4 py-2 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition ${pathName === item.href
                                ? "bg-gray-200 dark:bg-gray-700 font-bold"
                                : ""
                            }`}
                    >
                        <span className='block bg-gray-700/70 rounded-xl w-8 h-8 pt-1.5 justify-center'>
                            {item.icon && <item.icon className="block w-5 h-5 m-auto" />}
                        </span>
                        <p className='font-semibold self-center'>{item.name}</p>
                    </Link>
                ))}
            </nav>

            {/* Mobile Sidebar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow md:hidden flex justify-around py-2 z-50">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col items-center text-xs"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar