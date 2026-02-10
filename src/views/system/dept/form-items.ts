import type { CoreFormSchema } from '@/components/core-form'

export interface DeptFormSchema {
  /** 对应表单 model 的字段名 */
  field: string
  /** 表单项标签文案 */
  label: string
  /** Element Plus 组件名 */
  component:
    | 'ElInput'
    | 'ElSelect'
    | 'ElCheckboxGroup'
    | 'ElInputNumber'
    | 'ElSwitch'
    | 'ElRadioGroup'
  /** 传递给组件的 props（placeholder、options 等） */
  props?: Record<string, unknown>
  /** 表单校验规则（简化版） */
  rules?: Array<{ required?: boolean; message?: string }>
}

/** 部门弹窗表单配置（示例：名称 + 类型 + 状态） */
export function getDeptEditFormSchemas(): CoreFormSchema[] {
  return [
    {
      prop: 'name',
      label: '部门名称',
      component: 'ElInput',
      props: {
        placeholder: '请输入部门名称',
        clearable: true,
      },
      rules: [{ required: true, message: '请输入部门名称' }],
    },
    {
      prop: 'parentId',
      label: '上级部门',
      component: 'ElSelect',
      props: {
        placeholder: '请选择上级部门',
        clearable: true,
      },
      rules: [{ required: true, message: '请选择上级部门' }],
    },
    {
      prop: 'type',
      label: '类型',
      component: 'ElSelect',
      props: {
        placeholder: '请选择类型',
        clearable: true,
        options: [
          { label: '公司', value: 'company' },
          { label: '分公司', value: 'branch' },
          { label: '部门', value: 'dept' },
          { label: '小组', value: 'group' },
        ],
      },
      rules: [{ required: true, message: '请选择类型' }],
    },
    {
      prop: 'status',
      label: '状态(多选)',
      component: 'ElRadioGroup',
      props: {
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
      rules: [{ required: true, message: '请选择状态' }],
    },
    {
      prop: 'code',
      label: '部门编码',
      component: 'ElInput',
      props: {
        placeholder: '请输入部门编码',
        clearable: true,
      },
      rules: [{ required: true, message: '请输入部门编码' }],
    },
    {
      prop: 'leader',
      label: '负责人',
      component: 'ElInput',
      props: {
        placeholder: '请输入负责人',
        clearable: true,
      },
    },
    {
      prop: 'phone',
      label: '电话',
      component: 'ElInput',
      props: {
        placeholder: '请输入联系电话',
        clearable: true,
      },
    },
    {
      prop: 'email',
      label: '邮箱',
      component: 'ElInput',
      props: {
        placeholder: '请输入邮箱',
        clearable: true,
      },
    },
    {
      prop: 'sortOrder',
      label: '排序',
      component: 'ElInputNumber',
      props: {
        min: 0,
        placeholder: '请输入排序',
        class: 'w-full',
      },
    },
    {
      prop: 'enableNotify',
      label: '通知开关',
      component: 'ElSwitch',
      props: {
        activeText: '开启',
        inactiveText: '关闭',
      },
    },
  ]
}

/** 部门搜索表单配置（顶部搜索区） */
export function getDeptSearchFormSchemas(): CoreFormSchema[] {
  return [
    {
      prop: 'name',
      label: '部门名称',
      component: 'ElInput',
      props: {
        placeholder: '请输入部门名称',
        clearable: true,
      },
    },
    {
      prop: 'code',
      label: '部门编码',
      component: 'ElInput',
      props: {
        placeholder: '请输入部门编码',
        clearable: true,
      },
    },
    {
      prop: 'status',
      label: '状态',
      component: 'ElSelect',
      props: {
        placeholder: '全部',
        clearable: true,
        class: 'w-100px',
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
    },
  ]
}
