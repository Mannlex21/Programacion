<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in" >
      <v-layout justify-center align-center >
      <v-flex xs8 md5>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
      >
        <v-tab
          ripple
        >
          Login
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-layout justify-center align-center >
                <v-flex xs8 md8>
                    <v-layout justify-center >
                    <h3>Iniciar sesión</h3>
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
                        <v-btn v-on:click.stop="login" color="success" justify-cente>Aceptar</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab
          ripple
        >
          Registro
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-layout justify-center align-center >
                <v-flex xs8 md8>
                    <v-layout justify-center >
                    <h3>Registro</h3>
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
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import '../css/icons_material.css'
import '../css/vuetify.min.css'
import '../css/site.css'
export default{
  name: 'login',
  data: function () {
    return {
      active: null,
      pass: true,
      email: '',
      password: '',
      emailRules: [
        v => {
          return !!v || 'Ingresa tu correo!'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El correo debe ser valido!'
      ]
    }
  },
  methods: {
    
  }
}
</script>

