<template>
    <v-container fluid>
        <v-layout v-if="permisoCorreo">
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn color="primary" dark slot="activator" class="mb-2"><v-icon>add</v-icon> Agregar Correo</v-btn>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6>
                                <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
                            </v-flex>                
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.native="close"><v-icon>clear</v-icon>cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save"><v-icon>save</v-icon> Guardar</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout row v-if="permisoCorreo">            
            <v-flex xs12>
            <v-data-table :headers="headers" :items="items" 
            :rows-per-page-items="[5,10,25,{'text':'Todas','value':-1}]"
            rows-per-page-text="Filas por Pagina" class="elevation-1">
                <template slot="items" slot-scope="props">        
                    <td class="text-xs-center">{{ props.item.email }}</td>        
                    <td class="justify-center layout px-0">
                        <v-btn icon small flat outline color="warning" class="mx-0 mr-2" @click.native="editItem(props.item)">
                            <v-icon >edit</v-icon>
                        </v-btn>
                        <v-btn color="error" icon small flat outline class="mx-0" @click.native="deleteItem(props.item)">
                            <v-icon >delete</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="buscar">Recargar</v-btn>
                </template>
            </v-data-table>
            <v-dialog v-model="dialogBorrar" persistent max-width="290">    
                <v-card>
                    <v-card-title class="headline">¿Desea eliminar el correo?</v-card-title>                
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" flat @click.native="dialogBorrar = false"><v-icon>close</v-icon>Cancelar</v-btn>
                        <v-btn color="green darken-1" flat @click.native="borrar();">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            No tienes permisos
        </v-layout>
    </v-container>
</template>

<script>
import Correo from "../../api/CCorreo"
import _ from 'lodash'
export default {
    data(){
        return {
            dialogBorrar:false,
            selectedItem:null,
            editedItem:{},
            editedIndex:-1,
            dialog:false,            
            headers: [{ text: 'Email', value: 'email' },{text: 'Acciones',sortable: false,}],
            
            items:[]
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Agregar Correo' : 'Editar Correo'
        },
        permisoCorreo(){
            if(this.$store.state.user)
            {
                return _.find(this.$store.state.user.acciones,elem=>{
                    return elem.nombre=="Correo-Obtener";
                })!=null
            }
            return false;
        }
    },
    methods:{
        deleteItem(item)
        {
            this.dialogBorrar=true            
            this.selectedItem=item;
        },
        borrar(){
            Correo.eliminarCorreo(this.selectedItem.IdEmails).then(res=>{
                this.close();
                this.$store.commit("showSnack",{
                    text:"Exito al borrar",
                    color:"success"
                });
            }).catch(error=>{
                this.close();
                this.$store.commit("showSnack",{
                        text:(error.response.data.Message!=null?error.response.data.Message:error.response.data),
                        color:"error"
                    });
            })
        },
        buscar()
        {
            Correo.obtenerCorreos().then(res=>{
                this.items=res.data
            }).catch();
        },
        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close () {
            this.dialog = false
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            this.dialogBorrar=false
            this.buscar();
        },
        save () {
            let response=null;
            if (this.editedIndex > -1) {
                response=Correo.actualizarCorreo(this.editedItem)
            } else {
                response=Correo.insertarCorreo(this.editedItem)                
            }
            response.then(res=>{
                this.close();
                 this.$store.commit("showSnack",{
                    text:"Exito al guardar",
                    color:"success"
                });
            }).catch(error=>{
                this.close();
            })
        }
    },
    created(){
        this.buscar();
    }
}
</script>
