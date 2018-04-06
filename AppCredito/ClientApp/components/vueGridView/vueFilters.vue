<template>
    <div class="block">        
        <span v-if="seleccionable">({{selectItemsLenght}})</span>
        <span v-else-if="type=='input'">
            <input             
            v-if="!seleccionable"
            v-model="txtSearch"
            class="vueFilter-Search"
            placeholder="Buscar" type="text"/>    
        </span>        
        
        <v-menu            
            v-if="type!='input'"
            :close-on-content-click="false"            
            v-model="drawer">
            <v-btn style="margin:0px;" small flat icon dense dark color="black" slot="activator">
                <v-icon style="font-size: 12px;">filter_list</v-icon>
            </v-btn>
            <v-card class="pa-1">
                <div>
                    <v-btn small flat icon dense dark color="black" @click.native="drawer=!drawer">
                        <v-icon style="font-size: 12px;">filter_list</v-icon>
                    </v-btn>
                </div>
                <div v-if="seleccionable"> 
                    <div>
                        <input 
                        v-model="txtSearch"
                        style="border-bottom: 1px solid black  !important;" 
                        class="mb-3" placeholder="Buscar" type="text"/>
                        <ul>                        
                            <li>
                                <label v-if="type=='checkbox'">
                                    <input ref="selectAll" type="checkbox"  v-model="selectAll" value="todos"/>
                                    (Seleccionar Todos)
                                </label>
                                <label v-else>
                                    <input  type="radio" v-model="selectItem" :value="null" />
                                    Sin filtros
                                </label>
                            </li>
                        </ul>
                    </div>                    
                    <div style="height:100px; overflow:auto;">
                        <ul>
                            <li v-for="(item,key) in searchItems" :key="item.id">
                                <label :data-id="key">                            
                                    <input v-if="type=='checkbox'" type="checkbox" 
                                    v-model="selectItems" 
                                    :value="item"/>
                                    <input v-else type="radio" v-model="selectItem" :value="item"/>
                                    {{ ((itemText == null )?(typeof item!=="String"?key:item):item[ itemText ]) }}                            
                                </label>
                            </li>
                        </ul>
                    </div>  
                </div>        
                <div v-if="type=='numero'">                   
                    <v-select
                        v-bind:items="filters"
                        v-model="filter"
                        label="Filtros"
                        single-line bottom></v-select>
                    <div>
                        <input 
                        placeholder="Filtro..."
                        class="mb-2"
                        style="border-bottom: 1px solid black  !important; display:block;"  v-model="rangoInicial"/>
                        
                        <input
                        v-if="filter=='Rango'" 
                        class="mb-2"
                        placeholder="Filtro..."
                        style="border-bottom: 1px solid black  !important;" v-model="rangoFinal"/>
                    </div>
                    <button @click="limpiar()">Limpiar</button>
                </div>
            </v-card>
        </v-menu>                
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    props:{
        /** @description  nombre del filtro o columna*/
        name : {
            type:String,
            default:null
        },

        itemText:{
            type:String,
            default:null
        },
        items:{
            type:[Array,Object],
            default:[]
        },
        /**@description input, checkbox,radio, numero() */
        type:{
            type:String,
            default:"input"
        }
    },
    data(){
        return {
            rangoInicial:null,
            rangoFinal:null,
            txtSearch:"",
            selectAll:true,            
            drawer:false,
            filter:null,
            selectItem:null,
            selectItems:[],
            filters:['Igual','Diferente','Menor','Menor o igual','Mayor','Mayor Igual','Rango']
        }
    },
    computed:{
        searchItems(){
            if(this.txtSearch!="")
            {
                console.log(this.items);
                let a=_.pickBy(this.items,(word,key) =>{                        
                        if(typeof word === 'object')
                        {
                            return String(key).toUpperCase().indexOf(this.txtSearch.toUpperCase()) != -1
                        }
                        else
                            return String((word[this.itemText]!=null?word[this.itemText]:word.text)).indexOf(this.txtSearch) != -1
                    }                                        
                );                
                console.log(a);
                return a; 
            }                
            return this.items
        },
        seleccionable(){
            return this.type=="checkbox" || this.type=="radio";
        },
        selectItemsLenght(){
            return this.selectItems.length
        }
    },
    methods:{
        
        /**@description Limpiamos las variables de filtro */
        limpiar(){
            this.filter="Igual"
            this.rangoInicial=null
            this.rangoFinal=null
        }
    },
    watch:{
        selectAll(value){
            let universoOriginal=null;
            if(typeof this.items === 'object')
                universoOriginal=_.values(this.items);
            else
                universoOriginal=this.items;
            
            if(value)
                this.selectItems=universoOriginal;            
            else
                this.selectItems=[];
        },
        txtSearch(value){
            if(this.type=='input')
                this.$emit("onChange",this, this.name , 1,[value],"like")
        },
        selectItems(value){
            let universoOriginal=null;
            
            if(typeof this.items === 'object')
                universoOriginal=_.values(this.items);
            else
                universoOriginal=this.items;

            if(value.length==universoOriginal.length)
            {
                this.selectAll=true;
                this.$refs.selectAll.indeterminate=false;
            }
            else if(this.selectItems.length>0 && this.selectItems.length!=this.items.length)
            {
                this.$refs.selectAll.indeterminate=true;
            }            
            else{
                this.$refs.selectAll.indeterminate=false;
                this.selectAll=(this.selectItems.length==this.items.length);
            }
                
            this.$emit("onChange", this ,  this.name, 2 , this.selectItems  ,"in");
        },
        selectItem(value){
            if(value != null ){
                this.$emit("onChange",this ,  this.name,3,[value],"=")
                return;
            }  
            this.$emit("onChange",this ,  this.name,3,null,"=")
        },

        filter(value){            
            this.$emit("onChange",this ,  this.name,4,[parseFloat(this.rangoInicial),parseFloat(this.rangoFinal)],this.filter)
        },
        rangoInicial(value){
            this.$emit("onChange",this ,  this.name,4,[parseFloat(this.rangoInicial),parseFloat(this.rangoFinal)],this.filter)
        },
        rangoFinal(value){
            this.$emit("onChange",this ,  this.name,4,[parseFloat(this.rangoInicial),parseFloat(this.rangoFinal)],this.filter)
        },
    }    
}
</script>
<style>
    .vueFilter-Search{
        border-bottom: 1px solid black  !important; 
        width:100%;
        margin-bottom: 8px;
    }
</style>
