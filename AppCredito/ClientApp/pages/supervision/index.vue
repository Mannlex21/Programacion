<template>
  <div>
    <v-tabs right v-model="active" color="white" light slider-color="black">
      <v-tab>Bitacora Cambios(Supervición)</v-tab>
      <v-tab>Bitacora De Resultados</v-tab>
      <v-tab></v-tab>
      <v-tab-item>
        <vBitacora/>
      </v-tab-item>
      <v-tab-item>
        <vAsignar/>
      </v-tab-item>
    </v-tabs>    
  </div>
</template>
<script>
    import vBitacora from "./bitCamDom"
    import vAsignar from "./asignar"
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
                        return elem.nombre=="BitResSuper-Obtener";
                    })!=null
                }
                return false;
            },
            permisoAsignacion(){
                if(this.$store.state.user)
                {
                    return _.find(this.$store.state.user.acciones,elem=>{
                        return elem.nombre=="ResSuper-Obtener";
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