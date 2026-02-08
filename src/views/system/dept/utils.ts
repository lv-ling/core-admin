const CODE_REG = /^[a-zA-Z]\w*$/
const VALID_STATUS = ['enabled', 'disabled'] as const

export function validateDeptName(value: unknown): string | undefined {
  const s = value == null ? '' : typeof value === 'string' ? value : String(value)
  if (!s.trim()) return '部门名称不能为空'
  if (s.length > 50) return '部门名称最多 50 个字符'
  return undefined
}

export function validateDeptCode(value: unknown): string | undefined {
  const s = value == null ? '' : typeof value === 'string' ? value : String(value)
  if (!s.trim()) return '部门编码不能为空'
  if (s.length < 2 || s.length > 32) return '部门编码长度为 2-32 个字符'
  if (!CODE_REG.test(s)) return '部门编码以字母开头，只能包含字母、数字、下划线'
  return undefined
}

export function validateDeptStatus(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return '状态不能为空'
  if (!VALID_STATUS.includes(value as (typeof VALID_STATUS)[number])) return '状态必须为启用或禁用'
  return undefined
}

export function validateDeptSortOrder(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return '排序不能为空'
  const n = Number(value)
  if (Number.isNaN(n) || !Number.isInteger(n)) return '排序必须为整数'
  if (n < 0) return '排序不能为负数'
  return undefined
}

const DEPT_TYPES = ['company', 'branch', 'dept', 'group'] as const

export function validateDeptType(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return undefined
  if (!DEPT_TYPES.includes(value as (typeof DEPT_TYPES)[number])) return '请选择有效部门类型'
  return undefined
}

export function validateDeptLeader(value: unknown): string | undefined {
  const s = value == null ? '' : typeof value === 'string' ? value : String(value)
  if (s.length > 20) return '负责人最多 20 个字符'
  return undefined
}

const PHONE_REG = /^[\d\s\-+()]+$/

export function validateDeptPhone(value: unknown): string | undefined {
  if (value == null || value === '') return undefined
  const s = typeof value === 'string' ? value : String(value)
  if (s.length > 20) return '电话最多 20 个字符'
  if (!PHONE_REG.test(s)) return '电话格式不正确'
  return undefined
}

const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDeptEmail(value: unknown): string | undefined {
  if (value == null || value === '') return undefined
  const s = typeof value === 'string' ? value : String(value)
  if (s.length > 80) return '邮箱最多 80 个字符'
  if (!EMAIL_REG.test(s)) return '邮箱格式不正确'
  return undefined
}
