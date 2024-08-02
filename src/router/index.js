import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Login from '../components/Login.vue'
import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Article from '../components/Article.vue'
import Articles from '../components/Articles.vue'



const routes = [
  { path: '/', component: HelloWorld },
  { path: '/Login', component: Login },
  { path: '/about', component: About },
  { path: '/articles', component: Articles },
  { path: '/articles/:id', component: Articles },
  { path: '/article/:id', component: Article },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // const token = router.app.$store.getters.getToken;
  const token = store.getters.getToken;
  if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router