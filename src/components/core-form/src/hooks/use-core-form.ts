import { ref } from 'vue'
import type { Ref } from 'vue'
import type { CoreFormSchema, CoreFormExpose, CoreFormProps } from '../type'

export interface UseCoreFormOptions extends Partial<CoreFormProps> {
  /** 表单项配置列表 */
  schemas?: CoreFormSchema[]
}

export interface CoreFormMethods {
  /** 当前 schemas（用于传给 CoreForm 的 :schemas） */
  schemas: Ref<CoreFormSchema[]>
  /** CoreForm / ElForm 的配置（除 schemas 外的所有 props），可直接 v-bind 到 CoreForm 上 */
  formProps: Ref<UseCoreFormOptions>
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
  /** 获取当前表单值（浅拷贝） */
  getValues: CoreFormExpose['getValues']
  /** 设置表单值（会 merge 到当前 model） */
  setValues: CoreFormExpose['setValues']
}

export function useCoreForm(initialOptions: UseCoreFormOptions | CoreFormSchema[] = {}) {
  const formApiRef = ref<CoreFormExpose | null>(null)
  // 兼容两种调用方式：
  // 1) useCoreForm([{ ...schema }])
  // 2) useCoreForm({ schemas, colSpan, gutter, ... })
  const normalized: UseCoreFormOptions = Array.isArray(initialOptions)
    ? { schemas: initialOptions }
    : initialOptions || {}

  // 拆分出初始 schemas，剩余部分作为 CoreForm / ElForm 的配置
  const { schemas: initialSchemas, ...restOptions } = normalized
  const schemas = ref<CoreFormSchema[]>(initialSchemas ?? [])
  const formProps = ref<UseCoreFormOptions>(restOptions)

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

  const getValues: CoreFormExpose['getValues'] = () => {
    return formApiRef.value?.getValues() ?? {}
  }

  const setValues: CoreFormExpose['setValues'] = (values) => {
    formApiRef.value?.setValues(values)
  }

  const methods: CoreFormMethods = {
    schemas,
    formProps,
    updateSchema,
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
    fields,
    getField,
    setInitialValues,
    getValues,
    setValues,
  }

  return [register, methods] as const
}
