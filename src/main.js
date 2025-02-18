import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
 
import App from './App.vue'
import router from './router'
import store from './store'; // Импорт хранилища

// Vuetify
import 'vuetify/styles'
 
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
 
const vuetify = createVuetify({
    components,
    directives,
  })
 
// import './style.css'
import 'vuetify/dist/vuetify.min.css'
 
const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')