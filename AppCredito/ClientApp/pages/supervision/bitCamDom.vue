<template>
    <v-container fluid>                      
        <v-layout row >
            <v-flex xs12 class="mt-2">                
                <v-data-table
                :custom-sort="sortData"
                :loading="loading"
                dense
                rows-per-page-text="Renglones por pagina:"
                :headers="headers"
                :items="itemsFiltrados"
                :pagination.sync="pagination"
                
                class="elevation-5">
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
                            <v-filter 
                            v-else-if="item.filter" 
                            :items="filter(item.value)" 
                            :name="item.value"  
                            @onChange="applyFilter"                       
                            type="checkbox"/> 
                        </th>
                    </tr>   
                                                            
                </template>
                <template slot="items" slot-scope="props">
                   <tr >
                        <td class="text-xs-center">
                             <v-tooltip bottom>
                                <v-btn slot="activator" icon small  class="ma-0 pa-0" @click="preAsignarRegistro(props.item)">
                                    <v-icon color="grey darken-1">assignment_ind</v-icon>
                                </v-btn>
                                <span>Supervisar</span>
                            </v-tooltip>
                        </td>                    
                        <td class="text-xs-right">{{ props.item.Sucursal }}</td>
                        <td class="text-xs-center">{{ props.item.Cliente }}</td>
                        <td class="text-xs-center">{{ props.item.Nombre }}</td>
                        <td class="text-xs-center">{{ fechaFormat(props.item.FechaAsignacion) }}</td>
                        
                        <td class="text-xs-center">{{props.item.AsignadoA }}</td>
                        
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
                                    {{semaforoMensage(props.item.Dias,"supervición")}}
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
                    <v-btn @click.native="exportarCSV" small color="primary" dark>
                        <v-icon>get_app</v-icon>Exportar
                    </v-btn>
                </template>
        
                </v-data-table>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <pre-asignar />                
            </v-flex>

        </v-layout>
       
    </v-container>
</template>

<script>   
    import _     from 'lodash'
    import moment from 'moment'
    import {mixin} from "../generalmixin"
    import store from "./store"    
    import BitCam from "../../api/CBitCam"
    import preAsignar from './preAsignacion'
    import Sucursal from "../../api/CSucursal"
    import vGrid  from '../../components/vueGridView/viewComponent.vue' 
    

    export default {
        components:{'v-grid-table':vGrid,'pre-asignar':preAsignar},
        mixins:[mixin], 
        data () {
            return {                
                pagination:{sortBy:"FechaAsignacion"},
                search:null,
                menuInicio: false,
                menuFin: false,
                headers: [
                { text: 'Asignar Supervisor',align: 'center',sortable: false},
                { text: 'Sucursal', value: 'Sucursal',filter:true },
                { text: 'Cuenta', value: 'Cliente',filter:true  },
                { text: 'Nombre', value: 'Nombre' },
                { text: 'Fecha Asignacion', value: 'FechaAsignacion' },
                { text: 'Asignado a', value: 'AsignadoA' },
                { text: 'Estado', value: 'Estado',filter:true },                
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
        created(){
           this.buscar();
        },       
        watch:{            
            search(value){
                this.buscar();
            }
        },
        methods: {                       
            preAsignarRegistro(item)
            {                
                if(this.loading)
                    return;
                this.loading=true;
                BitCam.obtenerRegistroCliente(item.IdBitacoraCambioDomicilio).
                then(res=>{
                    this.loading=false;                    
                    store.commit("open",{idPorPreasignar:item.IdBitacoraCambioDomicilio,clienteCambio:res.data})                    
                }).catch(error=>{
                    this.loading=false;
                    this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
                });
            },
            
            buscar () {                                
                this.loading=true;
                BitCam.obtenerAsignadas((this.search!=""?this.search:null))
                .then(
                    res=>
                    {
                        _.forEach(res.data, n=>n.Dias=this.diffDias(n.FechaAsignacion));
                        this.items=res.data                        
                        this.loading=false;
                    }
                ).catch(error=>{
                    this.loading=false;
                    this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
                });
            }
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
