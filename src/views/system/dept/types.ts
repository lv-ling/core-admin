/** 部门类型枚举 */
export type DeptType = 'company' | 'branch' | 'dept' | 'group'

/** 部门节点（树形扁平结构：id + parentId） */
export interface IDept {
  id: string
  parentId: string | null
  name: string
  code: string
  sortOrder: number
  status: 'enabled' | 'disabled'
  description?: string
  /** 负责人 */
  leader?: string
  /** 联系电话 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 类型：公司/分公司/部门/小组 */
  type?: DeptType
  /** 创建时间 */
  createTime?: string
  /** 更新时间 */
  updateTime?: string
}

/** 部门搜索表单 */
export interface IDeptSearchForm {
  name?: string
  code?: string
  status?: 'enabled' | 'disabled' | ''
  leader?: string
  type?: DeptType | ''
}

/** 部门新增/编辑表单 */
export interface IDeptForm {
  id?: string
  parentId: string | null
  name: string
  code: string
  sortOrder: number
  status: 'enabled' | 'disabled'
  description?: string
  leader?: string
  phone?: string
  email?: string
  type?: DeptType
}
