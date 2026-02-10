import { defineComponent, ref } from 'vue'
import { ElButton, ElCol, ElForm, ElFormItem, ElRow } from 'element-plus'
import type { CoreFormSchema, CoreFormExpose, CoreFormProps } from './types'
import { coreFormProps } from './props'
import { useFormModel } from './hooks/useFormModel'
import { useSchemas } from './hooks/useSchemas'
import { useFormProps } from './hooks/useFormProps'
import { calcBaseSpan } from './utils/layout'
import { renderField } from './renderers/renderField'

const CoreForm = defineComponent({
  name: 'CoreForm',
  props: coreFormProps,
  emits: ['register', 'search', 'reset'],
  setup(props, { emit, slots }) {
    // 内部表单值（不再直接依赖外部 model 引用）
    const { formModel, setInitialValues, getValues, setValues } = useFormModel()
    // 内部 schema 列表
    const { innerSchemas, updateSchema } = useSchemas(props.schemas ?? [])
    // 内部表单 props
    const { innerProps, setProps } = useFormProps(props as CoreFormProps)

    const formRef = ref<InstanceType<typeof ElForm> | null>(null)

    const api: CoreFormExpose = {
      async validate() {
        const ok = await formRef.value?.validate?.().catch(() => false)
        return !!ok
      },
      async validateField(field: string) {
        if (!formRef.value) return false
        try {
          // Element Plus validateField 返回 Promise<void>
          await formRef.value.validateField(field)
          return true
        } catch {
          return false
        }
      },
      updateSchema,
      resetFields(props) {
        // resetFields 支持可选的 props 参数
        formRef.value?.resetFields?.(props)
      },
      clearValidate(props) {
        formRef.value?.clearValidate?.(props)
      },
      scrollToField(prop) {
        formRef.value?.scrollToField?.(prop)
      },
      fields() {
        const anyForm = formRef.value
        const list = anyForm?.fields
        return (Array.isArray(list) ? list : []) as ReturnType<CoreFormExpose['fields']>
      },
      getField(prop) {
        const list = api.fields()
        return list.find((item) => item.prop === prop)
      },
      setInitialValues,
      getValues,
      setValues,
      setProps,
    }

    emit('register', api)

    return () => {
      const currentProps = innerProps.value
      const { colSpan, gutter, isSearch, onSearch, onReset, ...restFormProps } = currentProps
      // 默认使用 24 栅格，每项占用的 span 由 colSpan 决定，例如：colSpan=8 → 一行 3 个
      const baseSpan = calcBaseSpan(colSpan)
      const handleSearch = () => {
        const snapshot = { ...formModel.value }
        onSearch?.(snapshot)
        emit('search', snapshot)
      }
      const handleReset = () => {
        onReset?.()
        formRef.value?.resetFields()
        emit('reset')
      }

      return (
        <ElForm
          ref={formRef}
          model={formModel.value}
          {...restFormProps}
        >
          <ElRow gutter={gutter}>
            {innerSchemas.value.map((schema: CoreFormSchema, index: number) => {
              const { content, fieldKey } = renderField({
                schema,
                index,
                slots,
                formModel: formModel.value,
              })
              const span = schema.colSpan && schema.colSpan > 0 ? schema.colSpan : baseSpan

              return (
                <ElCol
                  key={String(schema.prop ?? fieldKey ?? index)}
                  span={span}
                >
                  <ElFormItem
                    style={{ width: '100%' }}
                    label={schema.label}
                    prop={schema.prop}
                    rules={schema.rules}
                    labelWidth={schema.labelWidth}
                    labelPosition={schema.labelPosition}
                    required={schema.required}
                    error={schema.error}
                    showMessage={schema.showMessage}
                    inlineMessage={schema.inlineMessage}
                    size={schema.size}
                    for={schema.for}
                    validateStatus={
                      schema.validateStatus === 'warning' ? 'error' : schema.validateStatus
                    }
                  >
                    {content}
                  </ElFormItem>
                </ElCol>
              )
            })}
            {isSearch && (
              <ElCol
                key="__core_form_search_actions"
                span={baseSpan}
              >
                <ElFormItem style={{ width: '100%' }}>
                  <ElButton
                    type="primary"
                    onClick={handleSearch}
                  >
                    查询
                  </ElButton>
                  <ElButton
                    class="ml-2"
                    onClick={handleReset}
                  >
                    重置
                  </ElButton>
                </ElFormItem>
              </ElCol>
            )}
          </ElRow>
        </ElForm>
      )
    }
  },
})

export default CoreForm
