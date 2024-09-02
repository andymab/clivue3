<template>
  <v-app>
    <v-app-bar app v-if="$route.path !== '/login'">
      <v-toolbar-title>Vue Vite Vuetify</v-toolbar-title>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/articles">Статьи</v-btn>
      <v-btn text to="/upload">Загрузка</v-btn>
      <v-btn text to="/lesson">Экзамен в ГАИ</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-logout" @click="logout" size="small"></v-btn>
    </v-app-bar>
    <v-main>
      
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
}
</script>
<style>
.v-main{
  padding-left: 30px !important;
  padding-right: 30px !important;
}
</style>
