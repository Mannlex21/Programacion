<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="cerrarSesion">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerrar Sesion</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="menuVisible"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="dialog = true" v-if="agregarNotaVisible">
        <v-icon>note_add</v-icon>
      </v-btn>
      
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form id="form" class="form-inline" v-on:submit.prevent="agregarNota">
        <v-card>
          <v-card-text>
            <v-text-field id="titulo"
              label="Titulo"
              v-model="nuevaNota.titulo"
              class="form-control"
              required
            ></v-text-field>
            <v-text-field id="descripcion"
              label="Descripcion"
              v-model="nuevaNota.descripcion"
              multi-line
              required
            ></v-text-field>
            <v-select
              :items="colores"
              v-model="nuevaNota.color_fondo"
              label="Select"
              class="input-group--focused"
              item-value="value"
              required
            ></v-select>
            
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat type="submit">Guardar</v-btn>
            <v-btn color="error" flat @click.stop="dialog=false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>
<script>
import firebase from 'firebase'
import {db} from './javascripts/firebaseConfig'
export default {
  firebase: {
    notas: {
      source: db.ref('notas'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  data () {
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
          { title: 'Notas', path: '/notas', icon: 'note' }
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
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    }
  },
  methods: {
    agregarNota: function () {
      var newPostKey = db.ref('notas').push().key
      var n = {
        titulo: this.nuevaNota.titulo,
        descripcion: this.nuevaNota.descripcion,
        color_fondo: this.nuevaNota.color_fondo
      }
      db.ref('notas/' + newPostKey + '/').set(n)
      this.dialog = false
      this.nuevaNota.titulo = ''
      this.nuevaNota.descripcion = ''
      this.nuevaNota.color_fondo = null
    },
    cerrarSesion: function () {
      var ro = this.$router
      firebase.auth().signOut().then(
        function () {
          console.log()
          ro.replace('/login')
        }
      ).catch(
        function (error) {
          // An error happened.
          alert(error)
        }
      )
    }
  },
  name: 'App'
}
</script>