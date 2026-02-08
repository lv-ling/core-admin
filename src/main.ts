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
import { setupAgGrid, setupHandsontable, setupVxeTable } from '@/plugins'

applyStoredTheme()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
setupVxeTable(app)
setupHandsontable(app)
setupAgGrid(app)
app.mount('#app')
