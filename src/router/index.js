import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: 'blank' }, // Uses BlankLayout.vue
    // No meta.layout needed -> defaults to DefaultLayout
  },/*
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/views/PortfolioView.vue'),
    meta: { layout: 'portfolio' }, // Uses PortfolioLayout.vue
  },*/
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})