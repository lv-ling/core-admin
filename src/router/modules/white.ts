import type { RouteRecordRaw } from 'vue-router'

/** 白名单路由（登录页、404 等） */
const whiteRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found/index.vue'),
    meta: { title: '404', requiresAuth: false },
  },
]

export default whiteRoutes
