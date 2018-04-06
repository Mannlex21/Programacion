<template>
    <v-app>    
        <v-navigation-drawer 
            clipped
            width="280"
            v-model="drawer"
            :mini-variant="mini"            
            dark
            mobile-break-point="1000"
            class="grey darken-3"
            dense absolute overflow app>
            <v-list dense class="pa-0 mt-5">
                <v-list-tile v-if="mini" v-on:click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile class="pa-0" avatar tag="div">
                    <v-list-tile-avatar>
                        <v-icon large >person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{perfilSession}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon v-on:click.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list dense >
                    <v-divider ></v-divider>
                    <v-list-group                        
                        v-for="item in items"
                        activeClass="content-navigation"
                        :key="item.title"                        
                        :no-action="false"
                        :append-icon="`${item.items ? 'keyboard_arrow_down' : ''}`"
                        v-if="item.tienepermiso">
                        <v-list-tile slot="activator" :to="item.path">
                            <v-list-tile-action>
                                <router-link :to="item.path">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </router-link>
                            </v-list-tile-action>
                            <v-list-tile-content >
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="subItem in item.items" v-if="subItem.tienepermiso" :key="subItem.title" :to="subItem.path">                            
                            <v-list-tile-action>
                                <v-icon>{{ subItem.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                            </v-list-tile-content>                                                        
                        </v-list-tile>                        
                    </v-list-group>
                    <v-divider ></v-divider>
                    <v-list-group
                                                
                        
                        v-for="item in seconditems"
                        activeClass="content-navigation"
                        :key="item.title"                        
                        :no-action="false"
                        :append-icon="`${item.items ? 'keyboard_arrow_down' : ''}`"
                        v-if="item.tienepermiso">
                        <v-list-tile slot="activator" :to="item.path">
                            <v-list-tile-action>
                                <router-link :to="item.path">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </router-link>
                            </v-list-tile-action>
                            <v-list-tile-content >
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                                              
                    </v-list-group>
                </v-list>
        </v-navigation-drawer>
        <v-toolbar dense absolute 
            dark
            :clipped-left="true" :clipped-right="true"	>
            <v-toolbar-side-icon v-on:click="drawer=!drawer"></v-toolbar-side-icon>
            <v-toolbar-title>                               
                Crédito<v-icon>account_balance</v-icon>       
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
      
            </v-toolbar-items>
        </v-toolbar>
       
        <v-content grid-list-md text-xs-center class="mt-5"> 
            <router-view></router-view>     
        </v-content>  
        <v-snackbar
        
        :timeout="timeout"
        :color="color"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar">
            {{ snackbartext }}
            <v-btn flat color="white"  @click.native="snackbar = false">x</v-btn>
        </v-snackbar>
        <v-footer class="pa-1" dark inset fixed>            
            <v-spacer></v-spacer>
            <v-icon>person</v-icon>{{perfilSessionComplete}}
        </v-footer>
    </v-app>
</template>
<script>    
    import stylesMaterial  from '../css/icons_material.css'
    import stylesVuetify   from '../css/vuetify.min.css'
    import _ from 'lodash'
    
    
    export default {
        
        data : function() {
            return {            
                drawer:false,
                mini:false,                
                message:[]
            }
        },
       computed:{
           perfilSession(){               
               if(this.$store.state.user!=null)
                    return this.$store.state.user.nombres+" "+this.$store.state.user.apellidos;
               return ""
           },
           perfilSessionComplete(){                              
               if(this.$store.state.user!=null)
                    return this.$store.state.user.empleado+" - "+this.$store.state.user.nombres+" "+this.$store.state.user.apellidos;
               return ""
           },
           items(){               
               return this.$store.state.menu;
           },
           seconditems(){
               return [{title: 'Pagina Principal', icon: 'home', path: '/home',tienepermiso:true,},
                        {title: 'Salir', icon: 'power_settings_new', path: '/logout',tienepermiso:true,}];
           },
            color:
            {
                get()
                {
                    return this.$store.state.snackBarController.color
                }                
            },
            snackbar:
            {
                get()
                {
                    return this.$store.state.snackBarController.snackbar
                },
                set(value)
                {
                    const localsnackbar=this.$store.state.snackBarController
                    localsnackbar.snackbar=value;
                    this.$store.commit("setSnackBar",localsnackbar)
                }
            },
            timeout:
            {
                get()
                {
                    return this.$store.state.snackBarController.timeout
                }               
            },
            x:
            {
                get()
                {
                    return this.$store.state.snackBarController.x
                }
            },
            y:
            {
                get()
                {
                    return this.$store.state.snackBarController.y
                }
            },
            mode:
            {
                get()
                {
                    return this.$store.state.snackBarController.mode
                }
            },
            snackbartext:
            {
                get()
                {
                    return this.$store.state.snackBarController.snackbartext
                }
            },
       }
                   
    }
</script>
<style lang="sass" scoped>
    $font-stack:    Helvetica, sans-serif;
    $primary-color: white;
    a{color: $primary-color !important;}
    .content-navigation {font: 100% $font-stack;color: $primary-color;}
</style>
<style scoped>
    .home-page{
        color: white !important;
        padding: 10px;
        border: 0px solid white;
        text-decoration: none;
    }
    .home-page:hover{
        background-color: rgba(255,255,255,0.1);
        border: 1px solid white;
    }
</style>