import { ref } from 'vue'

/**
 * 负责管理 CoreForm 的内部表单值（model）
 * - 不直接暴露给外部，只通过暴露的 API 操作
 */
export function useFormModel() {
  const formModel = ref<Record<string, unknown>>({})

  function setInitialValues(initModel: Record<string, unknown>) {
    if (!initModel) return
    Object.assign(formModel.value, initModel)
  }

  function getValues(): Record<string, unknown> {
    return { ...formModel.value }
  }

  function setValues(values: Record<string, unknown>) {
    if (!values) return
    Object.assign(formModel.value, values)
  }

  return {
    formModel,
    setInitialValues,
    getValues,
    setValues,
  }
}
