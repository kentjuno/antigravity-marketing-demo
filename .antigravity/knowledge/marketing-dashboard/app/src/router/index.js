import { createRouter, createWebHistory } from 'vue-router'
import AssetsView from '../views/AssetsView.vue'
import SettingsView from '../views/SettingsView.vue'
import BrandView from '../views/BrandView.vue'
import ContentView from '../views/ContentView.vue'
import DocsView from '../views/DocsView.vue'

const routes = [
  {
    path: '/',
    name: 'assets',
    component: AssetsView
  },
  {
    path: '/content',
    name: 'content',
    component: ContentView
  },
  {
    path: '/assets',
    redirect: '/'
  },
  {
    path: '/brand',
    name: 'brand',
    component: BrandView
  },
  {
    path: '/docs/:slug(.*)?',
    name: 'docs',
    component: DocsView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
