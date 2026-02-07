import type { RouteRecordRaw } from 'vue-router'
import whiteRoutes from './white'
import layoutRoute from './layout'
import dashboardRoute from './dashboard'
import configRoute from './config'
import systemRoute from './system'
import commonRoute from './common'

/** 白名单路径：无需登录即可访问 */
export const whiteList = ['/login']

/** 系统常用模块（作为 Home 布局的子路由） */
const systemChildren: RouteRecordRaw[] = [dashboardRoute, systemRoute, configRoute, commonRoute]

/** 合并后的静态路由：白名单 + 主布局（含系统模块子路由） */
export const staticRoutes: RouteRecordRaw[] = [
  ...whiteRoutes,
  {
    ...layoutRoute,
    children: systemChildren,
  },
]
