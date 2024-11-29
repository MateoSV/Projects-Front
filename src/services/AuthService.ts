import { AuthRepository } from '@/repositories/AuthRepository';
import { useAuthStore } from '@/stores/authStore';

export class AuthService {
    private authRepository: AuthRepository;
    private authStore = useAuthStore();

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async login(email: string, password: string): Promise<void> {
        const data = await this.authRepository.login(email, password);
        this.authStore.setAuthData(data);
        localStorage.setItem('token', data.token);
    }

    async logout(): Promise<void> {
        localStorage.removeItem('token');
        await this.authRepository.logout();

    }

    async getUsers(){
        return await this.authRepository.getUsers();
    }
}