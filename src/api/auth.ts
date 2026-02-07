import type { IGetMenuRoutesRes, IGetUserInfoRes } from '@/types/auth'

const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function request<T>(url: string): Promise<T> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE}${url}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) {
    throw new Error(String(res.status))
  }
  return res.json() as Promise<T>
}

/** 获取当前用户信息 */
export function getUserInfo() {
  return request<IGetUserInfoRes>('/auth/user')
}

/** 获取当前用户可访问的菜单/路由（用于动态路由） */
export function getMenuRoutes() {
  return request<IGetMenuRoutesRes>('/auth/routes')
}
