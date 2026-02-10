import { h } from 'vue'
import type { Slots, VNodeChild } from 'vue'
import { componentMap } from '../component-map'
import type { CoreFormSchema } from '../types'
import { getFieldKeyFromSchema } from '../utils/schema'

interface RenderFieldParams {
  schema: CoreFormSchema
  index: number
  slots: Slots
  formModel: Record<string, unknown>
}

/**
 * 渲染单个表单字段（不包含外层的 ElFormItem / ElCol）
 * - 优先级：schema.render > 具名插槽 > 通用组件
 */
export function renderField({
  schema,
  slots,
  formModel,
}: RenderFieldParams): { content: VNodeChild | null; fieldKey: string } {
  const fieldKey = getFieldKeyFromSchema(schema)
  const Comp = componentMap[schema.component]

  let slotRender: ((ctx: { model: Record<string, unknown> }) => VNodeChild) | undefined
  if (fieldKey) {
    slotRender = slots[fieldKey] as
      | ((ctx: { model: Record<string, unknown> }) => VNodeChild)
      | undefined
  }

  let content: VNodeChild | null = null

  if (schema.render) {
    content = schema.render({ model: formModel })
  } else if (slotRender) {
    content = slotRender({ model: formModel })
  } else if (Comp && fieldKey) {
    const recordModel = formModel
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

  return { content, fieldKey }
}

