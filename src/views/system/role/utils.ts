import type { IRole } from './types'

const ROLE_CODE_REG = /^[a-zA-Z][a-zA-Z0-9_]*$/

export function validateRoleCode(value: unknown): string | undefined {
  const s = typeof value === 'string' ? value : String(value ?? '')
  if (!s.trim()) {
    return '角色编码不能为空'
  }
  if (s.length < 2 || s.length > 32) {
    return '角色编码长度为 2-32 个字符'
  }
  if (!ROLE_CODE_REG.test(s)) {
    return '角色编码以字母开头，只能包含字母、数字、下划线'
  }
  return undefined
}

export function validateRoleName(value: unknown): string | undefined {
  const s = typeof value === 'string' ? value : String(value ?? '')
  if (!s.trim()) {
    return '角色名称不能为空'
  }
  if (s.length > 50) {
    return '角色名称最多 50 个字符'
  }
  return undefined
}

const VALID_STATUS = ['enabled', 'disabled'] as const

export function validateStatus(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') {
    return '状态不能为空'
  }
  if (!VALID_STATUS.includes(value as (typeof VALID_STATUS)[number])) {
    return '状态必须为 enabled 或 disabled'
  }
  return undefined
}

export function validateSortOrder(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') {
    return '排序不能为空'
  }
  const n = Number(value)
  if (Number.isNaN(n) || !Number.isInteger(n)) {
    return '排序必须为整数'
  }
  if (n < 0) {
    return '排序不能为负数'
  }
  return undefined
}

export function getRowValidationErrors(data: IRole): string[] {
  const errors: string[] = []
  const codeErr = validateRoleCode(data.roleCode)
  if (codeErr) errors.push(codeErr)
  const nameErr = validateRoleName(data.roleName)
  if (nameErr) errors.push(nameErr)
  const statusErr = validateStatus(data.status)
  if (statusErr) errors.push(statusErr)
  const sortErr = validateSortOrder(data.sortOrder)
  if (sortErr) errors.push(sortErr)
  return errors
}
