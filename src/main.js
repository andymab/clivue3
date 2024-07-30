import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
 
// import hljs from 'highlight.js'; // это если собираемся использовать как компонент
// import VueHighlight from 'vue3-highlight';
// import 'highlight.js/styles/default.css'; // Import styles for highlight.js


import App from './App.vue'
import router from './router'
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
app.use(router)
app.use(vuetify)
//app.use(VueHighlight) как копоненту
app.mount('#app')
