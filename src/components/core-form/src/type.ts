import type { VNodeChild } from 'vue'
import type { FormProps, FormItemRule, FormItemContext, FormItemProp } from 'element-plus'
import { componentMap } from './component-map'
import type { Arrayable } from 'element-plus/es/utils/typescript.mjs'

export interface CoreFormSchema {
  /** 对应表单 model 的字段名 */
  prop: FormItemProp
  /** 表单项标签文案 */
  label: string
  /** 使用的组件名，对应 componentMap 的 key */
  component: keyof typeof componentMap
  /** 传递给渲染组件的所有 props / 事件 */
  props?: Record<string, unknown>
  /** ElFormItem 校验规则 */
  rules?: FormItemRule[]
  /** 自定义渲染（优先级最高） */
  render?: (ctx: { model: Record<string, unknown> }) => VNodeChild
  /** 表单项标签位置，对应 label-position */
  labelPosition?: 'left' | 'right' | 'top'
  /** 标签宽度，对应 label-width */
  labelWidth?: string | number
  /** 是否必填，对应 required */
  required?: boolean
  /** 自定义错误提示文案，对应 error */
  error?: string
  /** 是否显示校验信息，对应 show-message */
  showMessage?: boolean
  /** 是否行内显示校验信息，对应 inline-message */
  inlineMessage?: boolean
  /** 表单项尺寸，对应 size */
  size?: 'large' | 'default' | 'small'
  /** 原生 label for 属性，对应 for */
  for?: string
  /** 校验状态，对应 validate-status */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
  /** 栅格列宽（1-24，默认 24，对应一行一个） */
  colSpan?: number
}

export interface CoreFormExpose {
  validate: () => Promise<boolean>
  validateField: (field: string) => Promise<boolean>
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void
  scrollToField: (prop: FormItemProp) => void
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void
  fields: () => FormItemContext[]
  getField: (prop: FormItemProp) => FormItemContext | undefined
  setInitialValues: (initModel: Record<string, unknown>) => void
}

export type CoreFormProps = FormProps & {
  schemas: CoreFormSchema[]
  /** 一行展示多少列（自动换算为 24 栅格），优先级低于 schema.colSpan */
  colSpan?: number
}
