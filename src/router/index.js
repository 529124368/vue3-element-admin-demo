import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
