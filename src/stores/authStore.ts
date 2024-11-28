import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser } from '@/interfaces/IUser';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser | null>(null);
    const token = ref<string | null>(null);

    const setAuthData = (authData: { user: IUser, token: string }) => {
        user.value = authData.user;
        token.value = authData.token;
    };

    const clearAuthData = () => {
        user.value = null;
        token.value = null;
    }

    return {
        user,
        token,
        setAuthData,
        clearAuthData
    };
});