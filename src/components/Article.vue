<template>
  <div>
    <v-app-bar density="compact" elevation="0" color="primary">
      <v-breadcrumbs class="" :items="breadcrumbs" divider="-">
        <template #item="{ item }">
          <a href="#" @click="handleBreadcrumbsClick(item)">{{ item.title }}</a>
        </template>
      </v-breadcrumbs>
      <v-btn icon>
        <v-icon>mdi-file-edit</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>

    </v-app-bar>
    <v-card :loading="loading" flat>
      <div class="d-flex justify-space-between align-center item-block py-2">
        <div class="d-flex align-center">
          <img v-if="icon" :src="icon.indexOf('data:image') !== -1 ? icon : `https://355042.ru/` + icon"></img>
          <v-icon v-else class="align-self-stretch icon-table" size="80">{{ 'mdi-image-off' }}</v-icon>
          <div class="d-flex flex-column">
            <v-card-item>
              <v-card-title>
                {{ title }}
              </v-card-title>

              <v-card-subtitle>
                {{ description }}
              </v-card-subtitle>
            </v-card-item>

          </div>
        </div>
        <div class="d-flex flex-column">
          <div><small>{{ time_create }}</small></div>
          <div><small>{{ restime }}</small></div>
        </div>
      </div>
      <div v-html="convertedMarkdown" class="text-left"></div>

    </v-card>
  </div>
</template>

<script>
import api from "../api"
import { marked } from 'marked';

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

export default {
  name: 'Article',
  data() {
    return {
      icon: '',
      title: 'Заголовок',
      description: 'Подзаголовок',
      time_create: '',
      breadcrumbs: [],
      restime: '',
      loading: true,
      serverData: '',
      convertedMarkdown: '',
    };
  },
  created() {
    this.onLoadArticle();
  },
  computed: {

  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    getlocaleDate(timestamp) {
      if (!timestamp) {
        return false;
      }
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
        this.title = this.serverData.title;
        this.icon = this.serverData.icon;
        this.description = this.serverData.descr;
        this.time_create = this.getlocaleDate(this.serverData.time_create);
        this.restime = this.getlocaleDate(this.serverData.restime);
        this.breadcrumbs = this.serverData.breadcrumbs;
        this.breadcrumbs.splice(0, 0, { title: 'Home', href: '/articles' });

        this.convertedMarkdown = marked(this.serverData.post); //'# Marked in Node.js\n\nRendered by **marked**.'  this.serverData.
        //Использование  this.$nextTick()  гарантирует, что код подсветки синтаксиса будет вызван после обновления DOM
        this.$nextTick(() => {
          const blocks = this.$el.querySelectorAll('pre code');
          blocks.forEach((block) => {
            hljs.highlightBlock(block);
          });
        });

        this.loading = false

      } catch (error) {
        console.error(error);
        this.loading = false
      }
    },
    async handleBreadcrumbsClick(id) {
      // this.loading = true
      // const response = await api.getArticles(id);
      // this.serverItems = response.data;
      // this.totalItems = this.serverItems.length;
      // this.loading = false
    },

    handleKeyDown(event) {
      if (event.ctrlKey && (event.key === 's' || event.key === 'ы')  ) {
        console.log('save');
        event.preventDefault();
      }
      if (event.ctrlKey && (event.key === 'e'  || event.key === 'у')) {
        console.log('edit');
        event.preventDefault();

      }
      if (event.ctrlKey && (event.key === 'x'  || event.key === 'ч')) {
        console.log('delete');
        event.preventDefault();
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

pre>code {
  font-size: 12px;
}
</style>