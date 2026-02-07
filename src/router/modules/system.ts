import type { RouteRecordRaw } from 'vue-router'

/** 账号与权限（父级，仅分组） */
const systemRoute: RouteRecordRaw = {
    path: 'system',
    name: 'System',
    component: () => import('@/layouts/components/route-view.vue'),
    redirect: '/system/user',
    meta: { title: '账号与权限', requiresAuth: true },
    children: [
        {
            path: 'user',
            name: 'SystemUser',
            component: () => import('@/views/system/user/index.vue'),
            meta: { title: '用户管理', requiresAuth: true },
        },
        {
            path: 'role',
            name: 'SystemRole',
            component: () => import('@/views/system/role/index.vue'),
            meta: { title: '角色管理', requiresAuth: true },
        },
        {
            path: 'menu',
            name: 'SystemMenu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: { title: '菜单权限', requiresAuth: true },
        },
        {
            path: 'dept',
            name: 'SystemDept',
            component: () => import('@/views/system/dept/index.vue'),
            meta: { title: '部门组织', requiresAuth: true },
        }
    ],
}

export default systemRoute