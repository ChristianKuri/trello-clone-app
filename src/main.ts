import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Icons
import FontAwesomePlugin from './plugins/fontawesome'

// Styles
import './assets/main.css'

// Components
import Board from './components/Board.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(FontAwesomePlugin)
  .component('Board', Board)
  .mount('#app')
