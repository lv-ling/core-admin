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
  validateField: (field: string) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  /** 直接访问内部的 ElFormItem 列表 */
  fields: CoreFormExpose['fields']
  /** 通过 prop 获取单个 ElFormItem */
  getField: CoreFormExpose['getField']
  /** 设置初始值（会 merge 进当前 model） */
  setInitialValues: CoreFormExpose['setInitialValues']
}

export function useCoreForm(initialSchemas: CoreFormSchema[] = [] as CoreFormSchema[]) {
  const formApiRef = ref<CoreFormExpose | null>(null)
  const schemas = ref<CoreFormSchema[]>(initialSchemas)

  function register(api: CoreFormExpose) {
    formApiRef.value = api
    // 初次注册时，将当前 schemas 同步到 CoreForm 内部
    if (schemas.value?.length) {
      api.updateSchema(schemas.value)
    }
  }

  function updateSchema(next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) {
    if (typeof next === 'function') {
      schemas.value = next(schemas.value)
    } else {
      schemas.value = next
    }
    // 同步更新到 CoreForm 内部
    formApiRef.value?.updateSchema(schemas.value)
  }

  async function validate() {
    return (await formApiRef.value?.validate()) ?? false
  }

  async function validateField(field: string) {
    return (await formApiRef.value?.validateField(field)) ?? false
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

  const fields: CoreFormExpose['fields'] = () => {
    return formApiRef.value?.fields() ?? []
  }

  const getField: CoreFormExpose['getField'] = (prop) => {
    return formApiRef.value?.getField(prop)
  }

  const setInitialValues: CoreFormExpose['setInitialValues'] = (initModel) => {
    formApiRef.value?.setInitialValues(initModel)
  }

  const methods: CoreFormMethods = {
    schemas,
    updateSchema,
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
    fields,
    getField,
    setInitialValues,
  }

  return [register, methods] as const
}
