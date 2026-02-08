import type { ColumnSettings } from 'handsontable/settings'
import {
  validateRoleCode,
  validateRoleName,
  validateStatus,
  validateSortOrder,
} from './utils'

export const COL_HEADERS = ['ID', '角色编码', '角色名称', '描述', '状态', '排序']

type RoleValidatorFn = (value: unknown, callback: (valid: boolean) => void) => void

function roleValidator(validatorFn: (v: unknown) => string | undefined): RoleValidatorFn {
  return (value, callback) => callback(!validatorFn(value))
}

export function getColumns(): ColumnSettings[] {
  return [
    { data: 'id', readOnly: true, width: 80 },
    {
      data: 'roleCode',
      validator: roleValidator(validateRoleCode),
      allowInvalid: true,
      width: 140,
    },
    {
      data: 'roleName',
      validator: roleValidator(validateRoleName),
      allowInvalid: true,
      width: 140,
    },
    { data: 'description', width: 200 },
    {
      data: 'status',
      type: 'dropdown',
      source: ['enabled', 'disabled'],
      validator: roleValidator(validateStatus),
      allowInvalid: true,
      width: 100,
    },
    {
      data: 'sortOrder',
      type: 'numeric',
      validator: roleValidator(validateSortOrder),
      allowInvalid: true,
      width: 80,
    },
  ]
}
