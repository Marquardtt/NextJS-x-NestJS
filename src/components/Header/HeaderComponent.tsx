'use client'

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { userService } from "@/services/userService";
import SettingsIcon from '@mui/icons-material/Settings';
import 'primeicons/primeicons.css';

export const HeaderComponent = () => {

    const { user, setUser } = useContext(UserContext);
    const [theme, setTheme] = useState<string>('light');
    const [smallMenu, setSmallMenu] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userLogged = localStorage.getItem('user')
                setUser!(await userService.getUser(Number(userLogged)));
            } catch (err) {
                setUser!(null);
            }
        }
        fetchUser()
    }, []);

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        const closeMenu = () => setSmallMenu(false);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

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

    const logout = () => {
        localStorage.removeItem('user');
        setUser!(null);
        router.push('/login');
    }

    return (
        <div className="z-[999] fixed shadow-2xl shadow-slate-500 dark:bg-slate-600 bg-blue-600 w-full  text-sm h-14 ">
            <div className="flex items-center justify-end px-4 w-full h-full">
                <div className="flex gap-4 items-center relative ">
                    {user == null ?
                        <>
                            <span className="dark:text-white cursor-pointer duration-500" onClick={() => router.push("/register")}>_register</span>
                            <span className="dark:text-white cursor-pointer duration-500" onClick={() => router.push("/login")}>login_</span>
                        </> :
                        <>
                            <div className="flex gap-2 items-center">
                                <motion.span
                                    className={`pi pi-angle-up cursor-pointer absolute`}
                                    onClick={(e) => { e.stopPropagation(), setSmallMenu(!smallMenu) }}
                                    animate={{ rotate: smallMenu ? 180 : 0, left: smallMenu ? -100 : -10 }}
                                />
                                {
                                    smallMenu == false ? null : <span>{user.name}</span>
                                }
                            </div>
                            <motion.div
                                className="z-10 bg-blue-600 dark:bg-slate-600 w-44 h-40 absolute top-12 right-5 shadow-2xl shadow-slate-500 rounded-b-md flex flex-col items-center justify-end"
                                animate={{ opacity: smallMenu ? 1 : 10, y: smallMenu ? 0 : -10, display: smallMenu ? 'flex' : 'none', zIndex: smallMenu ? 100 : -1 }}
                                initial={{ opacity: 0, y: -10, display: 'none', zIndex: -1 }}

                            >
                                <div className="flex items-center h-10">
                                    <div className="text-white flex gap-2 items-center w-fit cursor-pointer" onClick={() => logout()}>
                                        <SettingsIcon />
                                        <span>Configurações</span>
                                    </div>
                                </div>
                                <div className="flex items-center h-10">
                                    <div className="flex gap-2 items-center w-fit cursor-pointer" onClick={() => logout()}>
                                        <span className="pi pi-sign-out text-red-600"></span>
                                        <span className="text-red-600">Logout</span>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="w-10 h-10 bg-white rounded-full"></div>
                        </>}
                    <span style={{ fontSize: '0.9rem' }} onClick={() => handleTheme()} className={`cursor-pointer w-3 h-3 ${theme == 'dark' ? "pi pi-moon" : "pi pi-sun"}`}></span>
                </div>
            </div>
        </div>
    )
}