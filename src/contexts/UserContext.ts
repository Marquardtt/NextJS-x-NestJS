"use client"

import { User } from "@/models/User";
import { createContext} from "react";

type UserProps = {
    user?: User | null;
    setUser?: (user:User | null) => void | null
}

export const UserContext = createContext<UserProps>({});