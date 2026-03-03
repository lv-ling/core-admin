import type { CoreFormSchema } from '@/components/core-form'

/** 菜单搜索表单配置 */
export function getMenuSearchFormSchemas(): CoreFormSchema[] {
  return [
    {
      prop: 'keyword',
      label: '关键字',
      type: 'input',
      props: {
        placeholder: '菜单名称 / 路由路径',
        clearable: true,
      },
    },
    {
      prop: 'type',
      label: '类型',
      type: 'select',
      props: {
        placeholder: '全部',
        clearable: true,
        options: [
          { label: '目录', value: 'directory' },
          { label: '菜单', value: 'menu' },
          { label: '按钮', value: 'button' },
        ],
      },
    },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      props: {
        placeholder: '全部',
        clearable: true,
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
    },
  ]
}
