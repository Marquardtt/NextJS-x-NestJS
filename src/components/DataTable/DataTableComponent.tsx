'use client'

import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { User } from "@/models/User";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { exportJsonToExcel } from "@/functions/jsonToXlsx";
import "primeicons/primeicons.css";

export const DataTableComponent = () => {
    const [data, setData] = useState<User[]>([]);
    const [openColumn, setOpenColumn] = useState<string | null>(null);
    const [option, setOption] = useState<string | null>(null);
    const [selected, setSelected] = useState<HTMLInputElement[]>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const response = await userService.getAll();
            setData(response);
        };
        fetchData();
    }, [data]);

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

    const exportToExcel = () => {
        const jsonData = data.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
        }));
        exportJsonToExcel(jsonData, "data.xlsx");
    }

    const deleteUsers = async () => {
        if (selected.length === 0) return
        const ids = selected.map((el) => data[parseInt(el.id)].id)
        ids.forEach(id => {
            return userService.deleteUser(id!)
        });
    }

    const selectRows = (e: any) => {
        if (e.currentTarget.id === "allRows") {
            if (e.currentTarget.checked) {
                const elements = data.map((_, index) => document.getElementById(index.toString()) as HTMLInputElement)
                elements.forEach(element => {
                    element.checked = true
                });
                setSelected(elements)

            } else {
                const elements = data.map((_, index) => document.getElementById(index.toString()) as HTMLInputElement)
                elements.forEach(element => {
                    element.checked = false
                });
                setSelected([])
            }
        }
        else if (e.currentTarget.checked) setSelected([...selected, e.currentTarget])
        else setSelected(selected.filter((el) => el.id !== e.currentTarget.id))
    }
    return (
        <div className="w-[95%] h-full pt-24 overflow-x-hidden rounded-sm">
            <div className={`overflow-auto ${data.length != 0 ? "" : "flex justify-center items-center"}`}>
                {data.length == 0 ? <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="border-4 rounded-full w-10 h-10 border-blue-600"
                    style={{
                        maskImage: "radial-gradient(circle at 75% 25%, transparent 10%, black 60%)"
                    }}
                ></motion.div> :
                    <>
                        <div className="w-full flex justify-end">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={4} className="text-right p-2">
                                            <div className="flex justify-end gap-4">

                                                {selected.length != 0 && <div
                                                    className="duration-300 bg-blue-600 hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                                                    onClick={() => {
                                                        const firstElement = document.getElementById("allRows") as HTMLInputElement
                                                        const elements = data.map((_, index) => document.getElementById(index.toString()) as HTMLInputElement)
                                                        elements.forEach(element => {
                                                            element.checked = false
                                                        });
                                                        firstElement.checked = false
                                                        setSelected([])
                                                    }}>
                                                    <span className="pi pi-times"></span>
                                                    <span className="">{selected.length} selecionados</span>
                                                </div>}

                                                <div
                                                    className="duration-300 bg-blue-600 hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                                                    onClick={() => alert("Nada por aqui...")}>
                                                    <span className="pi pi-plus"></span>
                                                    <span className="">Novo</span>
                                                </div>
                                                <div
                                                    className="duration-300 bg-blue-600 hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                                                    onClick={() => deleteUsers()}>
                                                    <span className="pi pi-trash"></span>
                                                    <span className="">Excluir</span>
                                                </div>
                                                <div
                                                    className="duration-300 bg-blue-600 hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                                                    onClick={() => router.push("/1")}>
                                                    <span className="pi pi-desktop"></span>
                                                    <span className="">Dashboard</span>
                                                </div>
                                                <div
                                                    className="duration-300 bg-blue-600 hover:bg-blue-500 dark:bg-slate-600 dark:hover:bg-slate-500 text-white p-2 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                                                    onClick={() => exportToExcel()}>
                                                    <span className="pi pi-file-excel"></span>
                                                    <span className="">Exportar para excel</span>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <table className="rounded-sm dark:text-white text-black w-full min-w-max ">
                            <thead>
                                <tr className="table-auto">
                                    {["", "id", "email", "name", "age"].map((col, index) => (
                                        <th key={col}
                                            className={`bg-blue-600 dark:bg-slate-600 text-white text-left p-2 ${index == 0 ? "rounded-tl-md" : index == 4 ? "rounded-tr-md" : ""
                                                }`}>
                                            <div className="relative flex justify-between items-center">
                                                <span>{index != 0 ? col.toUpperCase() : <input onChange={(e) => selectRows(e)} id="allRows" type="checkbox"></input>}</span>
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
                                                        <div className="text-black flex flex-col gap-2">
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
                            <tbody >
                                {data.map((user, index) => (
                                    <tr
                                        className={`hover:bg-slate-300 dark:hover:bg-slate-600 
                                            ${selected.includes(document.getElementById(index.toString()) as HTMLInputElement) ? "bg-slate-200 dark:bg-gray-500" : ""}`}
                                        key={user.id}>
                                        <td className="p-2"><input onChange={(e) => selectRows(e)} id={index.toString()} type="checkbox" /></td>
                                        <td className="p-2">{user.id}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>}
            </div>
        </div>
    );
}
