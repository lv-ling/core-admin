import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/theme.css'
import 'virtual:uno.css'
import router from '@/router'
import '@/styles/index.css'
import App from './App.vue'
import { applyStoredTheme } from '@/stores/theme'
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  themeQuartz,
} from 'ag-grid-community'
import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'

ModuleRegistry.registerModules([AllCommunityModule])
provideGlobalGridOptions({
  theme: themeQuartz,
  localeText: AG_GRID_LOCALE_CN,
})

applyStoredTheme()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
