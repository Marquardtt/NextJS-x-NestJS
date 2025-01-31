'use client'

import { User } from "@/models/User";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
export function HeaderComponent() {

    const [theme, setTheme] = useState<string>('light');
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userService.getUser(1)
                setUser(data)
            } catch {
                setUser(null)
            }
        }
        fetchUserData()
    }, [])

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
        <div className="dark:bg-black bg-white w-full font-mono text-sm h-14 ">
            <div className="flex items-center justify-between px-4 w-full h-full">
                <span className="dark:text-white text-black">Logged user -- {user?.name || "Usuario nao encontrado"}</span>
                <div className="flex gap-4 items-center">
                    <span className="cursor-pointer hover:text-purple-500 duration-500" onClick={() => router.push("/login")}>_register</span>
                    <span className="cursor-pointer hover:text-purple-500 duration-500" onClick={() => router.push("/login")}>login_</span>
                    <span style={{ fontSize: 25 }} onClick={() => handleTheme()} className={`cursor-pointer w-3 h-3 ${theme == 'dark' ? "bg-white" : "bg-black"}`}></span>
                </div>
            </div>
        </div>
    )
}