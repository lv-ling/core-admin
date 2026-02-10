import { ref } from 'vue'
import type {
  CoreFormSchema,
  CoreFormExpose,
  CoreFormProps,
  UseCoreFormOptions,
  CoreFormMethods,
} from './types'

export function useCoreForm(initialOptions: UseCoreFormOptions = {}) {
  const formApiRef = ref<CoreFormExpose | null>(null)
  // 拆分出初始 schemas，剩余部分作为 CoreForm / ElForm 的配置
  const { schemas: initialSchemas, ...restOptions } = initialOptions
  const schemas = ref<CoreFormSchema[]>(initialSchemas ?? [])
  const formProps = ref<UseCoreFormOptions>(restOptions)

  function register(api: CoreFormExpose) {
    formApiRef.value = api
    // 初次注册时：
    // 1) 先更新 CoreForm 的 props（不含 schemas）
    api.setProps(formProps.value as Partial<CoreFormProps>)
    // 2) 再同步 schemas 到 CoreForm 内部
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

  const setProps: CoreFormExpose['setProps'] = (props) => {
    formApiRef.value?.setProps(props)
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
    setProps,
  }

  return [register, methods] as const
}
