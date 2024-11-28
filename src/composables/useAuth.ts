import { useRouter } from 'vue-router';

import { AuthService } from '@/services/AuthService';
import { AuthRepository } from '@/repositories/AuthRepository';
import {ElMessage} from "element-plus";

export function useAuth() {

    const router = useRouter();
    const authService = new AuthService(new AuthRepository());

    const login = async (email: string, password: string) => {
        try {
            await authService.login(email, password);
            await router.push('/projects');
        } catch (error) {
            ElMessage.error(`Login failed: ${error}`);
        }
    };

    const logout = async () => {
        await authService.logout();
        await router.push('/login');
    };

    return {
        login,
        logout,
    };
}