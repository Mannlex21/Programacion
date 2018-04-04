<template>
    <v-container fill-height >
        <v-slide-y-transition mode="out-in" >
        <v-layout justify-center align-center >
            <v-flex xs8 md3>
                <v-layout justify-center >
                <h3>Registrate</h3>
                </v-layout>
                <v-text-field
                box
                label="Email"
                :rules="emailRules"
                v-model="email"
                hint="Ingresa tu correo!"
                ></v-text-field>
                <v-text-field
                box
                v-model="password"
                label="Contraseña"
                hint="Al menos 5 caracteres!"
                min="5"
                value=""
                :type="pass ? 'password' : 'text'"
                ></v-text-field>
                <v-layout justify-center >
                    <v-btn v-on:click.stop="signUp" color="success" justify-cente>Aceptar</v-btn>
                </v-layout>
                
            </v-flex>
        </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>
// import {db} from '../javascripts/firebaseConfig'
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      pass: true,
      password: '',
      email: '',
      errorM: '',
      emailRules: [
        v => {
          return !!v || 'Ingresa tu correo!'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo debe ser valido!'
      ]
    }
  },
  methods: {
    signUp: function () {
      var ro = this.$router
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          ro.replace('/login')
        }
      ).catch(
        function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        }
      )
    }
  }
}
</script>

