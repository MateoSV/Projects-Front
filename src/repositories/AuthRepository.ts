import type { IAuthRepository } from '@/interfaces/IAuthRepository';
import type {IUser} from "@/interfaces/IUser";

export class AuthRepository implements IAuthRepository {
    private apiUrl =  import.meta.env.VITE_API_URL;

    async login(email: string, password: string): Promise<{user: IUser, token: string}> {
        const response = await fetch(`${this.apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return await response.json();
    }

    async logout(): Promise<void> {
        const response = await fetch(`${this.apiUrl}/logout`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }
    }

    async getUsers(){
        const response = await fetch(`${this.apiUrl}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return await response.json();
    }
}