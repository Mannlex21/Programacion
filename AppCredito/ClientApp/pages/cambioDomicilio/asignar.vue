<template>
    <div>
    <v-data-table
        rows-per-page-text="Renglones por pagina:"
        :loading="loading"
        :headers="headers"
        :items="itemsFiltrados"
        :pagination.sync="pagination"
        class="elevation-1">
        <template slot="headers" slot-scope="headers">                    
            <tr class="vGridView-Headers">
                <th v-for="(item,index) in headers.headers" :key="index">
                    <div v-if="item.sortable!=false" @click="toggleOrder(item.value)">
                        <v-tooltip bottom >
                            <span slot="activator">{{item.text}}
                                <v-icon color="black">{{getPagination(item.value)}}</v-icon>                                    
                            </span>
                            <span>{{item.text}}</span>                            
                        </v-tooltip>
                    </div>
                    <div v-else>
                        <span>{{item.text}}</span>
                    </div>
                    <v-filter 
                    v-if="item.filter" 
                    :items="filter(item.value)" 
                    :name="item.value" 
                    @onChange="applyFilter"                        
                    type="checkbox"/>
                    
                </th>
            </tr>   
                                                    
        </template>
        <template slot="items" slot-scope="props">
            <tr >
                <td class="text-xs-center pa-0">
                    <v-avatar style="cursor:pointer;"  :size="12" @click="openModalCancelacion(props.item)" >
                        <v-icon color="error">delete_forever</v-icon>
                    </v-avatar>
                </td>                    
                <td class="text-xs-right">{{ props.item.Sucursal }}</td>
                <td class="text-xs-right">{{ props.item.Cliente }}</td>
                <td class="text-xs-right">{{ props.item.Nombre }}</td>
                <td class="text-xs-right">{{ fechaFormat(props.item.FechaPreasignado) }}</td>
                <td class="text-xs-right">{{ props.item.Agente }}</td>
                
                <td class="text-xs-right">{{ props.item.Estado }}</td>
                <td class="text-xs-center">
                    <v-tooltip bottom> 
                        <span slot="activator">
                        <v-avatar                            
                        :tile="false"
                        :size="16"
                        :class="semaforo(props.item.Dias)">                                
                        </v-avatar>
                        </span>
                        <span>
                            {{semaforoMensage(props.item.Dias)}}
                        </span>
                    </v-tooltip>                   
                </td>
            </tr>
        </template>
        <template slot="no-data">
            <v-alert outline color="info" icon="info" :value="true">
                Sin información para mostrar
            </v-alert>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
                inicio {{ pageStart }} a  {{ pageStop }} de {{itemsLength}}
            <v-btn small icon color="black" dark @click.native="buscar">
                <v-icon>cached</v-icon>
            </v-btn>
            <v-btn small color="primary" dark @click.native="exportarCSV">
                <v-icon>get_app</v-icon>Exportar
            </v-btn>
            <v-btn small color="green" dark @click.native="asignar">
                <v-icon>assignment_turned_in</v-icon>Asignar
            </v-btn>
        </template>
    </v-data-table>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">        
        <v-card>
        <v-card-title class="headline">Cancelar</v-card-title>
        <v-card-text>¿Cancelar solicitud de cambio de domicilio?</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>            
            <v-btn color="darken-5" @click.native="dialog = false">Cancelar</v-btn>
            <v-btn color="error" @click.native="cancelarAsignacion()" :disabled="loading">Aceptar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    </v-layout>
    </div>
</template>

<script>
import _ from 'lodash'
import store from "./store"
import {mixin} from "../generalmixin"
import BitCam from "../../api/CBitCam"
import vFilter  from '../../components/vueGridView/vueFilters.vue' 



export default {
    components:{
        'v-filter':vFilter
    },
    mixins:[mixin], 
    data(){
        return{
            itemCancelacion:null,
            headers: [                
                { text: 'Cancelar' ,sortable: false,notExport:true},
                { text: 'Sucursal', value: 'Sucursal',filter:"Sucursal" },
                { text: 'Cuenta', value: 'Cliente' },
                { text: 'Nombre', value: 'Nombre' },
                { text: 'Fecha de Pre Asignacion', value: 'FechaPreasignado' },
                { text: 'Agente', value: 'Agente' ,filter:true },
                { text: 'Estado', value: 'Estado',filter:"Estado" },
                { text: 'Estatus', value: 'Dias' }
                ],
        }
    },
    computed:{                      
        /** @description*/
        cambios(){
            return store.state.cambios;
        }        
    },  
    methods:{
        asignar(){            
            let asignaciones=new Array();
            _.forEach(this.itemsFiltrados,node=>asignaciones.push(node.IdBitacoraCambioDomicilio))
            this.loading=true;
            
            BitCam.asignacion(asignaciones).then(res=>{
                this.loading=false;
                store.commit("cambio");
                this.$store.commit("showSnack",{
                    text:"Cuentas asignadas",
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
        buscar(){            
            this.loading=true;
            BitCam.obtenerCuentasPreAsignadas().then(res=>{
                _.forEach(res.data, n=>n.Dias=this.diffDias(n.FechaPreasignado));
                this.items=res.data;
                this.loading=false;
            }).catch(error=>{
                    this.loading=false;
                    this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
                });
        },
        openModalCancelacion(item){
            this.dialog=true;
            this.itemCancelacion=item                
        },   
        cancelarAsignacion()
        {            
            this.loading=true;
            BitCam.cancelarAsignacion(this.itemCancelacion.IdBitacoraCambioDomicilio).then(res=>{
                store.commit("cambio");    
                this.$store.commit("showSnack",{
                    text:"Cancelación exitosa",
                    color:"success"
                });
                this.loading=false;
                this.dialog = false;           
            }).catch(error=>{
                this.loading=false;
                this.$store.commit("showSnack",{
                    text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                    color:"error"
                });
                this.dialog = false;
            });
        }        
    },    
    created(){
        this.buscar();
    }
}
</script>

<style scoped>
.vGridView-Filters{
    border-bottom:1px solid gray;
    background-color: rgba(0,0,0,0.1);
  }
    .vGridView-Headers *, .vGridView-SubHeaders *{
        margin: 0px !important;
    }
    .vGridView-Headers th, .vGridView-SubHeaders th{
        border: 1px solid lightgray;
        padding: 0px!important;
    }
    table.table tbody td, table.table tbody th {
        height: auto!important; 
        padding-bottom: 4px; 
        padding-top: 2px; 
        margin: 0px !important;
    }
    
</style>
