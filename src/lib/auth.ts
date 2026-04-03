import type { User, UserRoleType } from '@/schemas'

import type { AstroCookies } from 'astro'
import { pb } from './pocketbase'

const AUTH_COOKIE = 'pb_auth'

export function getAuthFromCookie(cookies: AstroCookies): User | null {
  const authCookie = cookies.get(AUTH_COOKIE)
  if (!authCookie) return null
  
  try {
    const authData = JSON.parse(authCookie.value)
    pb.authStore.loadFromCookie(authCookie.value)
    return authData.model as User
  } catch {
    return null
  }
}

export function setAuthCookie(cookies: AstroCookies) {
  const authData = pb.authStore.exportToCookie()
  cookies.set(AUTH_COOKIE, authData, {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearAuthCookie(cookies: AstroCookies) {
  cookies.delete(AUTH_COOKIE, { path: '/' })
  pb.authStore.clear()
}

export function hasRole(user: User | null, roles: UserRoleType | UserRoleType[]): boolean {
  if (!user) return false
  
  const userRole = user.role
  if (Array.isArray(roles)) {
    return roles.includes(userRole)
  }
  return userRole === roles
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, 'admin')
}

export function canEdit(user: User | null): boolean {
  return hasRole(user, ['admin', 'editor'])
}

export function canWrite(user: User | null): boolean {
  return hasRole(user, ['admin', 'editor', 'writer'])
}