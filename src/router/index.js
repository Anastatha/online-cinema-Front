import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/user/:id',
    name: 'userPage',
    component: () => import('@/views/UserPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('@/views/GenrePage.vue')
  },
  {
    path: '/movie/:id',
    name: 'moviePage',
    component: () => import('@/views/MoviePage.vue')
  },
  {
    path: '/actor/:id',
    name: 'actorPage',
    component: () => import('@/views/ActorPage.vue')
  },
  {
    path: '/othet',
    name: 'othet',
    component: () => import('@/views/OthetPage.vue')
  },
  { path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
