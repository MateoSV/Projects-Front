import {useAuthStore} from "@/stores/authStore";


export const hasPermission = (permissionName: string): boolean => {
    const authStore = useAuthStore()
    return <boolean>authStore?.user?.permissions.some(
        permission => permission.name === permissionName
    )
}

export const hasAnyPermission = (module: string): boolean => {
    const authStore = useAuthStore()
    const permissionTypes = ['view', 'manage']
    return permissionTypes.some(type =>
        authStore?.user?.permissions.some(
            permission => permission.name === `${type} ${module}`
        )
    )
}
