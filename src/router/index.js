import Vue from 'vue'
import VueRouter from 'vue-router'
// import AuthGuard from '@/auth-guard.js'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Admin from '@/components/Admin'
import AboutUs from '@/components/AboutUs'
import History from '@/components/History'
import _404 from '@/components/404'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/about', name: 'About', component: AboutUs },
  { path: '/history', name: 'History', component: History },
  { path: '*', name: '404', component: _404 },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router