"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
    const [timer, setTimer] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && resendDisabled) {
            setResendDisabled(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer, resendDisabled]);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100/60 via-white/60 to-blue-300/60 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 backdrop-blur-md z-0">
            <div className="relative z-10">
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12 px-2">
                    <div className="relative bg-white dark:bg-gray-900 border-4 backdrop-blur px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p className='dark:text-gray-400'>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>We have sent a code to your email ba**@dipainhouse.com</p>
                                </div>
                            </div>

                            <div>
                                <form action="" method="post">
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            {[0, 1, 2, 3].map((idx) => (
                                                <div className="w-16 h-16" key={idx}>
                                                    <input
                                                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border-2 border-gray-200 text-lg bg-white dark:bg-gray-800 focus:bg-gray-50 focus:ring-1 ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

                                                        type="number"
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        pattern="[0-9]*"
                                                        autoComplete="one-time-code"
                                                        id={`code-${idx}`}
                                                        name={`code-${idx}`}
                                                        onChange={e => {
                                                            const input = e.target;
                                                            if (input.value.length === 1 && idx < 3) {
                                                                const next = document.getElementById(`code-${idx + 1}`) as HTMLInputElement | null;
                                                                next?.focus();
                                                            }
                                                        }}
                                                        onKeyDown={e => {
                                                            if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
                                                                const prev = document.getElementById(`code-${idx - 1}`) as HTMLInputElement | null;
                                                                prev?.focus();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-lg font-semibold shadow-sm cursor-pointer">
                                                    Verify Account
                                                </button>
                                            </div>

                                            {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn&#39;t recieve code?</p> <button className="flex flex-row items-center text-blue-600" >Resend</button>
                                            </div> */}
                                            <div className="flex flex-col items-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn&#39;t recieve code?</p>
                                                <button
                                                    type="button"
                                                    className="text-blue-600 disabled:opacity-50 cursor-pointer"
                                                    onClick={() => {
                                                        setTimer(120);
                                                        setResendDisabled(true);
                                                    }}
                                                    disabled={resendDisabled}
                                                >
                                                    Resend Code
                                                </button>
                                                {timer > 0 && (
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        You can resend code in {Math.floor(timer / 60)
                                                        .toString()
                                                        .padStart(2, '0')}
                                                        :{(timer % 60).toString().padStart(2, '0')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page