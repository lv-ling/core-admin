import { ElCol, ElFormItem } from 'element-plus'
import type { VNodeChild } from 'vue'
import type { CoreFormSchema } from '../types'

interface RenderFormItemParams {
  schema: CoreFormSchema
  index: number
  fieldKey: string
  span: number
  content: VNodeChild | null
}

/**
 * 渲染包裹字段内容的 ElCol + ElFormItem
 */
export function renderFormItem({
  schema,
  index,
  fieldKey,
  span,
  content,
}: RenderFormItemParams): VNodeChild {
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
}

