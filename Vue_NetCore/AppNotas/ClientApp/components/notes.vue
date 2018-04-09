<template> 
    <div>
        
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <v-btn color="success" v-on:click="fetchForecasts">Obtener</v-btn>
        <v-btn color="success" v-on:click="iniciar">Iniciar</v-btn>
        <v-btn color="success" v-on:click="salir">Salir</v-btn>
        <p>Status {{ info }}.</p>
        <ul>
            <li v-for="forecast in forecasts" v-bind:key="forecast.Id">
                {{ forecast.summary }}
            </li>
        </ul>
        <p>{{salirC}}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import List from '../store/api'
import store from '../store/index.js'
export default {
    data() {
        
        return {
            sto:'',
            forecasts: [],
            info: 'Not run yet'
        }
    },
    computed: {
        salirC(){
            return this.$store.getters.isLoggedIn
        }
    },
    methods: {
        ...mapActions(['setCounter']),
        iniciar(){
            localStorage.setItem("token", "JWT");
            store.commit("login");
        },
        salir(){
            localStorage.removeItem("token");
            store.commit("logout");
        },
        fetchForecasts() {
            var self = this;
            this.info = "Fetching"
            /*axios.get('/api/SampleData/WeatherForecasts')
            .then(function (response) {
                console.log(this)
                self.forecasts=response.data;
                self.info="Done"
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });*/
            List.get().then((data)=>{
                self.forecasts=data;
                self.info = "Done"
                
            }).catch((error)=>{
                console.log(error)
            });
            
        }
    }
}
</script>

<style>
</style>
