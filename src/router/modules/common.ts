import type { RouteRecordRaw } from 'vue-router';

/** 通用业务（父级，仅分组） */
const commonRoute: RouteRecordRaw = {
    path: 'common',
    name: 'Common',
    component: () => import('@/layouts/components/route-view.vue'),
    redirect: '/common/upload',
    meta: { title: '通用业务', requiresAuth: true },
    children: [
        {
            path: 'upload',
            name: 'CommonUpload',
            component: () => import('@/views/common/upload/index.vue'),
            meta: { title: '文件上传', requiresAuth: true },
        },
        {
            path: 'message',
            name: 'CommonMessage',
            component: () => import('@/views/common/message/index.vue'),
            meta: { title: '消息通知', requiresAuth: true },
        },
        {
            path: 'export',
            name: 'CommonExport',
            component: () => import('@/views/common/export/index.vue'),
            meta: { title: '导出示例', requiresAuth: true },
        },
        {
            path: 'i18n',
            name: 'CommonI18n',
            component: () => import('@/views/common/i18n/index.vue'),
            meta: { title: '国际化', requiresAuth: true },
        }
    ],
}

export default commonRoute