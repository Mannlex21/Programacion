<template>    
    <v-container fill-height>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title class="text-sm-center">
                        <h1>
                            {{message}}<v-icon x-large>account_balance</v-icon>
                        </h1>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>  
    </v-container>  
</template>

<script>
export default {
    data(){
        return{
            message:"Bienvenido al módulo de Crédito",
        }
    }
}
</script>
