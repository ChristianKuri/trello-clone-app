import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Icons
import FontAwesomePlugin from './plugins/fontawesome'

// Styles
import './assets/main.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(FontAwesomePlugin)
  .mount('#app')
