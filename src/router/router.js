import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components//Home.vue'
import Items from '@/components/Items.vue'
import Categories from '@/components/Categories.vue'
import Orders from '@/components/Orders.vue'

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/categories',
    component: Categories,
  },
  {
    path: '/items',
    component: Items,
  },
  {
    path: '/orders',
    component: Orders,
  }
];
