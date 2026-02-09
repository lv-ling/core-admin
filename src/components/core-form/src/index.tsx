import { defineComponent, h, ref } from 'vue'
import type { PropType, VNodeChild } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import { componentMap } from './component-map'
import type { CoreFormSchema, CoreFormExpose, CoreFormProps } from './type'

const CoreForm = defineComponent({
  name: 'CoreForm',
  props: {
    model: {
      type: Object as PropType<CoreFormProps['model']>,
      required: true,
    },
    schemas: {
      type: Array as PropType<CoreFormSchema[]>,
      required: true,
    },
  },
  emits: ['register'],
  setup(rawProps, { emit, slots }) {
    // 将运行时 props 断言为 CoreFormProps，辅助类型推断
    const props = rawProps as Readonly<CoreFormProps>
    // 使用 ref 包裹外部传入的 model，初始值来自 props.model
    const formModel = ref<Record<string, unknown>>(props.model ?? {})

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
    }

    emit('register', api)

    return () => {
      const { schemas, ...restFormProps } = props

      return (
        <ElForm
          ref={formRef}
          model={formModel.value}
          {...restFormProps}
        >
          {schemas.map((schema: CoreFormSchema, index: number) => {
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
              const recordModel = formModel.value as Record<string, unknown>
              const propsForComp = {
                ...(schema?.props || {}),
                modelValue: recordModel[fieldKey],
                'onUpdate:modelValue': (val: unknown) => {
                  recordModel[fieldKey] = val
                },
              }
              content = h(Comp as never, propsForComp as never)
            }

            return (
              <ElFormItem
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
                key={String(schema.prop ?? fieldKey ?? index)}
              >
                {content}
              </ElFormItem>
            )
          })}
        </ElForm>
      )
    }
  },
})

export default CoreForm
