// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Hello from './components/HelloWorld'
import About from './components/About'
import Notas from './components/Notas'
const Vuetify = require("vuetify");
Vue.use(VueRouter)
Vue.use(Vuetify)
const routes = [//define the root url of the application.
  { path: '/', component: Hello },
  { path: '/about', component: About },
  { path: '/notas', component: Notas }
]
Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})
//instatinat the vue instance
new Vue({
//define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the Vue instance
  router
}).$mount('#app')//mount the router on the app
/* eslint-disable no-new */
