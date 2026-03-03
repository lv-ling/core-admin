import type { CoreFormSchema, CoreFormSchemaContext } from '../types'

function createSchemaContext(
  schema: CoreFormSchema,
  model: Record<string, unknown>
): CoreFormSchemaContext {
  return { schema, model }
}

export function isSchemaVisible(
  schema: CoreFormSchema,
  model: Record<string, unknown>
): boolean {
  const visible = schema.visible
  if (typeof visible === 'function') {
    return visible(createSchemaContext(schema, model))
  }
  if (typeof visible === 'boolean') return visible
  return true
}

export function resolveSchemaDisabled(
  schema: CoreFormSchema,
  model: Record<string, unknown>
): boolean | undefined {
  const disabled = schema.disabled
  if (typeof disabled === 'function') {
    return disabled(createSchemaContext(schema, model))
  }
  if (typeof disabled === 'boolean') return disabled
  return undefined
}

export function cloneDefaultValue(value: unknown): unknown {
  if (value === undefined) return undefined
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value)
  }
  if (Array.isArray(value)) return [...value]
  if (typeof value === 'object' && value !== null) {
    return { ...(value as Record<string, unknown>) }
  }
  return value
}
