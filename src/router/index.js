import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/to',
    component: () => import('@/views/to/index.vue')
  },
  {
    path: '/from',
    component: () => import('@/views/from/index.vue')
  },
  {
    path: '/transactions',
    component: () => import('@/views/transactions/index.vue')
  },
  {
    path: '/token',
    component: () => import('@/views/token/index.vue')
  },
  {
    path: '/nft',
    component: () => import('@/views/nft/index.vue')
  },
  {
    path: '/tokenDetail',
    component: () => import('@/views/tokenDetail/index.vue')
  },
  {
    path: '/nftDetail',
    component: () => import('@/views/nftDetail/index.vue')
  },
  {
    path: '/vertifyContract',
    component: () => import('@/views/vertifyContract/index.vue')
  },
  {
    path: '/block',
    component: () => import('@/views/block/index.vue')
  },
  {
    path: '/addr',
    component: () => import('@/views/addr/index.vue')
  },
  {
    path: '/footer',
    component: () => import('@/components/footer/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router