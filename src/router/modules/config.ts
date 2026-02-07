import type { RouteRecordRaw } from 'vue-router'

/** 系统配置（含系统设置、字典/枚举） */
const configRoute: RouteRecordRaw = {
  path: 'config',
  name: 'Config',
  component: () => import('@/layouts/components/route-view/index.vue'),
  redirect: '/config/settings',
  meta: { title: '系统配置', requiresAuth: true },
  children: [
    {
      path: 'settings',
      name: 'ConfigSettings',
      component: () => import('@/views/config/settings/index.vue'),
      meta: { title: '系统设置', requiresAuth: true },
    },
    {
      path: 'dict',
      name: 'ConfigDict',
      component: () => import('@/views/config/dict/index.vue'),
      meta: { title: '字典枚举', requiresAuth: true },
    },
    {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index.vue'),
      meta: { title: '个人中心', requiresAuth: true },
    },
  ],
}

export default configRoute
