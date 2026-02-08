import type { App } from 'vue'
import VxeUI from 'vxe-pc-ui'
import type { VxeUIExport } from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeTable from 'vxe-table'
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
import '@vxe-ui/plugin-render-element/dist/style.css'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import { setupVxeTableComponents } from './register-vxe-compoent'

/**
 * 注册 VxeTable（含 VxeUI、Element 插件），需在 app.use(VxeTable) 前调用
 * 1. VxeUI.use(VxeUIPluginRenderElement) — 注册 Element 插件
 * 2. VxeTable.use(VxeTablePluginElement) — 注册 Element 插件 若无需表单使用el组件 可采用此方法只注册给table
 * 3. VxeUI.component(组件) — 供 getComponent(name) 解析
 * 4. VxeUI.renderer.mixin({ 组件名: { renderTableEdit, renderTableDefault } }) — 否则表格编辑格会为空
 *
 * 单独给table注册el组件
 * import VxeTablePluginElement from 'vxe-table-plugin-element'
 * VxeTable.use(VxeTablePluginElement)
 * 自定义组件需支持 v-model：props.modelValue + emit('update:modelValue')。
 * 使用示例：
 *   registerVxeEditComponent('MyInput', MyInputComponent)
 */

/** 注册 VxeTable（含 VxeUI、Element 插件），需在 app.use(VxeTable) 前调用 */
export function setupVxeTable(app: App) {
  VxeUI.use(VxeUIPluginRenderElement)
  setupVxeTableComponents(VxeUI as unknown as VxeUIExport)
  app.use(VxeUI)
  app.use(VxeTable)
}
