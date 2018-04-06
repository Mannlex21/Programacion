import SERVER from "./config";

import Vue     from 'vue'
import App     from './app.vue'
import router  from './router'
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = SERVER.SERVER_CLIENT_ADDRESS
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)
/**@description Instancia principal de nuestra aplicación */
new Vue({
    el: '#app-root',
    router,
    store,
    SERVER,
    render : h=>h(App)
});
Vue.config.devtools = true;