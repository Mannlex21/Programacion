<template>
    <v-container>
        <v-layout row justify-center>            
            <v-dialog v-model="dialogMessage" max-width="290">
                <v-card>
                <v-card-title class="headline">Seleccione un agente o indique que no aplica</v-card-title>            
                <v-card-actions>
                <v-spacer></v-spacer>                
                <v-btn color="green darken-1" flat="flat" @click.native="dialogMessage = false">Aceptar</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout row justify-center>   
            <v-bottom-sheet persistent v-model="dialog" fullscreen transition="dialog-bottom-transition" 
            :overlay="false">    
                <v-card>
                    <v-toolbar dark color="primary" dense>
                        <v-tooltip bottom>
                            <v-btn slot="activator" icon @click.native="dialog = false" dark>
                                <v-icon>backspace</v-icon>
                            </v-btn>
                            <span>Regresar</span>
                        </v-tooltip>
                        <v-toolbar-title>Pre asignar</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark flat @click.native="preAsignacion()"><v-icon>save</v-icon> Guardar</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>            
                    <v-container fluid class="elevation-2">
                        <v-layout row>
                            <v-flex xs8>
                                <h1>Información de registro</h1>
                            </v-flex>
                            <v-flex xs4>
                                <h1>Supervisor</h1>                
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
                                <v-checkbox :label="(noAplica==null?'Indeterminado':'No aplica')" v-model="noAplica" :indeterminate="noAplica==null"/>
                                <v-select label="Agente" item-text="Nombre" :items="supervisores" autocomplete v-model="supervisor" dense :filter="autoCompletadoSupervisor">
                                    <template slot="item" slot-scope="data">
                                        {{data.item.Agente}}-{{data.item.Nombre}}
                                    </template>
                                </v-select>
                            </v-flex>            
                        </v-layout>         
                    </v-container>            
                    <v-divider></v-divider>
                </v-card>
            </v-bottom-sheet> 
        </v-layout>
           
    </v-container>
</template>

<script>
import Agentes from "../../api/CAgentes"
import store from "./store";
import BitCam from "../../api/CBitCam"
import _     from 'lodash'
export default {    
    created(){                
        Agentes.obtener()
        .then(res=>{           
            this.supervisores=res.data;
        })
        .catch(error=>{
                    this.loading=false;
                    this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
                });
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
    computed:{
        noAplica:
        {
            get()
            {
                return store.state.noAplica
            },
            set(value)
            {
                store.commit("changenoAplica",value)
            }
        },
        supervisores:
        {
            get()
            {
                return store.state.supervisores
            },
            set(value)
            {
                store.commit("changesupervisores",value)
            }
        },
        supervisor:
        {
            get()
            {
                return store.state.supervisor
            },
            set(value)
            {
                store.commit("changesupervisor",value)
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
    watch:{
        noAplica(value)
        {
            if(value)
                this.supervisor=null;            
        },
        supervisor(value)
        {
            if(value!=null)
                this.noAplica=false;            
        }
    },
    methods:{       
        preAsignacion(){     
            
            let idPorPreasignar=store.state.idPorPreasignar;            
            if(this.supervisor==null && (this.noAplica==null||this.noAplica==false)||idPorPreasignar==null)
            {
                this.dialogMessage=true;
                return;
            }
                               
            BitCam.preAsignarAgente((this.supervisor==null?this.supervisor:this.supervisor.Agente),idPorPreasignar).then(res=>{
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
        },
        autoCompletadoSupervisor(item,queryText,itemText)
        {
            const hasValue = val => val != null ? val : ''   
            const nombre = hasValue(item.Nombre)
            const  agente = hasValue(item.Agente)
            const query = hasValue(queryText)
            return nombre.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1 ||            
              agente.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        }
    },
    
    data(){
        return{   
            loading:false    
            ,dialogMessage:false
        }
    }
}
</script>
