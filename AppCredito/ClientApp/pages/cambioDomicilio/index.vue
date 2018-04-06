<template>
  <div>
    <v-tabs right v-model="active" color="white" light slider-color="black">
      <v-tab v-if="permisoPreAsignacion">Bitacora Cambios</v-tab>
      <v-tab v-if="permisoAsignacion">Asignación</v-tab>      
      <v-tab-item v-if="permisoPreAsignacion">
        <vBitacora />
      </v-tab-item>
      <v-tab-item v-if="permisoAsignacion">
        <vAsignar />
      </v-tab-item>
    </v-tabs>    
  </div>
</template>
<script>
    import vBitacora from "./bitCamDom"
    import vAsignar from "./asignar"
    import _ from "lodash"
    export default {
        components:{
            vBitacora,
            vAsignar
        },
        computed:{
            permisoPreAsignacion(){
                if(this.$store.state.user)
                {                   
                    return _.find(this.$store.state.user.acciones,elem=>{
                        return elem.nombre=="BitCamDom-Obtener";
                    })!=null
                }
                return false;
            },
            permisoAsignacion(){
                if(this.$store.state.user)
                {
                    return _.find(this.$store.state.user.acciones,elem=>{
                        return elem.nombre=="Asignacion-Agregar";
                    })!=null
                }
                return false;
            }
        },
        data () {
            return {
                active: null                
            }
        }       
    }
</script>