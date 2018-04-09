import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import '../css/icons_material.css'
import '../css/vuetify.min.css'
import '../css/site.css'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(Vuetify)
Vue.use(Vuex)

// TYPES
const MAIN_SET_COUNTER = 'MAIN_SET_COUNTER'

// STATE
const state = {
    isLoggedIn: !!localStorage.getItem('token'),
    pending:true,
    counter: 0
}
const getters= {
    isLoggedIn: state => {
      return state.isLoggedIn
     }
}
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
// MUTATIONS
const mutations = {
    [MAIN_SET_COUNTER](state, obj) {
        state.counter = obj.counter
    },
    [LOGIN] (state) {
        state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
        state.isLoggedIn = true;
        state.pending = false;
    },
    [LOGOUT](state) {
        state.isLoggedIn = false;
    },
    login(state,value)
    {
        state.isLoggedIn=true;
    },
    logout(state,value)
    {
        state.isLoggedIn=false;
    }
}

// ACTIONS
const actions = ({
    setCounter({ commit }, obj) {
        commit(MAIN_SET_COUNTER, obj)
    },
    login({ commit }) {
        
        localStorage.setItem("token", "JWT");
        commit(LOGIN_SUCCESS);
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(LOGOUT);
    }
})

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
