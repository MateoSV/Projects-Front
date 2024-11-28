import { ElMessage } from 'element-plus'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { hasAnyPermission } from '@/helpers/permissionHelper'
import {useAuthStore} from "@/stores/authStore";

export const validateToken = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')

  if (!token) {
    return next({ name: 'Login' })
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ token: token })
    })

    if (!response.ok) {
      localStorage.removeItem('token')
      authStore.clearAuthData()
      ElMessage.error('Token validation failed')
      return next({ name: 'Login' })
    }

   const data = await response.json()

    if (data) {
      if (!authStore.user) {
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        if (!userResponse.ok) {
          localStorage.removeItem('token')
          authStore.clearAuthData()
          ElMessage.error('Error getting user data')
          return next({ name: 'Login' })
        }

        const userData = await userResponse.json()
        authStore.setAuthData({user: userData, token})
      }

      const roles = authStore.user?.roles ?? []

      if (roles.includes('admin')) {
        return next()
      }

      if (hasAnyPermission(to.name as string)) {
        return next()
      }
    } else {
      localStorage.removeItem('token')
      authStore.clearAuthData()
      ElMessage.error('Token is invalid')
      return next({ name: 'Login' })
    }
  } catch (error) {
    localStorage.removeItem('token')
    authStore.clearAuthData()
    console.error('Error during token validation:', error)
    ElMessage.error('Error during token validation')
    return next({ name: 'Login' })
  }
}
