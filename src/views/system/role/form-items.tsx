export interface IRoleSearchForm {
  roleCode?: string
  roleName?: string
  status?: 'enabled' | 'disabled' | ''
}

export const SEARCH_FORM_ITEMS = [
  { prop: 'roleCode', label: '角色编码', placeholder: '请输入角色编码' },
  { prop: 'roleName', label: '角色名称', placeholder: '请输入角色名称' },
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
