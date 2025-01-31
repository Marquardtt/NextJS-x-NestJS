import { User } from "@/models/User"
import { api } from "./api"
import { UserLogin } from "@/models/UserLogin"

export const userService = {

    async getUser(id: number): Promise<User> {
        const response = await api.get(`/user/find/${id}`)
        return response.data
    },

    async createUser(user: User): Promise<User> {
        const response = await api.post<User>('/user/create', user)
        return response.data
    },

    async login(user: UserLogin): Promise<UserLogin> {
        const response = await api.post<UserLogin>('/user/login', user)
        return response.data
    }
}