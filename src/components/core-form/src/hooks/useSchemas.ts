import { ref } from 'vue'
import type { CoreFormSchema } from '../types'

/**
 * 负责管理 CoreForm 的内部 schema 列表
 * - 提供 innerSchemas 与 updateSchema
 */
export function useSchemas(initialSchemas: CoreFormSchema[] = []) {
  const innerSchemas = ref<CoreFormSchema[]>(initialSchemas)

  function updateSchema(next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) {
    if (typeof next === 'function') {
      innerSchemas.value = next(innerSchemas.value)
    } else {
      innerSchemas.value = next
    }
  }

  return {
    innerSchemas,
    updateSchema,
  }
}
