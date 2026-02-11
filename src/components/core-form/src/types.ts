import type { VNodeChild, Ref } from 'vue'
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
  /** 更新 CoreForm / ElForm 的 props（除 model 外） */
  setProps: (props: Partial<CoreFormProps>) => void
}

export type CoreFormProps = Omit<FormProps, 'model'> & {
  /** 表单项配置列表 */
  schemas: CoreFormSchema[]
  /** 行间距（左右 gutter，单位 px） */
  gutter?: number
  /** 一行展示多少列（自动换算为 24 栅格），优先级低于 schema.colSpan */
  colSpan?: number
  /** 是否为搜索表单，自动追加「查询 / 重置」按钮 */
  isSearch?: boolean
  /**
   * 搜索表单默认最多展示的行数
   * - 默认为 2 行
   * - 设为 false 时表示展开全部，不显示「更多」按钮
   */
  maxRows?: number | false
  /** 搜索按钮点击回调（仅 isSearch 为 true 时生效） */
  onSearch?: (model: Record<string, unknown>) => void
  /** 重置按钮点击回调（仅 isSearch 为 true 时生效） */
  onReset?: () => void
}

export interface UseCoreFormOptions extends Partial<CoreFormProps> {
  /** 表单项配置列表 */
  schemas?: CoreFormSchema[]
  /** 搜索按钮点击事件（仅 isSearch 为 true 时生效） */
  onSearch?: (model: Record<string, unknown>) => void
  /** 重置按钮点击事件（仅 isSearch 为 true 时生效） */
  onReset?: () => void
}

export interface CoreFormMethods {
  /** 当前 schemas（用于传给 CoreForm 的 :schemas） */
  schemas: Ref<CoreFormSchema[]>
  /** CoreForm / ElForm 的配置（除 schemas 外的所有 props），可直接 v-bind 到 CoreForm 上 */
  formProps: Ref<UseCoreFormOptions>
  /** 替换或基于旧值更新 schemas，实现动态增删改表单项 */
  updateSchema: (next: CoreFormSchema[] | ((prev: CoreFormSchema[]) => CoreFormSchema[])) => void
  /** 代理 CoreForm / ElForm 的校验方法 */
  validate: () => Promise<boolean>
  validateField: (field: string) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  /** 更新 Core Form / ElForm 的 props（除 schemas 外） */
  setProps: (props: Partial<CoreFormProps>) => void
  /** 直接访问内部的 ElFormItem 列表 */
  fields: CoreFormExpose['fields']
  /** 通过 prop 获取单个 ElFormItem */
  getField: CoreFormExpose['getField']
  /** 设置初始值（会 merge 进当前 model） */
  setInitialValues: CoreFormExpose['setInitialValues']
  /** 获取当前表单值（浅拷贝） */
  getValues: CoreFormExpose['getValues']
  /** 设置表单值（会 merge 到当前 model） */
  setValues: CoreFormExpose['setValues']
}
