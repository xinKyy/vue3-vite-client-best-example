import { createApp } from 'vue'
import App from './App.vue'
import Web3 from 'web3'

import '../src/assets/styles/index.scss'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// element-plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/font/font.css'
import './assets/iconfont/iconfont.css'
const app = createApp(App)

app.use(router)
// 使用element-plus
app.use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
// 使用图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// #引入 & 使用pinia
import { createPinia } from 'pinia'
app.use(createPinia())

app.mount('#app')
