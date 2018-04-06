import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import menu from "../components/menu/menu"

Vue.use(Vuex)

function buscamosPermisosEnMenu(item,permisos)
{
    
    let found=null;
    
    if(item.permisos!=null)
    {               
        found=_.find(item.permisos,elem=>{                    
            if(permisos!=null){                                            
                let found=_.find(permisos,permiso=>permiso.nombre==elem);
                return found!=null;
            }
            return false;
        })                           
    }
    
    if(found!=null)
    {
        item.tienepermiso=true;                
    }
    if(item.items!=null)
    {
        for(let index in item.items)
        {
            buscamosPermisosEnMenu(item.items[index],permisos)                            
        }
    }                
}

export default new Vuex.Store({
    state:{
        menu:menu,
        user:null,
        snackBarConfig:{snackbar: false,timeout: 6000,x:null,y:null,color:"black",mode:"multi-line",snackbartext:""},
        snackBarController:{
            snackbar: false,
            timeout: 6000,
            color:"black",
            x:null,
            y:null,
            mode:"multi-line",
            snackbartext:""
        }
    },
    mutations : {
        setUserSession(state, user){
            
            state.user = user;            
            if(user!=null){
                for(let i in menu)
                {
                    buscamosPermisosEnMenu(menu[i],user.acciones);
                }
            }   
            console.log(menu);
            state.menu=menu;
        },
        showSnack(state,message){
            let color="black"            
            if(message.color!=null)
                color=message.color ;
            state.snackBarController.color=color;
            state.snackBarController.snackbartext=message.text;
            state.snackBarController.snackbar=true;
        },
        setSnackBar(state,value){
            state.snackBarController=value;
        },
        resetSnackBar(state){
            state.snackBarController=state.snackBarConfig;
        }
    },
    actions : {
        getLogin({commit}){
            return axios.get(window.location.origin+"/login/getSession")
        },
        getOrigin({commit}){
            return axios.get(window.location.origin+"/login/getOrigin")
        }         
    }
});