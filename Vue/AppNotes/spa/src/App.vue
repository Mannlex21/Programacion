

<!--template>
  <div id="app">
  
  <router-view>
  </router-view>
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/about'">About</router-link>
    <router-link v-bind:to="'/notas'">Notas</router-link>
  </div>
</template-->
<template>
  <div id="app">
    <v-app id="inspire" dark>
        <v-navigation-drawer clipped fixed v-model="drawer" app>
            <v-list dense>
                <!--v-list-tile v-on:click="">
                    <v-list-tile-action>
                        <v-icon>note</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Notas</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-on:click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Settings</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile-->
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>note_add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <div class="container body-content">
                    
                </div>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
<style>
  @import url('https://unpkg.com/vuetify/dist/vuetify.min.css');
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>

<!-- styling for the component -->
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>