import type { App } from 'vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/styles/handsontable.min.css'
import 'handsontable/styles/ht-theme-main.min.css'

registerAllModules()

/** 注册 Handsontable（HotTable），在 main 中统一调用 */
export function setupHandsontable(app: App) {
  app.component('HotTable', HotTable)
}
