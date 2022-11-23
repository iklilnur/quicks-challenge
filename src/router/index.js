import { createRouter, createWebHashHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import Quicks from '../views/Quicks.vue'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children:[
      {
        path: "/",
        name: "Quicks",
        component: Quicks
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      
      console.log("to hash =", to)
      
    }
  }
})

export default router
