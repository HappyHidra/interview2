import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AdaptivePage from '@/pages/AdaptivePage.vue'

const routeInfos = [
  {
    path: '/interview2/',
    component: MainPage
  },
  {
    path: '/interview2/layout',
    component: AdaptivePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos
})

createApp(App).use(router).mount('#app')
