import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-16 w-full border-t border-gray-200 dark:border-gray-700 py-8 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-4">
                {/* Left: Brand/Year */}
                <div className="flex items-center gap-2 order-1 md:order-1 w-full md:w-auto justify-center md:justify-start">
                    <span className="text-indigo-700 font-bold text-lg">Read</span>
                    <span className="text-gray-400 text-xs hidden sm:inline">|</span>
                    <span className="text-gray-500 text-sm text-center md:text-left block sm:inline">&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
                {/* Center: Social Links */}
                <div className="flex gap-4 items-center order-3 md:order-2 w-full md:w-auto justify-center">
                    <Link
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-indigo-700 text-sm transition flex items-center"
                        aria-label="GitHub"
                    >
                        <svg width="18" height="18" fill="currentColor" className="mr-1" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        <span className="hidden xs:inline">GitHub</span>
                    </Link>
                    <Link
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-indigo-700 text-sm transition flex items-center"
                        aria-label="Twitter"
                    >
                        <svg width="18" height="18" fill="currentColor" className="mr-1" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
                        <span className="hidden xs:inline">Twitter</span>
                    </Link>
                    <Link
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-indigo-700 text-sm transition flex items-center"
                        aria-label="LinkedIn"
                    >
                        <svg width="18" height="18" fill="currentColor" className="mr-1" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
                        <span className="hidden xs:inline">LinkedIn</span>
                    </Link>
                </div>
                {/* Right: Privacy/Terms */}
                <div className="flex gap-4 items-center order-2 md:order-3 w-full md:w-auto justify-center md:justify-end">
                    <Link href="/privacy" className="text-gray-500 hover:text-indigo-700 text-sm transition whitespace-nowrap">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-500 hover:text-indigo-700 text-sm transition whitespace-nowrap">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer