import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Notas from '@/components/Notas'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HelloWorld, name: 'HelloWorld', meta: { requiresAuth: true } },
    { path: '/notas', component: Notas, name: 'Notas', meta: { requiresAuth: true } },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/signUp', component: SignUp, name: 'SignUp' },
    { path: '*', component: Login }
  ]
})
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('notas')
  else next()
})
export default router
