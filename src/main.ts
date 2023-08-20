import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AdaptivePage from '@/pages/AdaptivePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'main', component: MainPage, path: '/interview2/' },
    { name: 'layout', component: AdaptivePage, path: '/interview2/layout/' }
  ]
})

createApp(App).use(router).mount('#app')
