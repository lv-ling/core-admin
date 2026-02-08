import type { IDeptSearchForm } from './types'

export interface IDeptFormItemsConfig {
  searchForm: IDeptSearchForm
}

export const SEARCH_FORM_ITEMS = [
  { prop: 'name', label: '部门名称', placeholder: '请输入部门名称' },
  { prop: 'code', label: '部门编码', placeholder: '请输入部门编码' },
  {
    prop: 'status',
    label: '状态',
    placeholder: '全部',
    options: [
      { label: '启用', value: 'enabled' },
      { label: '禁用', value: 'disabled' },
    ],
  },
] as const
