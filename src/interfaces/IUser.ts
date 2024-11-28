export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    permissions: IPermission[];
    roles: string[];
}

export interface IPermission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}