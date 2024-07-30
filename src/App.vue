<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Vue Vite Vuetify</v-toolbar-title>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/articles">Статьи</v-btn>
    </v-app-bar>
    <v-main>
      
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.v-main{
  padding-left: 30px !important;
  padding-right: 30px !important;
}
</style>
