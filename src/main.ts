import '@/assets/index.css'

import { createApp } from 'vue'
import { plugin } from '@formkit/vue'
import config from '../formkit.config'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.use(plugin, config)

app.mount('#app')
