<template>
  <v-container class="" fluid grid-list-md>
         <v-layout row wrap>
             <v-flex v-for="value in [{titulo:'nota',descripcion:'Es un texto',idNota:1,color_fondo:'red'}]" :key="value.idNota" d-flex xs12 sm6 md2>
                 <v-card v-bind:class="value.color_fondo" dark>
                     <v-card-title  primary class="title">{{value.titulo}}</v-card-title>
                     <v-card-text>
                         <p>{{value.descripcion}}</p>
                     </v-card-text>
                 </v-card>
             </v-flex>

         </v-layout>
     </v-container>
</template>
<script src=@"/javascripts/notas.js" type="text/javascript" scop></script>
<script>
  export default {}
</script>
<style lang="scss" scoped>
  @import '../css/notas.css';
</style>