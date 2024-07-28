import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Articles from '../components/Articles.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About },
  { path: '/articles', component: Articles },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router