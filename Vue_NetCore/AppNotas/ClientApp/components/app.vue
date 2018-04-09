<template>
    <div id="app" class="container-fluid">
        <v-app id="inspire" light >
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      enable-resize-watcher
      app
      v-if="estaLoggeado"
    >
      <v-list >
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.path">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cerrar sesión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="estaLoggeado"></v-toolbar-side-icon>
      <v-toolbar-title>App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>note_add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
      
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
    </div>
</template>
<style scoped>
body{
    background: #333;
}
</style>

<script>
import Vue from 'vue'
// import CounterExample from './counter-example'
// import FetchData from './fetch-data'
import Notes from './notes'
import HomePage from './home-page'

// Vue.component('counter-example', CounterExample);
// Vue.component('fetch-data', FetchData);
Vue.component('home-page', HomePage);
Vue.component('notes', Notes);

export default {
    data() {
        return {
            nuevaNota: {
                titulo: '',
                descripcion: '',
                color_fondo: null
            },
            colores: [
                {text: 'Rojo', value: 'red'},
                {text: 'Negro', value: 'black'},
                {text: 'Amarillo', value: 'yellow'},
                {text: 'Naranja', value: 'orange'},
                {text: 'Verde', value: 'green'},
                {text: 'Cafe', value: 'brown'},
                {text: 'Gris', value: 'gray'}
            ],
            menuVisible: true,
            agregarNotaVisible: true,
            dialog: false,
            clipped: true,
            drawer: true,
            object: {},
            fixed: false,
            menuItems: [
                { title: 'Home', path: '/', icon: 'home' },
                { title: 'Notas', path: '/notes', icon: 'note' },
                { title: 'Login', path: '/login', icon: 'account_box' }
            ],
            items: [{
                icon: 'bubble_chart',
                title: 'Inspire'
            }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'AppNotas'
        }
    },
    computed:{
      estaLoggeado(){
        return this.$store.getters.isLoggedIn
      }
    },
    methods:{
      irDireccion: function(path){
      }
    }
}
</script>
