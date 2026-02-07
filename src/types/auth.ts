/** 用户信息（与后端接口对齐时可扩展） */
export interface IUserInfo {
  name?: string
  avatar?: string
  [key: string]: unknown
}

/** 后端返回的菜单/路由项（用于动态路由转换） */
export interface IMenuRouteItem {
  path: string
  name?: string
  component?: string
  meta?: { title?: string; icon?: string; [key: string]: unknown }
  children?: IMenuRouteItem[]
}

/** 获取用户信息接口响应 */
export interface IGetUserInfoRes {
  data?: IUserInfo
  [key: string]: unknown
}

/** 获取菜单/路由接口响应 */
export interface IGetMenuRoutesRes {
  data?: IMenuRouteItem[]
  [key: string]: unknown
}
