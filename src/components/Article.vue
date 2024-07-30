<template>
  <v-card flat>

    <div v-html="convertedMarkdown" class="text-left"></div>

  </v-card>
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

pre>code{
  font-size: 12px;
}
</style>