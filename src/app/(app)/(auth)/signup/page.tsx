"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { useForm } from 'react-hook-form'
import { UserModel } from '@/schema/UserModel';
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import { LoaderPinwheelIcon } from 'lucide-react';

function Page() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [captcha, setCaptcha] = useState('');
    const [acceptTC, setAcceptTC] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

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

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(UserModel),
    });

    const onSubmit = async (data: User) => {
        setIsSubmit(true)

        if (data.password !== data.confirmPassword) {
            toast.warning("Password not match", { description: "Password not Confirm Password are not same." })
        } else if (data.captcha !== captcha) {
            toast.warning("Invaild Captcha", { description: "Please enter vaild captcha code." })
        } else {

            // check user exist or not
            const formData = new FormData();
            formData.append("email", data.email)
            const isUserExist = await fetch("/api/getUserByEmail", {
                method: "POST",
                body: formData
            })

            const response = await isUserExist.json()
            if (response.user === null) {

                let avatarUrl = ''
                let avatarPublicId = ''

                // Upload Avatar
                if (data.avatarMedia) {
                    const formData = new FormData();
                    if (data.avatarMedia) {
                        formData.append("avatar", data.avatarMedia);
                    }

                    const uploadAvatarResponse = await fetch("/api/avatar/upload", {
                        method: "POST",
                        body: formData,
                    })

                    const uploadResult = await uploadAvatarResponse;
                    if (uploadResult.status === 200) {
                        const extract = await uploadResult.json()
                        const { url, public_id } = await extract.body
                        avatarUrl = url
                        avatarPublicId = public_id
                    }
                }

                // console.log("first: ",avatarUrl," ",avatarPublicId)

                // create user
                const formData = new FormData();
                if (data) {
                    formData.append("name", data.name)
                    formData.append("address", data.address ?? "")
                    formData.append("bio", data.bio)
                    formData.append("dob", typeof data.dob === "string" ? data.dob : new Date(data.dob).toISOString())
                    formData.append("email", data.email)
                    formData.append("gender", data.gender)
                    formData.append("password", data.password)
                    formData.append("phoneNumber", data.phoneNumber)
                    formData.append("avatarUrl", avatarUrl)
                    formData.append("avatarPublicId", avatarPublicId)
                }

                // console.log("statuts:", avatarUrl, avatarPublicId)
                // console.log(formData.get("avatarUrl"), " ", formData.get("avatarPublicId"))

                const response = await fetch("/api/add_user", {
                    method: "POST",
                    body: formData
                })

                const result = await response.json()
                console.log(result)
                if (result.userRes && result.userRes !== null) {
                    // const id = "8KfA1XbsIwXmoq36SgawDSWv";
                    const id = result.res.id;

                    const idBytes = new TextEncoder().encode();
                    console.log("id as bytes:", idBytes);

                    const encodedId = Buffer.from(String(id)).toString('base64');

                    // const encodedParams = new URLSearchParams();
                    // encodedParams.append("id", encodeId);
                    router.push(`/verify-account?tempId=${encodedId}`);

                } else {
                    toast.warning("Something is wrong!", { description: "Please Try Again" })
                }

            } else {
                toast.warning("Please sign in", { description: "User aleardy exist with this email." })
            }

            setIsSubmit(false)
        }

        // await new Promise(() => {
        //     setTimeout(() => {
        //         alert("hello")

        //         // testing
        //         const id = "8KfA1XbsIwXmoq36SgawDSWv";

        //         const idBytes = new TextEncoder().encode(id);
        //         console.log("id as bytes:", idBytes);

        //         // const encodeId = bcrypt.encodeBase64(idBytes, idBytes.length);
        //         const encodedId = Buffer.from(String(id)).toString('base64');

        //         console.log("encodeId: ", encodedId);

        //         // const encodedParams = new URLSearchParams();
        //         // encodedParams.append("id", encodeId);
        //         router.push(`/verify-code?tempId=${encodedId}`);


        //         setIsSubmit(false)
        //     }, 5000)
        // })

        setIsSubmit(false)

        // console.log(data);
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

                {/* loader */}
                <div className={`fixed opacity-80 z-50 w-full h-full bg-gray-800 ${!isSubmit ? "hidden" : "block"}`}>
                    <div className='flex flex-col w-full h-full justify-center items-center'>
                        <div className='w-32 h-32 flex justify-center items-center'>
                            <LoaderPinwheelIcon className='w-28 h-28 animate-spin' />
                        </div>
                        <p>
                            Please wait
                            <span className="inline-block w-6">
                                <span className="dot-anim">.</span>
                                <span className="dot-anim dot-anim2">.</span>
                                <span className="dot-anim dot-anim3">.</span>
                            </span>
                            <style jsx>{`
                                .dot-anim {
                                    opacity: 0;
                                    animation: blink 1.4s infinite both;
                                }
                                .dot-anim2 {
                                    animation-delay: 0.2s;
                                }
                                .dot-anim3 {
                                    animation-delay: 0.4s;
                                }
                                @keyframes blink {
                                    0%, 80%, 100% { opacity: 0; }
                                    40% { opacity: 1; }
                                }
                            `}</style>
                        </p>
                    </div>
                </div>

                {/* form container */}
                <div className="w-full mx-2 md:max-w-2/4 p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 my-4">
                    <Image className='m-auto rounded' src={'/images/logo.png'} alt='logo' width={150} height={150} />
                    <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                        Create your account
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="name"
                                {...register("name")} // behavour like name attributey
                                autoComplete="name"
                                placeholder="John Doe"
                            />
                            {errors.name && <span className='text-sm font-semibold text-red-500'>{errors.name.message}</span>}
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
                                {...register("email")}
                                autoComplete="email"
                                placeholder="johndoe@email.com"
                            />
                            {errors.email && <span className='text-sm font-semibold text-red-500'>{errors.email.message}</span>}

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
                                    {...register("gender")}
                                    onFocus={e => {
                                        const arrow = e.currentTarget.parentElement?.querySelector('.select-arrow');
                                        if (arrow) arrow.classList.add('rotate-180');
                                    }}
                                    onBlur={e => {
                                        const arrow = e.currentTarget.parentElement?.querySelector('.select-arrow');
                                        if (arrow) arrow.classList.remove('rotate-180');
                                    }}
                                >
                                    <option value="Select gender">
                                        Select gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span className="select-arrow pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                            {errors.gender && <span className='text-sm font-semibold text-red-500'>{errors.gender.message}</span>}
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
                                    {...register("password")}
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
                            {errors.password && <span className='text-sm font-semibold text-red-500'>{errors.password.message}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    {...register("confirmPassword")}
                                    autoComplete="new-password"
                                    placeholder="Re-enter password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <IoEye className='w-6 h-6 mt-0.5' /> : <IoEyeOff className='w-6 h-6 mt-0.5' />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className='text-sm font-semibold text-red-500'>{errors.confirmPassword.message}</span>}
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
                                min={"1997-01-01"}
                                // max={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() - ((24 * 365) * 10) * 60 * 60 * 1000).toISOString().split('T')[0]} // at least user 10 year old
                                {...register("dob")}
                                placeholder="DD-MM-YYYY"
                            />
                            {errors.dob && <span className='text-sm font-semibold text-red-500'>{errors.dob.message}</span>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="tel"
                                maxLength={15}
                                id="phoneNumber"
                                {...register("phoneNumber")}
                                autoComplete="tel"
                                placeholder="+1 234 567 8901"
                            />
                            {errors.phoneNumber && <span className='text-sm font-semibold text-red-500'>{errors.phoneNumber.message}</span>}
                        </div>

                        {/* Optional Fields */}
                        {/* Address Fields */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="address">
                                Address <span className="text-xs text-gray-400">(optional)</span>
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="address"
                                {...register("address")}
                                autoComplete="street-address"
                                placeholder="123 Main St, City"
                            />
                            {errors.address && <span className='text-sm font-semibold text-red-500'>{errors.address.message}</span>}
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="bio">
                                Bio <span className="text-xs text-gray-400">(optional)</span>
                            </label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="bio"
                                {...register("bio")}
                                rows={2}
                                placeholder="Tell us about yourself"
                            />
                            {errors.bio && <span className='text-sm font-semibold text-red-500'>{errors.bio.message}</span>}
                        </div>

                        {/* Avater */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="avatar">
                                Avatar <span className="text-xs text-gray-400">(optional, JPG/PNG, max 1MB)</span>
                            </label>
                            {/* <input
                                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                type="file"
                                id="avatar"
                                accept='image/*'
                                {...register("avatarMedia")}
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {

                                        if (file.size > 1 * 1024 * 1024) {
                                            // alert('File size should be less than 2MB');
                                            toast.warning("File size should be less than 1MB")
                                            setAvatarPreview(null);
                                            return;
                                        }
                                        setAvatarPreview(URL.createObjectURL(file));
                                    } else {
                                        setAvatarPreview(null);
                                    }
                                }}
                            /> */}
                            <input
                                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                type="file"
                                id="avatar"
                                accept="image/*"
                                name='avatarMedia'
                                // {...register("avatarMedia")} //You should not spread {...register("avatarMedia")} and also use setValue for the same field.
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setAvatarPreview(URL.createObjectURL(file));
                                        // Update react-hook-form state so Zod can validate
                                        setValue("avatarMedia", file, { shouldValidate: true });
                                    } else {
                                        setAvatarPreview(null);
                                        setValue("avatarMedia", undefined, { shouldValidate: true });
                                    }
                                }}
                            />
                            <p className="text-xs text-gray-400 mt-1">Upload a clear profile picture.</p>
                            {typeof errors.avatarMedia?.message === "string" && <span className='text-sm font-semibold text-red-500'>{errors.avatarMedia.message}</span>}
                        </div>

                        {/* Avatar Preview */}
                        {avatarPreview && (
                            <div className="flex justify-center mt-2">
                                <Image
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    width={64}
                                    height={64}
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
                                    onCopy={e => e.preventDefault()}
                                />
                                <div className='relative w-full'>
                                    <input
                                        className="w-full px-4 py-2 h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        id="captchaInput"
                                        autoComplete="off"
                                        placeholder="Enter captcha"
                                        {...register("captcha")}
                                    // onChange={(e) => {
                                    //     // console.log(e.currentTarget.value)
                                    //     setCaptchaValid(e.currentTarget.value === captcha)
                                    // }}
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

                            <p className="text-xs text-gray-400 mt-1">Enter the code shown above.</p>
                            {errors.captcha && <span className='text-sm font-semibold text-red-500'>{errors.captcha.message}</span>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                className="mr-2"
                                onChange={() => setAcceptTC(!acceptTC)}
                            />
                            <label htmlFor="terms" className="text-gray-700 dark:text-gray-200 text-sm">
                                I agree to the <a href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">Terms and Conditions </a>
                            </label>
                            {(!acceptTC) ? <span className='text-sm font-semibold text-red-500'>(Accept to continue)</span> : ""}
                        </div>

                        {/* Submit Button */}
                        <button disabled={((isSubmit === true) || (acceptTC === false)) ? true : false}
                            type="submit"
                            className={`w-full py-3 rounded-lg bg-gray-500 hover:bg-blue-700 text-white font-semibold transition-colors shadow-md mt-4`}
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
    )
}

export default Page