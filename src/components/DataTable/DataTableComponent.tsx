'use client'

import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { User } from "@/models/User";
import "primeicons/primeicons.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function DataTableComponent() {
    const [data, setData] = useState<User[]>([]);
    const [openColumn, setOpenColumn] = useState<string | null>(null);
    const [option, setOption] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const response = await userService.getAll();
            setData(response);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const closeMenu = () => setOpenColumn(null);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

    const toggleColumn = (column: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenColumn(prev => prev === column ? null : column);
    };

    const sortData = () => {
        if (["Ascendente", "Descrescente"].includes(option ?? "")) {
            const sortedData = [...data].sort((a: any, b: any) => {
                return option === "Ascendente"
                    ? a > b ? 1 : -1
                    : a < b ? 1 : -1;
            });
            setData(sortedData);
        }
    };

    return (
        <div className="w-[90%] overflow-x-hidden rounded-sm">
            <table className="border-separate border-spacing-0 rounded-sm dark:text-white text-black w-full">
                <thead className="">
                    <tr className="">
                        <th colSpan={4} className="text-right p-2">
                            <div className="flex justify-end gap-4">
                                <span className="cursor-pointer" onClick={() => router.push("/1")}>Dashboard</span>
                                <span className="cursor-pointer">Exportar para excel</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        {["id", "email", "name", "age"].map((col) => (
                            <th key={col} className="text-left p-2">
                                <div className="relative flex justify-between items-center">
                                    <span>{col.toUpperCase()}</span>
                                    <span
                                        onClick={(e) => toggleColumn(col, e)}
                                        className={`pi pi-angle-up cursor-pointer duration-300 ${openColumn === col ? "rotate-180" : ""}`}
                                    ></span>

                                    {openColumn === col && (
                                        <motion.div
                                            className="absolute -right-[0.5rem] top-8 bg-white w-40 h-fit shadow-lg rounded-md"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="z-10 text-black flex flex-col gap-2">
                                                {["Ascendente", "Descrescente", "Filtrar por"].map((opt) => (
                                                    <div
                                                        key={opt}
                                                        className="flex items-center px-3 py-2 hover:bg-slate-200 duration-300 cursor-pointer"
                                                        onClick={() => {
                                                            setOption(opt);
                                                            sortData();
                                                            setOpenColumn(null);
                                                        }}
                                                    >
                                                        {option === opt && <span className="pi pi-check p-2"></span>}
                                                        <span className="p-2">{opt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td className="border dark:border-white border-black p-2">{user.id}</td>
                            <td className="border dark:border-white border-black p-2">{user.email}</td>
                            <td className="border dark:border-white border-black p-2">{user.name}</td>
                            <td className="border dark:border-white border-black p-2">{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
