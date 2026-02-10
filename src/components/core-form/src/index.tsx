import { defineComponent, h, ref } from 'vue'
import type { VNodeChild } from 'vue'
import { ElCol, ElForm, ElFormItem, ElRow } from 'element-plus'
import { componentMap } from './component-map'
import type { CoreFormSchema, CoreFormExpose, CoreFormProps } from './type'
import { coreFormProps } from './props'

const CoreForm = defineComponent({
  name: 'CoreForm',
  props: coreFormProps,
  emits: ['register'],
  setup(rawProps, { emit, slots }) {
    // 将运行时 props 断言为 CoreFormProps，辅助类型推断
    const props = rawProps as Readonly<CoreFormProps>
    // 内部表单值，默认空对象；不再直接依赖外部 model 引用
    const formModel = ref<Record<string, unknown>>({})
    // 内部维护一份可变的 schemas，支持通过暴露的 API 动态更新
    const innerSchemas = ref<CoreFormSchema[]>(props.schemas ?? [])

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
      updateSchema(next) {
        if (typeof next === 'function') {
          innerSchemas.value = next(innerSchemas.value)
        } else {
          innerSchemas.value = next
        }
      },
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
      setInitialValues(initModel) {
        if (!formModel.value) return
        Object.assign(formModel.value, initModel)
      },
      getValues() {
        return { ...formModel.value }
      },
      setValues(values) {
        if (!values) return
        Object.assign(formModel.value, values)
      },
    }

    emit('register', api)

    return () => {
      const { colSpan, gutter, ...restFormProps } = props
      // 默认使用 24 栅格，每项占用的 span 由 colSpan 决定，例如：colSpan=8 → 一行 3 个
      const baseSpan = colSpan && colSpan > 0 ? Math.min(colSpan, 24) : 24

      return (
        <ElForm
          ref={formRef}
          model={formModel.value}
          {...restFormProps}
        >
          <ElRow gutter={gutter}>
            {innerSchemas.value.map((schema: CoreFormSchema, index: number) => {
              const prop = schema.prop
              let propArray: unknown[] = []
              if (Array.isArray(prop)) {
                propArray = prop
              } else if (prop) {
                propArray = [prop]
              }
              const first = propArray[0]
              const fieldKey = typeof first === 'string' ? first : ''
              const Comp = componentMap[schema.component]

              let slotRender: ((ctx: { model: Record<string, unknown> }) => VNodeChild) | undefined
              if (fieldKey) {
                slotRender = slots[fieldKey] as
                  | ((ctx: { model: Record<string, unknown> }) => VNodeChild)
                  | undefined
              }

              let content: VNodeChild | null = null

              if (schema.render) {
                content = schema.render({ model: formModel.value })
              } else if (slotRender) {
                content = slotRender({ model: formModel.value })
              } else if (Comp && fieldKey && formModel.value) {
                const recordModel = formModel.value
                const baseProps = schema?.props || {}
                const propsForComp = {
                  ...baseProps,
                  // 默认让表单控件宽度撑满所在的 ElCol，用户样式优先级更高
                  style: {
                    width: '100%',
                    ...(baseProps.style as Record<string, unknown> | undefined),
                  },
                  modelValue: recordModel[fieldKey],
                  'onUpdate:modelValue': (val: unknown) => {
                    recordModel[fieldKey] = val
                  },
                }
                content = h(Comp as never, propsForComp as never)
              }

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
          </ElRow>
        </ElForm>
      )
    }
  },
})

export default CoreForm
