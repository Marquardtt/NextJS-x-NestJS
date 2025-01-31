import { User } from "@/models/User";
import { userService } from "@/services/userService";

export function RegisterComponent() {

    const postUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user: User = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            age: Number(formData.get('age'))
        }
        event.currentTarget.reset();
        await userService.createUser(user);
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <form className="gap-4 flex flex-col items-center" action="post" onSubmit={postUser}>
                <span className=" font-mono text-lg">_register</span>
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="text" name="name" id="name" placeholder="Name" required />
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="email" name="email" id="email" placeholder="Email" required />
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="password" name="password" id="password" placeholder="Password" required />
                <input className="p-1 dark:text-white bg-transparent w-50 border-[1px] outline-none rounded-sm" type="number" name="age" id="age" placeholder="Age" required />
                <button className="p-1 dark:text-white bg-green-400 w-28 rounded-sm" type="submit">Register</button>
            </form>
        </div>
    );
}