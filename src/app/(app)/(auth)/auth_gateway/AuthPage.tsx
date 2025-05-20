'use client';
import { Button } from '@/components/ui/button';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebookF, FaMicrosoft } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
    const searchParams = useSearchParams();
    const signInParam = searchParams.get('signIn');
    const signUpParam = searchParams.get('signUp');
    
    const [showSignIn, setShowSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(()=>{
        if(signInParam=='true' && signUpParam==null){
            setShowSignIn(true)
        }else if(signUpParam=='true' && signInParam==null){
            setShowSignIn(false)
        }
    },[signInParam,signUpParam])

    return (
        <div className="mt-2 min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center ">

                {/* Signup Hidden Image Overlay */}
                <div
                    className={`hidden absolute left-0 top-0 w-1/2 h-full md:flex items-center justify-center transition-all duration-700 ease-in-out z-20 ${showSignIn
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none scale-95'
                        }`}
                >
                    <div className='bg-[#e23e3e] w-full h-full rounded-l-2xl flex flex-col justify-center items-center gap-4'>
                        <h3 className='font-semibold text-4xl'>Welcome to signin</h3>
                        <p className='font-medium'>Don&#39;t have an account?</p>
                        <Button onClick={() => setShowSignIn(false)} variant={'destructive'} className='w-20 h-10 rounded-full'>Sign Up</Button>
                    </div>
                </div>

                {/* Signin Hidden Image Overlay */}
                <div
                    className={`hidden absolute right-0 top-0 w-1/2 h-full md:flex items-center justify-center transition-all duration-700 ease-in-out z-20  ${showSignIn
                        ? 'opacity-0 pointer-events-none scale-95'
                        : 'opacity-100 scale-100 pointer-events-auto'
                        }`}
                >
                    <div className='bg-[#e23e3e] w-full h-full rounded-r-2xl flex flex-col justify-center items-center gap-4'>
                        <h3 className='font-semibold text-4xl'>Welcome to signup</h3>
                        <p className='font-medium'>You have an account?</p>
                        <Button onClick={() => setShowSignIn(true)} variant={'destructive'} className='w-20 h-10 rounded-full'>Sign In</Button>
                    </div>
                </div>

                {/* Signup Container */}
                <div
                    className={`dark:bg-gray-900 absolute md:left-0 top-0 md:w-1/2 h-full light:bg-white/30 backdrop-blur-md rounded-2xl md:rounded-l-2xl md:rounded-r-none shadow-lg flex flex-col items-center justify-center px-8 transition-all duration-700 ease-in-out z-10  ${showSignIn
                        ? 'opacity-0 pointer-events-none scale-95'
                        : 'opacity-100 scale-100 pointer-events-auto'
                        } border-2 md:border-r-0 border-[#e23e3e]`}
                    style={{
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-400">Sign Up</h2>
                    
                    <Link className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-lg mb-4 font-semibold hover:bg-blue-700 transition" href={"/signup"}>
                        <MdEmail className='w-5 h-5' />
                        <span>Continue with Email</span>
                    </Link>
                    

                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-3 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg mb-4 font-semibold hover:bg-red-600 transition">
                        <FaGoogle />
                        <span>Continue with Google</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-blue-800 text-white py-3 rounded-lg mb-4 font-semibold hover:bg-blue-900 transition">
                        <FaFacebookF />
                        <span>Continue with Facebook</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-green-700 text-white py-3 rounded-lg mb-4 font-semibold hover:bg-green-800 transition">
                        <FaMicrosoft />
                        <span>Continue with Microsoft</span>
                    </button>
                    <p className="md:hidden mt-8 dark:text-gray-200">
                        Already have an account?{' '}
                        <button
                            className="text-gray-900 dark:text-gray-100 font-semibold hover:underline"
                            onClick={() => setShowSignIn(true)}
                        >
                            Sign In
                        </button>
                    </p>
                    <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 max-w-xs">
                        By signing up, you agree to our{" "}
                        <a href="/terms" className="underline hover:text-[#e23e3e] transition-colors" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="underline hover:text-[#e23e3e] transition-colors" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>
                        . Please make sure you read and understand them before creating an account.
                    </div>
                </div>

                {/* Signin Container */}
                <div
                    className={`dark:bg-gray-900 absolute md:right-0 top-0 md:w-1/2 h-full light:bg-white/30 backdrop-blur-md rounded-2xl md:rounded-r-2xl md:rounded-l-none shadow-lg flex flex-col items-center justify-center px-8 transition-all duration-700 ease-in-out z-10 border-2 md:border-l-0 border-[#e23e3e] ${showSignIn
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none scale-95'
                        }`}
                    style={{
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-gray-400">Sign In</h2>
                    <form className="w-full flex flex-col gap-4 mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline focus:ring-2 focus:ring-gray-900 light:bg-white/60 backdrop-blur-sm dark:text-gray-300"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline focus:ring-2 focus:ring-gray-900 light:bg-white/60 backdrop-blur-sm dark:text-gray-300 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <IoEye />
                                ) : (
                                    <IoEyeOff />
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-3 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
                            <FaGoogle />
                            <span>Sign in with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
                            <FaFacebookF />
                            <span>Sign in with Facebook</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
                            <FaMicrosoft />
                            <span>Sign in with Microsoft</span>
                        </button>
                    </div>
                    <p className="md:hidden mt-8 dark:text-gray-200">
                        Don&#39;t have an account?{' '}
                        <button
                            className="dark:text-gray-50 text-gray-900 font-semibold hover:underline"
                            onClick={() => setShowSignIn(false)}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
