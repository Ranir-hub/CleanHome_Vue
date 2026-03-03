import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components//Home.vue'
import Items from '@/components/Items.vue'
import Categories from '@/components/Categories.vue'

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
  }
];
