import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import store from './store'

const app = createApp(App).use(store)

app.use(router)

app.mount('#app')
