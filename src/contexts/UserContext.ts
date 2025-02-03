"use client"

import { User } from "@/models/User";
import { createContext} from "react";

type UserProps = {
    user?: User;
    setUser?: (user:User) => void | null
}

export const UserContext = createContext<UserProps>({});