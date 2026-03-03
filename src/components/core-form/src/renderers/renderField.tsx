import { h } from 'vue'
import type { Slots, VNodeChild } from 'vue'
import { createFieldAdapterContext, resolveCoreFormFieldBySchema } from '../field-registry'
import type { CoreFormSchema } from '../types'
import { resolveSchemaDisabled } from '../utils/schema.helpers'
import {
  getFieldKeyFromSchema,
  getValueByPath,
  normalizePropToArray,
  setValueByPath,
} from '../utils/schema'

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
  const fieldPath = normalizePropToArray(schema.prop)
  const adapter = resolveCoreFormFieldBySchema(schema.type, schema.component)

  let slotRender:
    | ((ctx: { model: Record<string, unknown>; schema: CoreFormSchema }) => VNodeChild)
    | undefined
  if (fieldKey) {
    slotRender = slots[fieldKey] as
      | ((ctx: { model: Record<string, unknown>; schema: CoreFormSchema }) => VNodeChild)
      | undefined
  }

  let content: VNodeChild | null = null

  if (schema.render) {
    content = schema.render({ model: formModel, schema })
  } else if (slotRender) {
    content = slotRender({ model: formModel, schema })
  } else if (adapter) {
    const adapterContext = createFieldAdapterContext(schema.props)
    const adapterProps = adapter.mapProps?.(adapterContext) ?? adapterContext.schemaProps
    const schemaDisabled = resolveSchemaDisabled(schema, formModel)
    const propsForComp: Record<string, unknown> = {
      ...adapterProps,
      // 默认让表单控件宽度撑满所在的 ElCol，用户样式优先级更高
      style: [{ width: '100%' }, adapterProps.style],
    }

    if (fieldPath.length > 0) {
      propsForComp.modelValue = getValueByPath(formModel, schema.prop)
      propsForComp['onUpdate:modelValue'] = (val: unknown) => {
        setValueByPath(formModel, schema.prop, val)
      }
    }

    if (schemaDisabled !== undefined) {
      propsForComp.disabled = schemaDisabled
    }

    const children = adapter.renderChildren?.(adapterContext)
    content = h(adapter.component as never, propsForComp as never, children as never)
  }

  return { content, fieldKey }
}
