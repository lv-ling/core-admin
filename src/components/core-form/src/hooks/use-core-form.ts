import { ref } from 'vue'
import type { Ref } from 'vue'
import type { CoreFormSchema, CoreFormExpose } from '../type'

export interface CoreFormMethods {
  /** 当前 schemas（用于传给 CoreForm 的 :schemas） */
  schemas: Ref<CoreFormSchema[]>
  /** 替换或基于旧值更新 schemas，实现动态增删改表单项 */
  updateSchema: (next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) => void
  /** 代理 CoreForm / ElForm 的校验方法 */
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
}

export function useCoreForm(initialSchemas: CoreFormSchema[] = [] as CoreFormSchema[]) {
  const formApiRef = ref<CoreFormExpose | null>(null)
  const schemas = ref<CoreFormSchema[]>(initialSchemas)

  function register(api: CoreFormExpose) {
    formApiRef.value = api
  }

  function updateSchema(next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) {
    if (typeof next === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      schemas.value = (next as any)(schemas.value)
    } else {
      schemas.value = next
    }
  }

  async function validate() {
    return (await formApiRef.value?.validate()) ?? false
  }

  function resetFields() {
    formApiRef.value?.resetFields()
  }

  function clearValidate(props?: string | string[]) {
    formApiRef.value?.clearValidate(props)
  }

  function scrollToField(prop: string) {
    formApiRef.value?.scrollToField(prop)
  }

  const methods: CoreFormMethods = {
    schemas,
    updateSchema,
    validate,
    resetFields,
    clearValidate,
    scrollToField,
  }

  return [register, methods] as const
}
