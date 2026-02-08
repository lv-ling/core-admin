import type { App } from 'vue'
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  themeQuartz,
} from 'ag-grid-community'
import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'
import { AgGridVue } from 'ag-grid-vue3'

ModuleRegistry.registerModules([AllCommunityModule])
provideGlobalGridOptions({
  theme: themeQuartz,
  localeText: AG_GRID_LOCALE_CN,
})

/** 注册 AG Grid（AgGridVue），在 main 中统一调用 */
export function setupAgGrid(app: App) {
  app.component('AgGridVue', AgGridVue)
}
