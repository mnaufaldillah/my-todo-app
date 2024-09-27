import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './routers'
import VueSweetalert2 from 'vue-sweetalert2'

const app = createApp(App);

app.use(router)

app.use(VueSweetalert2);

app.mount('#app')
