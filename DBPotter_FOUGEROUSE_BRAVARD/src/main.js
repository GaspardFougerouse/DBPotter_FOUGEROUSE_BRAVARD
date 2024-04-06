import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routeur from './router/index.js'

const app = createApp(App);
app.use(routeur);
app.mount('#app');
