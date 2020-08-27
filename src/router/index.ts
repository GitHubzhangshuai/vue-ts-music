import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const Recommend = (resolve: Function) => {
  import('../views/recommend/recommend.vue').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve: Function) => {
  import('../views/disc/disc.vue').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve: Function) => {
  import('views/singer/singer.vue').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve: Function) => {
  import('views/singer-detail/singer-detail.vue').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve: Function) => {
  import('views/rank/rank.vue').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve: Function) => {
  import('views/top-list/top-list.vue').then((module) => {
    resolve(module)
  })
}

const Search = (resolve: Function) => {
  import('views/search/search.vue').then((module) => {
    resolve(module)
  })
}

const UserCenter = (resolve: Function) => {
  import('views/user-center/user-center.vue').then((module) => {
    resolve(module)
  })
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [{
      path: ':id',
      component: Disc
    }]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [{
      path: ':id',
      name: 'SingerDetail',
      component: SingerDetail
    }]
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [{
      path: ':id',
      component: TopList
    }]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user',
    component: UserCenter
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
