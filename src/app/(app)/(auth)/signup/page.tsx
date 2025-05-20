'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    phoneNumber: '',
    address: '',
    bio: '',
    avatar: '',
};

export default function SignupPage() {
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [captcha, setCaptcha] = useState('');

    // Generate a random 5-character captcha
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(code);
    };

    // Generate captcha on mount
    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Signup successful!');
    };

    return (
        <main className="min-h-screen flex items-center justify-center "
            style={{
                backgroundImage: "url('/images/ant-rozetsky-HXOllTSwrpM-unsplash.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='w-full flex justify-center' style={{
                backgroundColor: "rgb(6, 8, 12,0.6)",
                backgroundPositionX: "50%",
                backgroundPositionY: "50%",
                WebkitTapHighlightColor: "transparent"
            }}>
                <div className="w-full mx-2 md:max-w-2/4 p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 my-4">
                    <Image className='m-auto rounded' src={'/images/logo.png'} alt='logo' width={150} height={150} />
                    <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                        Create your account
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                placeholder="John Doe"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                placeholder="johndoe@email.com"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="gender">
                                Gender
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                                    id="gender"
                                    name="gender"
                                    value={form.gender || ''}
                                    onChange={handleChange}
                                    required
                                    onFocus={e => {
                                        const arrow = e.currentTarget.parentElement?.querySelector('.select-arrow');
                                        if (arrow) arrow.classList.add('rotate-180');
                                    }}
                                    onBlur={e => {
                                        const arrow = e.currentTarget.parentElement?.querySelector('.select-arrow');
                                        if (arrow) arrow.classList.remove('rotate-180');
                                    }}
                                >
                                    <option value="" disabled>
                                        Select gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span className="select-arrow pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowPassword((v) => !v)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <IoEye className='w-6 h-6 mt-0.5' /> : <IoEyeOff className='w-6 h-6 mt-0.5' />}
                                </button>
                            </div>
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type={showConfirm ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Re-enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    tabIndex={-1}
                                >
                                    {showConfirm ? <IoEye className='w-6 h-6 mt-0.5' /> : <IoEyeOff className='w-6 h-6 mt-0.5' />}
                                </button>
                            </div>
                        </div>
                        {/* Date of Birth */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="dob">
                                Date of Birth
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="date"
                                id="dob"
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                required
                                placeholder="YYYY-MM-DD"
                            />
                        </div>
                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                                placeholder="+1 234 567 8901"
                            />
                        </div>
                        {/* Optional Fields */}
                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="address">
                                Address <span className="text-xs text-gray-400">(optional)</span>
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                autoComplete="street-address"
                                placeholder="123 Main St, City"
                            />
                        </div>
                        {/* Bio */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="bio">
                                Bio <span className="text-xs text-gray-400">(optional)</span>
                            </label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="bio"
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Tell us about yourself"
                            />
                        </div>
                        {/* Avater */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="avatar">
                                Avatar <span className="text-xs text-gray-400">(optional, JPG/PNG, max 2MB)</span>
                            </label>
                            <input
                                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/png, image/jpeg"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 2 * 1024 * 1024) {
                                            alert('File size should be less than 2MB');
                                            return;
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setForm(f => ({ ...f, avatar: reader.result as string }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <p className="text-xs text-gray-400 mt-1">Upload a clear profile picture.</p>
                        </div>
                        {/* Avatar Preview */}
                        {form.avatar && (
                            <div className="flex justify-center mt-2">
                                <Image
                                    src={form.avatar}
                                    alt="Avatar Preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                                />
                            </div>
                        )}

                        {/* Captcha */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="captcha">
                                Captcha <span className="text-xs text-gray-400">(required)</span>
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    className="w-24 px-2 py-2 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-mono font-bold"
                                    type="text"
                                    id="captcha"
                                    name="captcha"
                                    value={captcha}
                                    readOnly
                                    tabIndex={-1}
                                    aria-label="Captcha code"
                                />
                                <div className='relative w-full'>
                                    <input
                                        className="w-full px-4 py-2 h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        id="captchaInput"
                                        name="captchaInput"
                                        value={form.captchaInput || ''}
                                        onChange={e => setForm({ ...form, captchaInput: e.target.value })}
                                        required
                                        autoComplete="off"
                                        placeholder="Enter captcha"
                                    />
                                    <button
                                        type="button"
                                        className="group absolute right-0 top-0 ml-2 px-2 py-1 h-10 flex items-center rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs"
                                        onClick={e => {
                                            generateCaptcha();
                                            // Only rotate the SVG icon
                                            const icon = e.currentTarget.querySelector('svg');
                                            if (icon) {
                                                icon.classList.add('animate-spin-rotate');
                                                setTimeout(() => icon.classList.remove('animate-spin-rotate'), 500);
                                            }
                                        }}
                                        aria-label="Refresh captcha"
                                    >
                                        <MdOutlineRefresh className="w-6 h-6" />
                                    </button>
                                    <style jsx global>{`
                                        .animate-spin-rotate {
                                            animation: spin-rotate 0.5s linear;
                                        }
                                        @keyframes spin-rotate {
                                            100% {
                                                transform: rotate(360deg);
                                            }
                                        }
                                    `}</style>
                                </div>
                            </div>

                        </div>
                        <p className="text-xs text-gray-400 mt-1">Enter the code shown above.</p>

                        {/* Terms and Conditions */}
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                required
                                className="mr-2"
                            />
                            <label htmlFor="terms" className="text-gray-700 dark:text-gray-200 text-sm">
                                I agree to the <a href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">Terms and Conditions</a>
                            </label>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-md mt-4"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link href={"/auth_gateway?signIn=true"} className="text-blue-600 hover:underline dark:text-blue-400">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

        </main >
    );
}