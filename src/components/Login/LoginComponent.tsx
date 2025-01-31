import { UserLogin } from "@/models/UserLogin"
import { userService } from "@/services/userService"
import { motion } from "framer-motion"

export function LoginComponent() {

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user: UserLogin = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }
        return userService.login(user)
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <form className="gap-4 flex flex-col items-center" action="post" onSubmit={handleLogin}>
                <motion.span
                    className="text-md font-bold font-mono"
                    initial={{ backgroundPosition: "0% center" }}
                    animate={{ backgroundPosition: "100% center" }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                    style={{
                        backgroundImage: "linear-gradient(120deg, #FF1361 0%, #FF8C00 30%, #FFD700 50%, #8A2BE2 70%)",
                        backgroundSize: "350% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                    }}
                >
                    login_
                </motion.span>
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="email" id="email" placeholder="E-mail" />
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="password" id="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>

    )
}