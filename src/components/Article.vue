<template>
  <div>
    <v-app-bar density="compact" elevation="0" color="primary">
      <v-breadcrumbs class="" :items="breadcrumbs" divider="-">
        <template #item="{ item }">
          <v-btn @click="handleBreadcrumbsClick(item)">{{ item.title }}</v-btn>
        </template>
      </v-breadcrumbs>
      <v-btn icon @click="isedit = !isedit">
        <v-icon>mdi-file-edit</v-icon>
      </v-btn>

      <v-btn v-if="$refs.textarea && $refs.textarea.modelValue && $refs.textarea.modelValue.length  > 0" icon @click="saveContent">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon v-show="scrolledDown" @click="scrollToTop">
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>
    </v-app-bar>
    <div v-show="isedit" style="position: relative;width: 100%;height: 100vh;">
      <v-textarea 
      class="edit-area"
      auto-grow
       :model-value="serverData.post"
       ref = 'textarea'
      />
    </div>
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
      articleId: null,
      scrolledDown: false,
      icon: '',
      isedit: false,
      title: 'Заголовок',
      description: 'Подзаголовок',
      time_create: '',
      breadcrumbs: [],
      restime: '',
      loading: true,
      serverData: '',
  
    };
  },
  created() {
    this.onLoadArticle();
  },
  computed: {
    convertedMarkdown(){
      if(this.serverData.post){
              return marked(this.serverData.post);
      }

    }
  },
  mounted() {
    const articleId = this.$route.params.id;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
   async saveContent() {
      this.isedit = false;
      const id = this.$route.params.id;
      this.serverData.post = this.$refs.textarea.modelValue;
      await api.updateArticle(id,this.serverData);
      console.log(this.serverData.post);
      this.onLoadArticle();
      //this.onLoadArticle();
    },

    handleScroll() {
      this.scrolledDown = window.scrollY > 60;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    getlocaleDate(timestamp) {
      if (!timestamp) {
        return false;
      }
      let date = new Date(timestamp * 1000);
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('ru-RU', options);
    },
    myhighlight(){
      const blocks = this.$el.querySelectorAll('pre code');
      blocks.forEach((block) => {
            hljs.highlightBlock(block);
          });
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
        this.breadcrumbs.splice(0, 0, { title: 'Home', id: '' });

        //this.convertedMarkdown = marked(this.serverData.post); //'# Marked in Node.js\n\nRendered by **marked**.'  this.serverData.
        //Использование  this.$nextTick()  гарантирует, что код подсветки синтаксиса будет вызван после обновления DOM
        this.$nextTick(() => {
            this.myhighlight();
        });

        this.loading = false

      } catch (error) {
        console.error(error);
        this.loading = false
      }
    },
    async handleBreadcrumbsClick(item) {
      this.$router.push('/articles/' + item.id);
    },

    handleKeyDown(event) {
      if (event.ctrlKey && (event.key === 's' || event.key === 'ы')) {
        console.log('save');
        event.preventDefault();
      }
      if (event.ctrlKey && (event.key === 'e' || event.key === 'у')) {
        console.log('edit');
        event.preventDefault();

      }
      if (event.ctrlKey && (event.key === 'x' || event.key === 'ч')) {
        console.log('delete');
        event.preventDefault();
      }
    },
  },
}
</script>

<style>
.edit-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}

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