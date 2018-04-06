<template>
  <div>
    <v-data-table
        v-resize="onResize"
        v-bind:headers="headersAvailables"
        :items="rows"
        class="elevation-1 vGridView"
      >
      <template slot="headers" slot-scope="data" >
        <tr class="vGridView-Setting">
          <td colspan="100%">
            <v-toolbar dark flat >
              <v-toolbar-title>{{Title}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon small @click="reloadData" >
                <v-icon >autorenew</v-icon>
              </v-btn>
              <v-btn icon small
                @click="showFilters = !showFilters">
                <v-icon :color="(showFilters)?'blue':'white'" >filter_list</v-icon>
              </v-btn>
              <v-menu 
                transition="slide-y-transition"
                :close-on-click="false"
                :close-on-content-click="false"
                v-model="menuColumnSettingVisible"

                >
                <v-btn icon small slot="activator">
                  <v-icon :color="(hasColumnHide)?'blue':'white'" >view_column</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="(item, index) in headers" :key="item.index" 
                    @click="onToggleColumnVisibility( item, index )" >
                    <v-list-tile-action>
                      <v-icon v-if="item.hidden != null && item.hidden.indexOf(dimension) != -1 ">lock_outline </v-icon>
                      <v-icon v-else-if="item.visibility != false ">check_box </v-icon>
                      <v-icon v-else>check_box_outline_blank</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                          {{item.text}}
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <button class="menu-close" @click="onCloseColumnSetting" >
                  <v-icon >close</v-icon>
                </button>
              </v-menu>
            </v-toolbar>
          </td>
        </tr>
        <tr v-if="hasGroupHeaders" class="vGridView-SubHeaders">
          <th
            v-for="(itemGoupHeader, indexGropHeader) in groupHeader" :key="indexGropHeader"
            :style="'width: '+ itemGoupHeader.width +' ;'" 
            v-if="itemGoupHeader.parent"
            :colspan="itemGoupHeader.columns" >
            <v-tooltip bottom>
              <span slot="activator">
                  <v-btn small outline color="white" >
                    <span style="color: black; font-weight: 700;"> {{ itemGoupHeader.text }} </span>
                    <v-icon >arrow_downward</v-icon>
                  </v-btn>
              </span>
              <span>
                {{ itemGoupHeader.description }}
              </span>
            </v-tooltip>
          </th>
        </tr>
        <tr class="vGridView-Headers">
          <th  v-if="preAssing">Pre Asignar</th>
          <th
            v-for="(itemHeader, indexHeader) in data.headers" :key="indexHeader"
            :style="'width: '+ itemHeader.width +' ;'" >
            <v-tooltip bottom>
              <span slot="activator">
                  <v-btn small outline color="white" @click="onSortColumnClick( itemHeader )">
                    <span style="color: black; font-weight: 700;"> {{ itemHeader.text }} </span>
                    <v-icon color="black" v-if="isOrderByColumn(itemHeader)">arrow_upward</v-icon>
                    <v-icon color="black" v-else-if="isOrderByColumn(itemHeader) != null ">arrow_downward</v-icon>
                    <v-icon v-else >arrow_downward</v-icon>
                  </v-btn>
              </span>
              <span>
                {{ itemHeader.description }}
              </span>
            </v-tooltip>
          </th>
        </tr>
        <tr v-if="showFilters" class="vGridView-Filters">
          <th v-if="preAssing">-</th>
          <th v-for="(itemHeader, indexHeader) in data.headers" :key="indexHeader"  >
            <vFilters 
              v-if="itemHeader.filter != null " 
              :itemText="itemHeader.filter.text"
              :items="itemHeader.filter.items"
              :name="itemHeader.value"
              v-on:onChange="onFilterChange"
              :type="itemHeader.filter.type"
            />
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="data" >
        <tr>
          <td v-if="preAssing" class="text-xs-center">
              <v-avatar  :size="12" @click="preAssinged(data.item)">
                  <v-icon>assignment_ind</v-icon>
              </v-avatar>
          </td>
          <td v-for="(column, index) in headersAvailables"  :key="'vDataCell_' + index " 
            @click="rowClicked(data.item)" :class="(column.value=='estatus'?'text-xs-center':'')" >              
              <template v-if="column.value=='estatus'">                                      
                   <v-avatar   :size="12">                       
                        <v-icon :color="estatusColors[data.item[column.value]]">{{data.item[column.value]}}</v-icon>
                    </v-avatar>   
              </template>    
              <template v-else>
                {{ data.item[column.value] }}
              </template>    
          </td>          
        </tr>
      </template>
      <template slot="footer">
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import vFilters  from './vueFilters.vue'
  export default {
      components:{
          'vFilters' : vFilters
      },
      props: {
          preAssing:{
              type:Boolean,default:false
          },
          /* Nombre que se le dara al componente para ser buscado por el padre posteriomente */          
          name : { type:String, default: "vueGridView" } , 

          /* Id del elemento */
          Id:  { type:Number, default: -1 },

          /* Titulo de la tabla */
          Title:  { type:String, default: "" },

          /* Indica los elementos o los datos que muetra la trabla 
          este puede tener valor valores, desde una funcion donde manda a llamar al servidor para obtener los datos*/
          DataSource: { type:Array , default:[] },

          /* Contiene la configuracion de las columnas que mostrara la tabla, si no esta especificado estas se generan automanticamente  */
          Columns: { type:Array , default:null }, 
          
          /** @description inidica si el componente obtiene sus propios filtros inspeccionando la lista de datos,
           * esta propieda no se debe aplicar cuando los datos se obtienen desde el servidor
           */
          AutoFilters : { type:Boolean , default:true }
      }, 
      computed:{
        hasGroupHeaders(){
          var total_columns = this.headers.length;
          for( var i = 0; i < total_columns ; i++ ){
            if( this.headers[i].parent ){
              return true;
            }
          }
          return false;
        },
        hasColumnHide(){
          var total_columns = this.headers.length;
          for( var i = 0; i < total_columns ; i++ ){
            if( this.headers[i].visibility == false ){
              return true;
            }
          }
          return false;
        },
        headersAvailables(){
          var tmp_headers = [];
          for( var i = 0 ; i < this.headers.length ; i++ ){
            if( this.headers[i].visibility == false){
              continue;
            }

            if( this.headers[i].hidden == null || this.headers[i].hidden.indexOf( this.dimension ) == -1 ){
              tmp_headers.push( this.headers[i] );
            }
          }
          return tmp_headers;
        },
        dimension(){
          if( this.size.width >= 1264 ){
            return "lg";
          }
          if( this.size.width >= 960 ){
            return "md";
          }
          if( this.size.width >= 600 ){
            return "sm";
          }
          return "xs";
        }   
      },
      watch: {
        DataSource(value){            
            this.getDataFromApi()
              .then(data => {
                this.rows = data.items
                this.totalRows = data.total
              })
            this.reload=!this.reload;            
        },
        pagination: {
          handler () {
            this.getDataFromApi()
              .then(data => {
                this.rows = data.items
                this.totalRows = data.total
              })
          },
          deep: true
        },
        reload(){            
          console.log(this.DataSource);
          if( typeof this.DataSource === "function" ){
            var order_by_str = "";
            for(var i = 0 ; i < this.columnsSorted.length ; i++ ){
              order_by_str += ", " + this.columnsSorted[i].column + " " + ( this.columnsSorted[i].value ? "ASC":"DESC");
            }
            this.DataSource( { inicio: this.inicio , cantidad: this.rowsByView , orderby : order_by_str.substr(1)  , filters : this.filters });
          }
          else if( Array.isArray( this.DataSource )){
            this.rows = this.DataSource.concat() ;
            for( var i = 0 ; i < this.rows.length ; i++ ){
              var remove_item = false;
              for( var j = 0 ; j < this.filters.length ; j++ ){
                var item_filter = this.filters[j];
                var item_cell = this.rows[i][ item_filter.column ];
                switch( item_filter.type ){
                  case 1:{
                    if( item_cell.indexOf( item_filter.values[0] ) == -1 ){
                      remove_item = true;
                      break;
                    }
                  }break;
                  case 2:{
                    if( item_filter.values.indexOf( item_cell ) == -1 ){
                      remove_item = true;
                      break;
                    }
                  }break;
                  case 3:{
                    if( item_filter.values[0] != item_cell ){
                      remove_item = true;
                      break;
                    }
                  }break;
                  default:{
                    if(  isNaN( item_filter.values[0] )){
                      break;
                    }
                    if( item_filter.operation == "Igual" && item_filter.values[0] != item_cell ){
                      remove_item = true;
                      break;
                    }
                    if( item_filter.operation == "Diferente" && item_filter.values[0] == item_cell ){
                      remove_item = true;
                      break;
                    }
                    if( item_filter.operation == "Menor" && item_filter.values[0] >= item_cell ){
                      remove_item = true;
                      break;
                    }
                    if( item_filter.operation == "Menor o igual" && item_filter.values[0] > item_cell ){
                      remove_item = true;
                      break;
                    }
                    if( item_filter.operation == "Mayor" && item_filter.values[0] <= item_cell ){
                      remove_item = true;
                      break;
                    }
                    if( item_filter.operation == "Mayor Igual" && item_filter.values[0] <= item_cell ){
                      remove_item = true;
                      break;
                    }
                    if(  isNaN( item_filter.values[1] )){
                      break;
                    }
                    if( item_filter.operation == "Rango" && ( item_cell < item_filter.values[0] || item_cell > item_filter.values[1] )){
                      remove_item = true;
                      break;
                    }
                  }break;
                }
              }

              if( remove_item ){
                  this.rows.splice(i, 1);
                  i--;
              } 
            }

            var temp_row = null;
            for( var i = 0 ;  i < this.rows.length - 1 ; i++ ){
              for(var j = i + 1 ; j < this.rows.length ; j++ ){
                 
                for( var k = 0 ;  k < this.columnsSorted.length ; k++ ){
                  var column_key = this.columnsSorted[k].column ;
                  var column_asc = this.columnsSorted[k].value ;
                  var vCelli = this.rows[i][ column_key ];
                  var vCellj = this.rows[j][ column_key ];
                  if( (column_asc && vCelli < vCellj )|| (!column_asc && vCelli > vCellj ) ){
                    temp_row = this.rows[i] ;
                    this.rows.splice(i, 1, this.rows[j] );
                    this.rows.splice(j, 1, temp_row );
                  }
                }
              }
            }
          }
        }
      }, 
      mounted () {
        this.getDataFromApi()
          .then(data => {
            this.rows = data.items
            this.totalRows = data.total
          })
      },
      created(){
        var sender = this;
        function CreateColumnHeader(configuracion){
          var header_item  = {};
          header_item.text        = configuracion.text;
          header_item.align       = configuracion.align;
          header_item.sortable    = false;
          header_item.value       = configuracion.value;
          header_item.description = configuracion.description;
          header_item.filter      = configuracion.filter;
          header_item.hidden      = configuracion.hidden;
          header_item.visibility  = configuracion.visibility;
          header_item.width       = "auto";

          if( header_item.text == null ){
            header_item.text = header_item.value;
          }
          if( header_item.value == null ){
            header_item.value = header_item.text;
          }
          if( header_item.description == null ){
            header_item.description = header_item.text;
          }
          if( header_item.filter == null && sender.AutoFilters ){
            header_item.filter = CreateFilterByColumn( header_item.value );
          }
          return header_item;
        }

        function CreateFilterByColumn( columnIndex ){
          var filter_item = {};
          var rows_values = [];
          var is_number = true;
          for( var i = 0 ; i < sender.rows.length ; i++ ){
              var row_value = sender.rows[i][ columnIndex ];
              // Compara todos los valores, si la bandera sobrevive indica que el campo o la columna es numerica
              if( is_number ){
                if(isNaN( parseFloat( row_value )) ){
                  is_number = false;
                }
              }
              // Si el valor de la columna no existe, lo agregamos como posible valor
              if( rows_values.indexOf( row_value ) == -1 ){
                rows_values.push( row_value );
              }
          }

          // Filtro numerico
          if( is_number ){
            return { type:"numero" , itemText: "" , items: null };
          }
          if( rows_values.length < 2 ){
            return null;
          }
          if( rows_values.length == 2 ){
            return { type:"radio" , itemText: null , items: rows_values };
          }
          // Si la cantidad de posibles valores es menor a 10 o esta sercas al 70% de los valores , activamos el filtro por opciones
          if( rows_values.length / sender.rows.length < 0.7 || rows_values.length < 10 ){
            return { type:"checkbox" , itemText: null , items: rows_values };
          }

          return { type:"input" , itemText: null , items: null };
        }

        if( Array.isArray( this.DataSource )){
        }

        if( this.headers == null ){
          var first_item = this.DataSource[0];
          this.headers = [];
          for( var property in first_item ){
            var header_item = CreateColumnHeader( { text: property , value: property , sortable: true , align: 'center' } );
            this.headers.push( header_item );
          }
          var total_columns = this.headers.length;
          for( var i = 0 ; i < total_columns ; i++ ){
            this.headers[i].width = (100 / total_columns ) + "%";
          }
        }
        this.groupHeader = [];
        for( var i = 0 ; i < total_columns ; i++ ){
          if( this.headers[i].group ){
            
          }
        }
      },
      data () {
        return {
          estatusColors:{assignment_turned_in:"green","assignment_returned":"orange","assignment_return":"yellow",assignment_late:"error"},
          /** @description Almacena las columnas que contiene la tabla, con toda y su configuracion */
          headers: this.Columns ,
          groupHeader:  [],
          /** @description Almacena las columnas que contiene la tabla, con toda y su configuracion */
          rows: this.DataSource ,
          /**@description Indica el total de elementos disponibles */
          totalRows : -1 ,
          /**@description almacena los filtros aplicados en la tabla */
          filters : [],
          /** @description indica el tipo de fuente que esta usando el sistema */
          source : null ,
          /** @description Inidica la vista que se esta visualizando en la tabla */
          indexView: -1,
          /** @description almacena las filas seleccionadas en la tabla */
          selectecRows: [],
          /** @description Indica la cantidad de elementos por vista */
          rowsByView: 5,
          inicio : -1 ,
          /** @description */
          loading: true,
          /** @description  */
          pagination: {},

          reload : false,
          columnsSorted : [],
          size: {
            width: 0,
            height: 0
          },
          menuColumnSettingVisible: false ,
          showFilters : false 
        }
      },
      methods:{
        preAssinged(item){
            this.$emit('preAssinged',item);
        },
        rowClicked(){

        },
        reloadData(){
          
        },
        onCloseColumnSetting(){
          this.menuColumnSettingVisible =  false ;
        },
        onToggleColumnVisibility( column , index ){
          this.headers[ index ].visibility = this.headers[ index ].visibility == false;
        },
        onResize () {
          this.size = { width: window.innerWidth, height: window.innerHeight }
        },
        getDataFromApi () {
          this.loading = true
          return new Promise((resolve, reject) => {
            const { sortBy, descending, page, rowsPerPage } = this.pagination
          });
        },
        isOrderByColumn( column ){
            for(var i = 0 ; i < this.columnsSorted.length ; i++ ){
              if( this.columnsSorted[i].column ==  column.value ){
                return this.columnsSorted[i].value;
              }
            }
            return null;
        },
        onSortColumnClick( column ){
            for(var i = 0 ; i < this.columnsSorted.length ; i++ ){
              if( this.columnsSorted[i].column ==  column.value ){
                if( this.columnsSorted[i].value ){
                  this.columnsSorted.splice(i, 1, { column : column.value , value: false });
                }
                else{
                  this.columnsSorted.splice(i, 1);
                }
                this.reload = !this.reload;
                return;
              }
            }
            this.columnsSorted.push({
               column : column.value , value: true 
            });
                this.reload = !this.reload;
        },
        onFilterChange( sender, columnName , filterType, values , operation ){
          var create_filter = true;
          for( var i = 0 ; i < this.filters.length ; i++ ){
            if( this.filters[i].column == columnName ){
              create_filter = false;
              if( values == null ){
                  this.filters.splice(i, 1);
                  break;
              }
              this.filters[i].values = values ;
              this.filters[i].operation = operation ;
              break;
            }
          }
          if( create_filter ){
            this.filters.push({ column: columnName , type:filterType,  values: values , operation: operation });
          }
          this.reload = !this.reload;
        }
      }
    }
</script>
<style>
  .column{
      padding: 0px !important;
  }
  .list__tile.list__tile--link{
    height: 28px !important;
  }
  .menu-close{
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 2px;
    padding: 2px;
  }
  .menu-close i{
    font-size: 20px
  }
  .vGridView th{
    padding: 2px !important;
    height: initial !important;
  }
  .vGridView td{
    padding: 2px !important;
    height: 40px !important;
  }
  .vGridView-Setting{
    height: 20px !important;
  }
  .vGridView-Setting .btn.btn--floating.btn--icon.btn--small{
    height: 20px !important;
    width: 20px !important;
  }
  .vGridView tr{
    height: initial !important;
  }
  .vGridView .toolbar__content{
    height: 40px !important;
  }
  .vGridView-Filters{
    border-bottom:1px solid gray;
    background-color: rgba(0,0,0,0.1);
  }
  .vGridView-Headers *, .vGridView-SubHeaders *{
    margin: 0px !important;
  }
  .vGridView-Headers th, .vGridView-SubHeaders th{
    border: 1px solid lightgray;
  }
</style>