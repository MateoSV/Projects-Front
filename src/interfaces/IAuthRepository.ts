export interface IAuthRepository {
    login(email: string, password: string): Promise<object>;
    logout(): void;
}