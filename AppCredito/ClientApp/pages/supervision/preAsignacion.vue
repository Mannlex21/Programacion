<template>
    <v-bottom-sheet persistent v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">    
        <v-card>
            <v-toolbar dark color="primary" dense>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon @click.native="dialog = false" dark>
                        <v-icon>backspace</v-icon>
                    </v-btn>
                    <span>Regresar</span>
                </v-tooltip>
                <v-toolbar-title>Asignar Supervisor</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="supervisar()">
                        <v-icon>save</v-icon>
                        Guardar</v-btn>
                </v-toolbar-items>
            </v-toolbar>            
            <v-container fluid class="elevation-2">
                <v-layout row>
                    <v-flex xs8>
                        <h1>Información de registro</h1>
                    </v-flex>
                    <v-flex xs4>
                        <h1>Resultado Supervisor</h1>                
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs8>                
                        <table v-if="clienteCambio!=null">
                            <tr  v-for="(item,key) in clienteCambio" :key="key">
                                <td><h3>{{key|camelCaseToWords}}:</h3></td>
                                <td>{{item}}</td>                                
                            </tr>
                        </table>         
                    </v-flex>
                    <v-flex xs4>                        
                        <v-select :items="resultados" label="Resultado" hint="Resultado de la operación"  v-model="resultado" />
                        <v-text-field multi-line label="Comentarios" hint="Comentarios" v-model="comentario"/>
                    </v-flex>            
                </v-layout>         
            </v-container>            
            <v-divider></v-divider>
        </v-card>
    </v-bottom-sheet>    
</template>

<script>
import Agentes from "../../api/CAgentes"
import store from "./store";
import BitCam from "../../api/CBitCam"
import _     from 'lodash'
export default {        
    computed:{
        comentario:
        {
            get(){
                return store.state.comentario
            },
            set(value)
            {
                store.commit("changecomentario",value)
            }
        },
        resultado:
        {
            get(){
                return store.state.resultado
            },
            set(value)
            {
                store.commit("changeresultado",value)
            }
        },
        clienteCambio(){
            return store.state.clienteCambio
        },
        dialog:{
            get(){
                return store.state.dialog
            },
            set(value){
                store.commit("close");
            }
        },

    },
    filters:{
        /**
         * @description Separa la cadena en mayusculas para su entendimiento
         * @param {String} cadena 
         */
        camelCaseToWords(cadena)
        {
            return  cadena.replace(/([A-Z])/g, ' $1')    
            .replace(/^./, function(str){ return str.toUpperCase(); })
        },
    },
    methods:{       
        supervisar(){     
            
            let idPorPreasignar=store.state.idPorPreasignar;            
           
            BitCam.registrarValidacion(idPorPreasignar,this.comentario,(this.resultado?1:0)).then(res=>{
                store.commit("cambio");
                store.commit("close");
                this.$store.commit("showSnack",{
                    text:"Exito al guardar",
                    color:"success"
                });
            }).catch(error=>{
                this.loading=false;
                this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
            });       
        }        
    },
    
    data(){
        return{             
            resultados:['Positivo','Negativo'],            
        }
    }
}
</script>
