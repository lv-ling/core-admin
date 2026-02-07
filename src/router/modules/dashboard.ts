import type { RouteRecordRaw } from 'vue-router'

/** 工作台 */
const dashboardRoute: RouteRecordRaw = {
  path: 'dashboard',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: { title: '工作台', requiresAuth: true },
}

export default dashboardRoute
