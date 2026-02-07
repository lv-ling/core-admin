import type { RouteRecordRaw } from 'vue-router'

/** 主布局路由（含默认重定向，子路由由各业务模块提供） */
const layoutRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: () => import('@/layouts/app-layout.vue'),
  children: [],
}

export default layoutRoute
