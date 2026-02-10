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
  /** 表单整体校验 */
  validate: () => Promise<boolean>
  /** 校验单个字段 */
  validateField: (field: string) => Promise<boolean>
  /** 替换或基于旧值更新 schemas，实现动态增删改表单项 */
  updateSchema: (next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) => void
  /** 重置字段值与校验状态 */
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void
  /** 滚动到指定字段 */
  scrollToField: (prop: FormItemProp) => void
  /** 清除校验结果 */
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void
  /** 访问内部的 ElFormItem 列表 */
  fields: () => FormItemContext[]
  /** 通过 prop 获取单个 ElFormItem */
  getField: (prop: FormItemProp) => FormItemContext | undefined
  /** 设置初始值（会 merge 进当前 model） */
  setInitialValues: (initModel: Record<string, unknown>) => void
  /** 获取当前表单值（浅拷贝） */
  getValues: () => Record<string, unknown>
  /** 设置表单值（会 merge 到当前 model） */
  setValues: (values: Record<string, unknown>) => void
}

export type CoreFormProps = Omit<FormProps, 'model'> & {
  /** 表单项配置列表 */
  schemas: CoreFormSchema[]
  /** 行间距（左右 gutter，单位 px） */
  gutter?: number
  /** 一行展示多少列（自动换算为 24 栅格），优先级低于 schema.colSpan */
  colSpan?: number
}
