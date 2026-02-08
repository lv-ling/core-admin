import { h } from 'vue'
import XEUtils from 'xe-utils'
import type { VxeGlobalComponents, VxeUIExport } from 'vxe-pc-ui'

import * as tableComponents from './components'

const MODEL_PROP = 'modelValue'
const MODEL_EVENT_KEY = 'onUpdate:modelValue'

function getCellContext(params: Record<string, unknown>) {
  const row = params.row as Record<string, unknown>
  const column = params.column as { field: string }
  const cellValue = XEUtils.get(row, column.field)
  return { row, column, cellValue }
}

function getCellProps(renderOpts: Record<string, unknown>, cellValue: unknown) {
  return XEUtils.assign({}, renderOpts.props as object, renderOpts.attrs as object, {
    [MODEL_PROP]: cellValue,
  })
}

function getEditOns(
  renderOpts: Record<string, unknown>,
  params: Record<string, unknown>,
  row: Record<string, unknown>,
  column: { field: string }
) {
  const ons: Record<string, (value: unknown) => void> = {
    [MODEL_EVENT_KEY]: (value: unknown) => {
      XEUtils.set(row, column.field, value)
      ;(params.$table as { updateStatus?: (p: unknown) => void })?.updateStatus?.(params)
    },
  }
  const events = renderOpts.events as
    | Record<string, (p: unknown, ...args: unknown[]) => void>
    | undefined
  if (events) {
    XEUtils.objectEach(events, (fn, key: string) => {
      ons['on' + key.slice(0, 1).toUpperCase() + key.slice(1)] = (...args: unknown[]) =>
        fn(params, ...args)
    })
  }
  return ons
}

function renderCell(
  vxeUI: VxeUIExport,
  compName: string,
  props: Record<string, unknown>,
  ons?: Record<string, (value: unknown) => void>
) {
  const Comp = vxeUI.getComponent(compName as keyof VxeGlobalComponents)
  if (!Comp) return []
  const vnodeProps = ons ? { ...props, ...ons } : props
  return [h(Comp as Parameters<typeof h>[0], vnodeProps)]
}

/**
 * 注册自定义组件到 VxeUI，并在 edit-render 里通过 name 渲染：
 * 1. VxeUI.component(组件) — 供 getComponent(name) 解析
 * 2. VxeUI.renderer.mixin({ 组件名: { renderTableEdit, renderTableDefault } }) — 否则表格编辑格会为空
 *
 * 自定义组件需支持 v-model：props.modelValue + emit('update:modelValue')。
 * 使用示例：
 *   registerVxeEditComponent('MyInput', MyInputComponent)
 *   // 列配置：editRender: { name: 'MyInput', props: { placeholder: '请输入' } }
 */
export function registerVxeEditComponent(
  vxeUI: VxeUIExport,
  name: string,
  component: { name?: string }
) {
  vxeUI.component(component)
  vxeUI.renderer.mixin({
    [name]: {
      renderTableEdit(renderOpts: Record<string, unknown>, params: Record<string, unknown>) {
        const { row, column, cellValue } = getCellContext(params)
        const props = getCellProps(renderOpts, cellValue)
        const ons = getEditOns(renderOpts, params, row, column)
        return renderCell(vxeUI, name, props, ons)
      },
      renderTableDefault(renderOpts: Record<string, unknown>, params: Record<string, unknown>) {
        const { row, column, cellValue } = getCellContext(params)
        const props = getCellProps(renderOpts, cellValue)
        const ons = getEditOns(renderOpts, params, row, column)
        return renderCell(vxeUI, name, props, ons)
      },
    },
  } as unknown as Record<string, import('@vxe-ui/core').VxeGlobalRendererOptions>)
}

// 注册 components 下导出的所有自定义组件
export function setupVxeTableComponents(vxeUI: VxeUIExport) {
  Object.entries(tableComponents).forEach(([name, component]) => {
    if (component && typeof component === 'object') registerVxeEditComponent(vxeUI, name, component)
  })
}
