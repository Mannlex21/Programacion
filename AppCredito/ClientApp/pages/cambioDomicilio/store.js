import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        cambios:false,
        dialog:false,
        clienteCambio:[],        
        idPorPreasignar:null,
        noAplica:null,
        supervisores:[],
        supervisor:null
    },
    mutations:{
        changenoAplica(state,value)
        {
            state.noAplica=value;
        },
        changesupervisores(state,value)
        {
            state.supervisores=value;
        },
        changesupervisor(state,value)
        {
            state.supervisor=value;
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
            state.noAplica=null;            
            state.supervisor=null;
        }
    }
    
});