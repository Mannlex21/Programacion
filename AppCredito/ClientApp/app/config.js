import "babel-polyfill"
import Vue       from 'vue'
import VueRouter from 'vue-router'
import Vuex      from 'vuex'
import Vuetify   from 'vuetify'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuetify)

/**@description ver a que puerto se va a conectar la aplicacion */
const SERVER_CLIENT_PORT    = '804'
//http://172.16.214.64:45456 el bueno 619
/**@description ver a que dirección se va a conectar la aplicacion */
const SERVER_CLIENT_IP      = 'http://172.16.202.4'
/**@description prefijo api*/
const SERVER_API_PREFIX     = 'Api'
/**@description uniendo variables SERVER_CLIENT_IP SERVER_CLIENT_PORT*/
const SERVER_CLIENT_ADDRESS = `${SERVER_CLIENT_IP}:${SERVER_CLIENT_PORT}`
/**@description uniendo variables SERVER_CLIENT_ADDRESS SERVER_API_PREFIX*/
const SERVER_API_ADDRESS    = `${SERVER_CLIENT_ADDRESS}/${SERVER_API_PREFIX}`
const SERVER_CLAVE_APP    ='API_qtENV58y'

export default {
    SERVER: {
        SERVER_CLIENT_PORT,
        SERVER_CLIENT_IP,
        SERVER_CLIENT_ADDRESS,
        SERVER_API_ADDRESS,
        SERVER_CLAVE_APP
    }
}