import type { Component } from 'vue'
import {
  legacyComponentTypeMap,
  resolveCoreFormField,
  type LegacyCoreFormComponent,
} from './field-registry'

/**
 * 向后兼容旧版 schema.component 写法。
 * 新代码请优先使用 schema.type + 字段注册器。
 */
const entries = Object.entries(legacyComponentTypeMap).map(([component, type]) => {
  const resolved = resolveCoreFormField(type)
  const adapterComponent = resolved?.component
  return [component, adapterComponent] as const
})

export const componentMap = entries.reduce<Record<LegacyCoreFormComponent, Component>>(
  (acc, [component, adapterComponent]) => {
    if (!adapterComponent) return acc
    acc[component as LegacyCoreFormComponent] = adapterComponent
    return acc
  },
  {} as Record<LegacyCoreFormComponent, Component>
)
