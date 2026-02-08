import {
  validateDeptName,
  validateDeptCode,
  validateDeptStatus,
  validateDeptSortOrder,
  validateDeptType,
  validateDeptLeader,
  validateDeptPhone,
  validateDeptEmail,
} from './utils'
import type { DeptType } from './types'

/** 部门类型选项 */
const DEPT_TYPE_OPTIONS: { label: string; value: DeptType }[] = [
  { label: '公司', value: 'company' },
  { label: '分公司', value: 'branch' },
  { label: '部门', value: 'dept' },
  { label: '小组', value: 'group' },
]

/** 部门表格列配置（供 VxeGrid columns 使用），含行内编辑与校验 */
export function getDeptColumns() {
  return [
    {
      field: 'name',
      title: '部门名称',
      treeNode: true,
      minWidth: 200,
      editRender: { name: 'ElInput', props: { placeholder: '部门名称' } },
    },
    {
      field: 'code',
      title: '部门编码',
      width: 140,
      editRender: { name: 'CusInput', props: { placeholder: '部门编码' } },
    },
    {
      field: 'type',
      title: '类型',
      width: 90,
      formatter: ({ cellValue }: { cellValue: DeptType | undefined }) => {
        const opt = DEPT_TYPE_OPTIONS.find((o) => o.value === cellValue)
        return opt?.label ?? '-'
      },
      editRender: {
        name: 'ElSelect',
        options: DEPT_TYPE_OPTIONS,
        props: { placeholder: '请选择' },
      },
    },
    {
      field: 'leader',
      title: '负责人',
      width: 100,
      editRender: { name: 'ElInput', props: { placeholder: '选填' } },
    },
    {
      field: 'phone',
      title: '电话',
      width: 130,
      // editRender: { name: 'CusInput', props: { placeholder: '选填' } },
      cellRender: { name: 'CusInput', props: { placeholder: '选填', clearable: true } },
    },
    {
      field: 'email',
      title: '邮箱',
      width: 160,
      showOverflow: 'tooltip' as const,
      editRender: { name: 'ElInput', props: { placeholder: '选填' } },
    },
    {
      field: 'sortOrder',
      title: '排序',
      width: 80,
      align: 'center' as const,
      editRender: { name: 'ElInputNumber', props: { min: 0, controlsPosition: 'right' } },
    },
    {
      field: 'status',
      title: '状态',
      width: 80,
      formatter: ({ cellValue }: { cellValue: string }) =>
        cellValue === 'enabled' ? '启用' : '禁用',
      editRender: {
        name: 'ElSelect',
        options: [
          { label: '启用', value: 'enabled' },
          { label: '禁用', value: 'disabled' },
        ],
      },
    },
    {
      field: 'description',
      title: '描述',
      minWidth: 140,
      showOverflow: 'tooltip' as const,
      editRender: { name: 'ElInput', props: { placeholder: '选填' } },
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 160,
    },
    {
      field: 'updateTime',
      title: '更新时间',
      width: 160,
    },
    {
      field: 'operation',
      title: '操作',
      width: 240,
      fixed: 'right' as const,
      slots: { default: 'operation' },
    },
  ]
}

/** 行内编辑校验规则（供 VxeGrid editRules 使用），validator 返回 Error 表示不通过 */
function wrapValidator(
  fn: (value: unknown) => string | undefined
): (params: { cellValue: unknown }) => Error | undefined {
  return ({ cellValue }) => {
    const err = fn(cellValue)
    return err ? new Error(err) : undefined
  }
}

export function getDeptEditRules() {
  return {
    name: [
      { required: true, message: '请输入部门名称' },
      { validator: wrapValidator(validateDeptName) },
    ],
    code: [
      { required: true, message: '请输入部门编码' },
      { validator: wrapValidator(validateDeptCode) },
    ],
    type: [{ validator: wrapValidator(validateDeptType) }],
    leader: [{ validator: wrapValidator(validateDeptLeader) }],
    phone: [{ validator: wrapValidator(validateDeptPhone) }],
    email: [{ validator: wrapValidator(validateDeptEmail) }],
    sortOrder: [
      { required: true, message: '请输入排序' },
      { validator: wrapValidator(validateDeptSortOrder) },
    ],
    status: [
      { required: true, message: '请选择状态' },
      { validator: wrapValidator(validateDeptStatus) },
    ],
  }
}
