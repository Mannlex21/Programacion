import moment from 'moment'
import _ from "lodash"
import download from 'downloadjs'
import vFilter from "../components/vueGridView/vueFilters"

export const mixin={
    components:{
        'v-filter':vFilter
    },
    data(){
        return {
            dialog: false,
            filtroSucursal:[],
            filtros:[],            
            items: [],
            itemsFiltrados:[],
            pagination:{},
            loading:false,
        }
    },
    watch:{
        /**
         * @description Efectua la funcion de buscar
         */
        cambios(){
            this.buscar();
        },
        /**
         * @description Funcion que vigila los items por si cambian y refresca estos cambios en la vista y sin filtros
         * @param {Array} value 
         */
        items(value){
            this.itemsFiltrados=value
            this.filtros=[];
        }
    },
    methods:{
        /**
         * @description Separa la cadena en mayusculas para su entendimiento
         * @param {String} cadena 
         */
        camelCaseToWords(cadena)
        {
            return  cadena.replace(/([A-Z])/g, ' $1')    
            .replace(/^./, function(str){ return str.toUpperCase(); })
        },
        /**
         * @description exporta el contenido 
         */
        exportarCSV(){
            const items=this.itemsFiltrados;             
            let file="";
            _.forEach(this.headers,encabezado=>{
                if(encabezado.value!=null)
                    file+="\""+encabezado.text+"\","
            });
            file+="\n";

            _.forEach(items,renglon=>{                    
                _.forEach(this.headers,encabezado=>{
                    if(encabezado.value!=null)
                        file+="\""+renglon[encabezado.value]+"\","
                });
                file+="\n";                        
            });                
            download(file, "BitacoraCambios.csv", "text/plain");
        }, 
        /** 
         * @description Orderna los elementos segun los filtros aplicados y los asocia a los datos que el usaurio ve
        */
        filteredItems(){                            
            var filtros=this.filtros;            
            let result=_.filter(this.items, function(o) {                                         
                for(var index in filtros)
                {                        
                    if(!(filtros[index].length>0?filtros[index].indexOf(o[index])!=-1:true))
                        return false;
                }
                return true;                     
            });
            this.itemsFiltrados=result;
        },
        /**
         * @description Devuelve la diferencia en dias entre la fecha actual y la recibica
         * @param {string} fecha 
         * @returns {string}
         */
        diffDias(fecha){                
            let fecharegistro=moment(fecha)
            let hoy=moment();
            return hoy.diff(fecharegistro,'days')
        },
        /**
         * @description Devuelve la cadena a mostrar segun el valor enviado
         * @param {int} valor 
         */
        semaforoMensage(valor,mensaje=" asignacion"){
            if(valor>0)
                return valor +" Dias sin "+mensaje
            return "Cuenta Nueva"
        },
        /**
         * @description consigue el color de acuerdo a la cantidad de dias pasados
         * @param {int} valor 
         */
        semaforo(valor){
            if(Number(valor)>1)
                return "red"
            if(Number(valor)>0)
                return "yellow"
            return "green"
        },
        /**
         * 
         * @description retorna los elementos ordenados con la funcion de lodas
         * @param {String} items 
         * @param {String} index 
         * @param {String} isDescending 
         */
        sortData(items,index,isDescending){
            return _.orderBy(items, [index], [(isDescending?'desc':'asc')]);
        },    
        /**
         * @description retorna la cadena del icono que debe poner segun la paginación
         * @param {string} value 
         * @returns {string} 
         */
        getPagination(value){
            if(this.pagination.sortBy==value){                    
                return (this.pagination.descending?"arrow_upward":"arrow_downward");
            }
        },
        /**
         * 
         * @param {string} fecha Fecha
         * @returns {string} retorna una fecha formateada YYYY-MM-DD hh:mm A
         */
        fechaFormat(fecha)
        {
            return moment(fecha).format("YYYY-MM-DD hh:mm A")
        },
        /**
         * @description Indica por que columna se va a ordenar la tabla
         * @param {String} por 
         */
        toggleOrder(por){                
            if(this.pagination.sortBy==por)
            {
                this.pagination.descending = !this.pagination.descending
            }                    
            else
            {
                this.pagination.descending=null;
                this.pagination.sortBy=por;
            }                
        },
        filter(columnName)
        {
            return _.groupBy(this.items, columnName)
        },
        
        /**
         * @description escucha a los cambios de los filtros para aplicarlos en la vista
         * @param {Object} sender 
         * @param {String} columnName 
         * @param {string} filterType 
         * @param {string} values 
         * @param {string} operation 
         */
        applyFilter( sender, columnName , filterType, values , operation ){            
            this.filtros[columnName]=[]            
            _.forEach(values,element => {                                        
                this.filtros[columnName].push(element[0][columnName]);
            });
            this.filteredItems();
        },
    }
}