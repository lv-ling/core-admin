import type { CoreFormSchema } from '@/components/core-form'

export interface IRoleSearchForm {
  roleCode?: string
  roleName?: string
  status?: 'enabled' | 'disabled' | ''
}

/** 角色搜索表单配置（顶部搜索区） */
export function getRoleSearchFormSchemas(): CoreFormSchema[] {
  return [
    {
      prop: 'roleCode',
      label: '角色编码',
      type: 'input',
      props: {
        placeholder: '请输入角色编码',
        clearable: true,
        class: 'w-40',
      },
    },
    {
      prop: 'roleName',
      label: '角色名称',
      type: 'input',
      props: {
        placeholder: '请输入角色名称',
        clearable: true,
        class: 'w-40',
      },
    },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      props: {
        placeholder: '全部',
        clearable: true,
        class: 'w-40',
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
    },
  ]
}
