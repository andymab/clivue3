<template>
    <v-card flat>

        <div v-html="convertedMarkdown" class="text-left"></div>
  
    </v-card>
  </template>
  
  <script>
  import api from "../api"
  import { marked } from 'marked';

  export default {
    name: 'Article',
    data() {
      return {
        serverData:'',
        convertedMarkdown: '',
      };
    },
    created() {
      this.onLoadArticle();
    },
    computed: {
    },
    methods: {
      getlocaleDate(timestamp) {
        let date = new Date(timestamp * 1000);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('ru-RU', options);
      },
      async onLoadArticle() {
        try {
          this.loading = true
          const id = this.$route.params.id;
          const response = await api.getArticle(id);
          this.serverData = response.data;
          this.convertedMarkdown = marked.parse('# Marked in Node.js\n\nRendered by **marked**.'); //'# Marked in Node.js\n\nRendered by **marked**.'  this.serverData.post
          this.loading = false
  
        } catch (error) {
          console.error(error);
          this.loading = false
        }
      }, 
    },
  }
  </script>
  
  <style>
  .icon-table {
    /* min-width: 60px; */
  }
  
  .item-block img {
    max-height: 80px;
  }
  
  .custom-breadcrumbs>li>a {
    text-transform: uppercase;
  }
  
  h4 {
    text-transform: uppercase;
  }
  </style>