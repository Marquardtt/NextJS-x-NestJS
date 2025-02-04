import { User } from "@/models/User"
import { api } from "./api"

export const userService = {

    async getUser(id: number): Promise<User> {
        const response = await api.get(`/user/find/${id}`)
        return response.data
    },

    async getAll(): Promise<User[]> {
        const response = await api.get('/user/all')
        return response.data
    },

    async createUser(user: User): Promise<User> {
        const response = await api.post<User>('/user/create', user)
        return response.data
    },

    async deleteUser(id: number): Promise<User> {
        const response = await api.delete(`/user/delete/${id}`)
        return response.data
    },

    //sem segurança nenhuma mesmo, só pra fim de teste
    async login(email: string, password: string): Promise<User> {
        const response = await api.get(`/user/login/${email}/${password}`)
        return response.data
    }
}