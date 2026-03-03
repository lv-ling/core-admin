import type { FormItemProp } from 'element-plus'
import type { CoreFormSchema } from '../types'

/**
 * 将 schema.prop 统一处理为字符串数组，便于后续取第一个字段名等操作
 */
export function normalizePropToArray(prop: CoreFormSchema['prop']): (string | number)[] {
  if (Array.isArray(prop)) {
    return prop.flatMap((item) => normalizeStringPath(String(item)))
  }
  if (typeof prop === 'number') return [prop]
  if (typeof prop === 'string') return normalizeStringPath(prop)
  if (prop === undefined || prop === null || prop === '') return []
  return normalizeStringPath(String(prop))
}

/**
 * 从 schema 中获取用于绑定 v-model / 插槽名的字段 key
 * - 支持字符串 / 数组形式的 prop
 */
export function getFieldKeyFromSchema(schema: CoreFormSchema): string {
  return toPathString(normalizePropToArray(schema.prop))
}

function normalizeStringPath(path: string): (string | number)[] {
  if (!path) return []
  const flattened = path.replace(/\[(\d+)\]/g, '.$1')
  return flattened
    .split('.')
    .filter(Boolean)
    .map((segment) => (isIntegerString(segment) ? Number(segment) : segment))
}

function isIntegerString(value: string): boolean {
  return /^\d+$/.test(value)
}

function isPathContainer(value: unknown): value is Record<string, unknown> | unknown[] {
  return (typeof value === 'object' && value !== null) || Array.isArray(value)
}

function readPathSegment(
  container: Record<string, unknown> | unknown[],
  segment: string | number
): unknown {
  if (Array.isArray(container) && typeof segment === 'number') {
    return container[segment]
  }
  return container[String(segment)]
}

function writePathSegment(
  container: Record<string, unknown> | unknown[],
  segment: string | number,
  value: unknown
): void {
  if (Array.isArray(container) && typeof segment === 'number') {
    container[segment] = value
    return
  }
  container[String(segment)] = value
}

export function getValueByPath(model: Record<string, unknown>, prop: FormItemProp): unknown {
  const path = normalizePropToArray(prop)
  if (path.length === 0) return undefined
  let current: unknown = model
  for (const segment of path) {
    if (!isPathContainer(current)) return undefined
    current = readPathSegment(current, segment)
  }
  return current
}

export function setValueByPath(
  model: Record<string, unknown>,
  prop: FormItemProp,
  value: unknown
): void {
  const path = normalizePropToArray(prop)
  if (path.length === 0) return

  let current: Record<string, unknown> | unknown[] = model

  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index]
    const nextSegment = path[index + 1]
    const nextValue = readPathSegment(current, segment)

    if (!isPathContainer(nextValue)) {
      const nextContainer: Record<string, unknown> | unknown[] =
        typeof nextSegment === 'number' ? [] : {}
      writePathSegment(current, segment, nextContainer)
      current = nextContainer
      continue
    }

    current = nextValue
  }

  const lastSegment = path[path.length - 1]
  writePathSegment(current, lastSegment, value)
}

export function toPathString(path: (string | number)[]): string {
  if (path.length === 0) return ''
  return path.map((segment) => String(segment)).join('.')
}
