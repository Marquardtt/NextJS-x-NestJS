'use client'

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import 'primeicons/primeicons.css';

export function HeaderComponent() {

    const { user, setUser } = useContext(UserContext);
    const [theme, setTheme] = useState<string>('light');
    const [smallMenu, setSmallMenu] = useState<boolean>(false);
    const router = useRouter()

    const handleTheme = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            setTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    }, []);

    return (
        <div className="fixed shadow-2xl shadow-slate-500 dark:bg-slate-600 bg-blue-600 w-full  text-sm h-14 ">
            <div className="flex items-center justify-end px-4 w-full h-full">
                <div className="flex gap-4 items-center ">
                    {user == null ?
                        <>
                            <span className="dark:text-white cursor-pointer duration-500" onClick={() => router.push("/register")}>_register</span>
                            <span className="dark:text-white cursor-pointer duration-500" onClick={() => router.push("/login")}>login_</span>
                        </> :
                        <>
                            <div className="flex gap-2 items-center">
                                <span className={`pi pi-angle-up cursor-pointer duration-300 ${!smallMenu ? "" : "rotate-180"}`} onClick={() => setSmallMenu(!smallMenu)}></span>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full"></div>
                        </>}
                    <span style={{ fontSize: '0.9rem' }} onClick={() => handleTheme()} className={`cursor-pointer w-3 h-3 ${theme == 'dark' ? "pi pi-moon" : "pi pi-sun"}`}></span>
                </div>
            </div>
        </div>
    )
}