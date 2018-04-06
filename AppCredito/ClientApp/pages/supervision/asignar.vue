<template>
    <v-container fluid>
        <v-layout row>            
            <v-flex xs12>
                <v-card class="ma-0">
                    <v-container>
                        <v-layout row>
                            <v-flex xs4 class="ma-1">
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
                            <v-flex xs4 class="ma-1">
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
                            <v-flex xs4>
                                <v-btn @click.native="buscar()">
                                    <v-icon>search</v-icon>
                                    Buscar
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>                
            </v-flex>              
        </v-layout>
        <v-layout row>
            <v-flex xs12>
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
                        <tr>                 
                            <td class="text-xs-right">{{props.item.Sucursal}}</td>
                            <td class="text-xs-right">{{props.item.Cliente}}</td>
                            <td class="text-xs-right">{{props.item.Nombre}}</td>
                            <td class="text-xs-right">{{fechaFormat(props.item.FechaSupervision)}}</td>
                            <td class="text-xs-right">{{(props.item.Supervision?'Positivo':'Negativo')}}</td>
                            <td class="text-xs-right">{{props.item.ValidadoPor}}</td>
                            <td class="text-xs-right">{{fechaFormat(props.item.FechaConsulta)}}</td>
                            <td class="text-xs-right">{{props.item.ConsultadoPor}}</td>
                            <td class="text-xs-right">{{props.item.Comentario}}</td>                         
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
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import _ from 'lodash'
import store from "./store"
import {mixin} from "../generalmixin"
import BitCam from "../../api/CBitCam"
import moment from "moment"

export default {    
    mixins:[mixin], 
    data(){
        return{                                    
            fechaFin:moment().format('YYYY-MM-DD'),
            fechaInicio:moment().subtract(7, 'days').format('YYYY-MM-DD'),
            menuInicio: false,
            menuFin: false,
            headers: [                
                { text: 'Sucursal', value: 'Sucursal',filter:"Sucursal" },
                { text: 'Cuenta', value: 'Cliente',filter:true },
                { text: 'Nombre Cliente', value: 'Nombre' },
                { text: 'Fecha de supervición', value: 'FechaSupervision' },                
                { text: 'Resultado de Supervisión', value: 'Supervision'},
                { text: 'Validacion', value: 'ValidadoPor' },
                { text: 'Fecha 1er consulta', value: 'FechaConsulta' },
                { text: '1er consulta', value: 'ConsultadoPor' },
                { text: 'Comentarios', value: 'Comentario' },
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
            BitCam.obtenerResultadosFinales(this.fechaFin,this.fechaInicio).then(res=>{
                _.forEach(res.data, n=>n.Dias=this.diffDias(n.FechaSupervision));
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
