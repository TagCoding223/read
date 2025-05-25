import React from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-btn";
import { Button } from "@/components/ui/button"
import { useSession, signOut, getSession } from "next-auth/react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar: React.FC = () => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/articles", label: "Articles" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]
    const siteName = process.env.SITE_NAME
    const { data: session } = useSession();
    
    return (
        <nav className="w-full dark:[bg-blue-900 backdrop-blur] shadow-md backdrop-blur sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Site Name */}
                    <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
                        {siteName}
                    </div>
                    {/* Center Nav Links */}
                    <div className="hidden md:flex space-x-8 mx-auto">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.label}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                    {/* Search Box */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="hidden md:block px-3 py-1 border-2 border-gray-300 dark:border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Auth Buttons / Avatar */}
                        {/* Replace this with your actual auth logic */}                      

                        {/* {session ? (
                            // If logged in, show avatar and sign out
                            <div className="flex items-center space-x-2">
                                <Link href="/profile" className="flex items-center">
                                    <span className="inline-block w-8 h-8 rounded-full bg-gray-300 dark:bg-blue-800 overflow-hidden">
                                        {session.user?.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg className="w-full h-full text-gray-500 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                                            </svg>
                                        )}
                                    </span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="hidden md:inline-block px-4 py-1.5 rounded-md font-medium text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            // If not logged in, show Sign In and Sign Up
                            <>
                                <Link
                                    href="/auth_gateway?signIn=true"
                                    className="hidden md:inline-block px-4 py-1.5 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth_gateway?signUp=true"
                                    className="hidden md:inline-block px-4 py-1.5 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )} */}

                        <ModeToggle />

                        {/* Mobile Nav */}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="md:hidden" variant="outline" size="icon" aria-label="Open menu">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="w-6 h-6"
                                    >
                                        <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
                                        <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                                        <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                    <SheetDescription>
                                        Navigate To The Site!
                                    </SheetDescription>
                                </SheetHeader>
                            
                                <div className="md:hidden flex flex-col items-center mt-2 space-y-2">
                                    {links.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="group relative text-gray-700 dark:text-gray-400 hover:text-blue-600 font-medium transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                                <SheetFooter>
                                    <div className="flex flex-col items-center w-full space-y-2">

                                        <SheetClose asChild key={"/auth_gateway?signIn=true"}>
                                            <Link className="w-full text-center bg-blue-600 py-1.5 rounded font-medium text-sm" href="/auth_gateway?signIn=true">Sign In
                                            </Link>
                                        </SheetClose>
                                        
                                        <SheetClose asChild key={"/auth_gateway?signUp=true"}>
                                            <Link className="w-full text-center bg-blue-600 py-1.5 rounded font-medium text-sm" 
                                                href="/auth_gateway?signUp=true">Sign Up
                                            </Link>
                                        </SheetClose>
                                    
                                        <div className="text-xs text-gray-500 mt-4 text-center">
                                            By continuing, you agree to our&nbsp;
                                            <Link href="/terms" className="underline hover:text-blue-600">Terms of Service</Link>
                                            &nbsp;and&nbsp;
                                            <Link href="/privacy" className="underline hover:text-blue-600">Privacy Policy</Link>.
                                        </div>
                                        
                                    </div>

                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;