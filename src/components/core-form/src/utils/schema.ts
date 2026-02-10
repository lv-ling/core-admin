import type { CoreFormSchema } from '../types'

/**
 * 将 schema.prop 统一处理为字符串数组，便于后续取第一个字段名等操作
 */
export function normalizePropToArray(prop: CoreFormSchema['prop']): (string | number)[] {
  if (Array.isArray(prop)) return prop as (string | number)[]
  if (prop === undefined || prop === null || prop === '') return []
  return [prop] as (string | number)[]
}

/**
 * 从 schema 中获取用于绑定 v-model / 插槽名的字段 key
 * - 支持字符串 / 数组形式的 prop
 */
export function getFieldKeyFromSchema(schema: CoreFormSchema): string {
  const propArray = normalizePropToArray(schema.prop)
  const first = propArray[0]
  return typeof first === 'string' ? first : ''
}
