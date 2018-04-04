<template>
  <v-container class="" fluid grid-list-md>
      <v-layout row wrap>
          <v-flex v-for="nota in notas" :key="nota['.key']"  d-flex xs12 sm6 md2>
              <v-card v-bind:class="nota.color_fondo" dark>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="editarNota(nota['.key'])" v-bind:class="nota.color_fondo">
                  <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-btn icon @click.stop="borrarNota(nota['.key'])" v-bind:class="nota.color_fondo">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-title  primary class="title">{{nota.titulo}}</v-card-title>
              <v-card-text>
                <p>{{nota.descripcion}}</p>
              </v-card-text>
              </v-card>
          </v-flex>

      </v-layout>
      <v-dialog v-model="dialog" md12>
      <v-form id="form" class="form-inline" v-on:submit.prevent="modificarNota">
        <v-card>
          <v-card-text>
            <v-text-field id="titulo"
              label="Titulo"
              v-model="edicionNota.titulo"
              class="form-control"
              required
            ></v-text-field>
            <v-text-field id="descripcion"
              label="Descripcion"
              v-model="edicionNota.descripcion"
              multi-line
              required
            ></v-text-field>
            <v-select
              :items="colores"
              v-model="edicionNota.color_fondo"
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
  </v-container>
</template>
<script src=@"/javascripts/notas.js" type="text/javascript" scoped></script>
<script>
import {db} from '../javascripts/firebaseConfig'

export default {
  firebase: {
    notas: {
      source: db.ref('notas'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  data: function () {
    return {
      edicionNota: {
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
      elementKey: '',
      dialog: false
    }
  },
  methods: {
    borrarNota: function (id) {
      db.ref('notas/' + id + '/').remove()
    },
    editarNota: function (id) {
      this.elementKey = id
      var edicionNota = this.edicionNota
      db.ref('notas/' + id + '/').once('value').then(function (snapshot) {
        edicionNota.titulo = snapshot.val().titulo
        edicionNota.descripcion = snapshot.val().descripcion
        edicionNota.color_fondo = snapshot.val().color_fondo
      })
      this.dialog = true
    },
    modificarNota: function (id) {
      var n = {
        titulo: this.edicionNota.titulo,
        descripcion: this.edicionNota.descripcion,
        color_fondo: this.edicionNota.color_fondo
      }
      db.ref('notas/' + this.elementKey + '/').update(n)
      this.dialog = false
      this.editarNota.titulo = ''
      this.editarNota.descripcion = ''
      this.editarNota.color_fondo = null
    }
  },
  mounted: function () {
  }
}
</script>
<style lang="scss" scoped>
  @import '../css/notas.css';
  @import url('https://fonts.googleapis.com/css?family=Patua+One');
</style>