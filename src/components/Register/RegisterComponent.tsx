import { User } from "@/models/User";
import { userService } from "@/services/userService";
import { CustomInputComponent } from "../CustomInput";

export const RegisterComponent = () => {

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
        <div className="flex justify-center items-center w-full h-full bg-white dark:bg-black">
            <form className="shadow-2xl shadow-slate-600 p-10 gap-4 flex flex-col items-center rounded-md" action="post" onSubmit={postUser}>
                <span className="text-black dark:text-white text-xl font-bold">_register</span>
                <CustomInputComponent name="email" id="email" placeholder="E-mail" type="email" />
                <CustomInputComponent name="name" id="name" placeholder="Name" type="text" />
                <CustomInputComponent name="password" id="password" placeholder="Password" type="password" />
                <CustomInputComponent name="age" id="age" placeholder="Age" type="number" />
                <button className="p-1 text-white bg-blue-700 w-28 rounded-md outline-none" type="submit">Register</button>
            </form>
        </div>
    );
}