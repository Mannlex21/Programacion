import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        cambios:false,
        dialog:false,
        clienteCambio:[],        
        idPorPreasignar:null,  
        resultado:null,
        comentario:""
    },
    mutations:{
        changeresultado(state,value)
        {
            state.resultado=value;
        },
        changecomentario(state,value)
        {
            state.comentario=value;
        },
        cambio(state){
            state.cambios=!state.cambios;
        },
        open(state,data){
            state.dialog=true
            state.idPorPreasignar=data.idPorPreasignar
            
            state.clienteCambio=data.clienteCambio
        },
        close(state){
            state.dialog=false
            state.idPorPreasignar=null
            state.clienteCambio=null
            state.resultado=null;
            state.comentario="";
        }
    }
    
});