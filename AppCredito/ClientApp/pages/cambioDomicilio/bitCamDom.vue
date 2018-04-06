<template>
    <v-container fluid>        
        <v-layout row>
            <v-flex>                
                <v-card>
                    <v-layout row>            
                        <v-flex xs4>                
                            <v-select     multiple label="Sucursales"
                            overflow
                            item-text="Nombre" item-value="Sucursal"
                            chips                            
                            :items="sucursalesMascara"  v-model="sucurlalesSeleccionadas"/>                            
                        </v-flex>
                        <v-flex xs1>
                            <v-tooltip bottom>
                                <v-checkbox v-model="opcSucursal" slot="activator"></v-checkbox>
                                <span>Todas las Sucursales</span>
                            </v-tooltip>
                        </v-flex>
                        <v-flex xs2>
                            <v-menu 
                            ref="menuInicio" lazy                            
                            v-model="menuInicio"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-right="40" min-width="290px"
                            >
                                <v-text-field slot="activator" label="Fecha Inicio" readonly
                                v-model="fechaInicio" prepend-icon="event"/>
                                <v-date-picker  locale="es-419" v-model="fechaInicio" :max="fechaFin" no-title scrollable/>
                            </v-menu>
                        </v-flex>
                        <v-flex xs2>
                            <v-menu
                            ref="menuFin" lazy                            
                            v-model="menuFin"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            >
                                <v-text-field
                                slot="activator" label="Fecha Final"
                                v-model="fechaFin" prepend-icon="event" readonly/>
                                <v-date-picker locale="es-419" v-model="fechaFin" :min="fechaInicio" no-title scrollable/>
                            </v-menu>
                        </v-flex>
                        <v-flex xs2 class="text-xs-right">
                            <v-btn small @click.native="buscar">
                                <v-icon>search</v-icon>
                                Buscar
                            </v-btn>
                        </v-flex>                         
                    </v-layout>    
                                        
                </v-card>                       
            </v-flex>
        </v-layout>
        
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
                   <tr :class="(props.item.Suspendido?'blue-grey lighten-4':'white')">
                        <td class="text-xs-center">                            
                            <v-tooltip right>
                                <v-btn :disabled="props.item.Suspendido" slot="activator" icon small  class="ma-0 pa-0" @click="preAsignarRegistro(props.item)">
                                    <v-icon color="grey darken-1">assignment_ind</v-icon>
                                </v-btn>
                                
                                <span v-if="props.item.Suspendido">Suspendido</span>
                                <span v-else>Pre Asignar</span>
                            </v-tooltip>
                        </td>                    
                        <td class="text-xs-right">{{ props.item.Sucursal }}</td>
                        <td class="text-xs-center">{{ props.item.Cliente }}</td>
                        <td class="text-xs-center">{{ props.item.Nombre }}</td>
                        <td class="text-xs-center">{{ fechaFormat(props.item.Fecharegistro) }}</td>                        
                        <td class="text-xs-right">{{ props.item.Estado }}</td>
                        <td class="text-xs-center">
                            <v-tooltip left> 
                                <span slot="activator">
                                <v-avatar                            
                                :tile="false"
                                :size="16"
                                :class="semaforo(props.item.Dias)">                                
                                </v-avatar>
                                </span>
                                <span>
                                    {{semaforoMensage(props.item.Dias,"pre asignación")}}
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
        <v-layout>
            <v-dialog v-model="dialogCuentasCongeladas">
                <v-toolbar color="blue darken-3" dark>        
                    <v-toolbar-title>Cuenta sin ruta <v-icon>warning</v-icon></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="dialogCuentasCongeladas = false"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card>
                    <v-card-title class="headline"></v-card-title>
                        <v-card-text>
                            {{messageCongeladas}}
                            <v-container fluid class="elevation-2" >
                                <v-layout row v-for="(prop,i) in infoCongeladas" :key="prop.id">
                                    <v-flex xs5 class="text-xs-right"><h3>{{camelCaseToWords(i)}}:</h3></v-flex>
                                    <v-flex xs7 class="text-xs-left">{{prop}}</v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>          
                        <v-btn color="green darken-1" flat="flat" @click.native="dialogCuentasCongeladas = false">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
    import vFilter  from '../../components/vueGridView/vueFilters.vue'
    import vGrid  from '../../components/vueGridView/viewComponent.vue' 
    

    export default {
        components:{'v-filter':vFilter,'v-grid-table':vGrid,'pre-asignar':preAsignar},
        mixins:[mixin], 
        data () {
            return {                
                fechaFin:moment().format('YYYY-MM-DD'),
                fechaInicio:moment().subtract(10, 'days').format('YYYY-MM-DD'),
                menuInicio: false,
                menuFin: false,
                pagination:{sortBy:"Fecharegistro"},
                headers: [
                { text: 'Pre Asignar',align: 'center',sortable: false},
                { text: 'Sucursal', value: 'Sucursal',filter:true },
                { text: 'Cuenta', value: 'Cliente',filter:true },
                { text: 'Nombre', value: 'Nombre' },
                { text: 'Fecha y Hora de registro', value: 'Fecharegistro' },
                { text: 'Estado', value: 'Estado',filter:true },                
                { text: 'Estatus', value: 'Dias' }
                ],
                messageCongeladas:"",
                infoCongeladas:{},
                dialogCuentasCongeladas:false,
                opcSucursal:true,              
                sucurlalesSeleccionadas: null,
                sucursales: []
                ,               
            }
        },
        computed:{
            sucursalesMascara(){
                let mascara=[];
                for(let i in this.sucursales)
                {
                    mascara.push(
                        {Nombre:"("+_.padStart(this.sucursales[i].Sucursal, 3,'0')+')-'+this.sucursales[i].Nombre,
                        Sucursal:this.sucursales[i].Sucursal})
                }
                return mascara;
            },
            /** @description*/
            cambios(){
                return store.state.cambios;
            }        
        },  
        created(){
            Sucursal.obtener().then(res=>{                
                this.sucursales=_.orderBy(res.data, ['Nombre'], ['asc',]);                
            }).catch(error=>{
                    this.loading=false;
                    this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
                });
        },       
        watch:{            
            opcSucursal(value){
                if(value)
                    this.sucurlalesSeleccionadas=[];
            },
            sucurlalesSeleccionadas(value){
                if(value.length>0)
                    this.opcSucursal=false;
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
                    item.Suspendido=true;
                    this.loading=false;
                    
                    this.dialogCuentasCongeladas=true;                    
                    this.messageCongeladas= error.response.data.message
                    this.infoCongeladas= error.response.data.datos
                });
                
            },
            
            buscar () {                  
                let sucursales="";
                if(this.sucurlalesSeleccionadas!=null)
                    sucursales=this.sucurlalesSeleccionadas.join(",")          
                this.loading=true;
                BitCam.obtenerSinAsignar((sucursales.length>0?sucursales:null),this.fechaInicio,this.fechaFin)
                .then(
                    res=>
                    {
                        _.forEach(res.data, n=>n.Dias=this.diffDias(n.Fecharegistro));
                        this.items=res.data                        
                        this.loading=false;                        
                    })
                .catch(error=>{
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
