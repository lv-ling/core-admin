import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getMenuRoutes } from '@/api/auth'
import type { IMenuRouteItem } from '@/types/auth'
import { staticRoutes } from './modules'
import * as routerModules from './modules'

const viewModules = import.meta.glob('@/views/**/index.vue')

/** 将后端菜单项转为路由（组件按 path 懒加载 @/views/xxx/index.vue） */
function menuItemToRoute(item: IMenuRouteItem): RouteRecordRaw {
  const path = item.path.startsWith('/') ? item.path.slice(1) : item.path
  const comp = (item.component ?? path).replace(/^\//, '')
  const viewKey = `@/views/${comp}/index.vue`
  const loader =
    viewModules[viewKey] ??
    (() => import('@/views/dashboard/index.vue'))
  return {
    path,
    name: item.name ?? path,
    component: () => loader() as Promise<{ default: import('vue').Component }>,
    meta: { ...item.meta, title: item.meta?.title, requiresAuth: true },
    children: item.children?.map(menuItemToRoute),
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
})

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()
  const isLoggedIn = auth.isLoggedIn()

  if (isLoggedIn) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/dashboard', replace: true })
      return
    }
    if (!auth.routesFetched) {
      try {
        const res = await getMenuRoutes()
        const list = res?.data ?? []
        for (const item of list) {
          const child = menuItemToRoute(item)
          router.addRoute('Home', child)
        }
        auth.setRoutesFetched(true)
        next({ ...to, replace: true })
        return
      } catch {
        auth.setRoutesFetched(true)
      }
    }
  } else if (!routerModules.whiteList.includes(to.path)) {
    next({ path: '/login', replace: true })
    return
  }
  next()
})

export { whiteList } from './modules'
export default router
