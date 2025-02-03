import { UserContext } from "@/contexts/UserContext"
import { userService } from "@/services/userService"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { CustomInputComponent } from "../CustomInput"

export function LoginComponent() {

    const { user, setUser } = useContext(UserContext)
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user: any = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        try {
            e.currentTarget.reset()
            setUser!(await userService.login(user.email, user.password))
            router.push("/home")
        }
        catch (err) {
            return alert("User not found")
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full bg-white dark:bg-black">
            <form className="shadow-2xl shadow-slate-600 p-10 rounded-md gap-4 flex flex-col items-center" action="post" onSubmit={handleLogin}>
                <span className="text-black dark:text-white text-xl font-bold">login_</span>
                <CustomInputComponent name="email" id="email" placeholder="E-mail" type="email"/>
                <CustomInputComponent name="password" id="password" placeholder="Password" type="password"/>
                <button className="bg-blue-700 w-20 h-8 rounded-md text-white outline-none" type="submit">login</button>
            </form>
        </div>
    )
}