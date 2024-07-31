<template>
  <v-card flat>
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line clearable density="compact"></v-text-field>
    </template>


    <v-data-table :headers="headers" :items="serverItems" :search="search" hide-default-header>

      <template v-slot:item.actions="{ item }">
        <v-icon @click="handleBreadcrumbsClick(item)">mdi-folder-arrow-right</v-icon>

      </template>
      <template v-slot:item.title_descr="{ item }">
        <div class="d-flex item-block py-2">
          <img v-if="item.icon"
            :src="item.icon.indexOf('data:image') !== -1 ? item.icon : `https://355042.ru/` + item.icon"
           @click="navigateToArticle(item.id)"
            
            ></img>
          <v-icon v-else class="align-self-stretch icon-table" size="80" @click="navigateToArticle(item.id)">{{ 'mdi-image-off' }}</v-icon>
          <div class="d-flex flex-column px-2 justify-space-between">
            <div>
              <h4 class="text-start">{{ item.title }}</h4>
              <div class="text-start text-sm">{{ item.descr }}</div>
            </div>
            <v-breadcrumbs class="py-0 px-0 custom-breadcrumbs" color="primary" :items="item.breadcrumbs" divider="-">
              <template #item="{ item }">
                <a href="#" @click="handleBreadcrumbsClick(item)">{{ item.title }}</a>
              </template>
            </v-breadcrumbs>
          </div>
        </div>
      </template>
      <template v-slot:item.restime="{ item }">
        <div>{{ getlocaleDate(item.time_create) }}</div>
        <div>{{ getlocaleDate(item.restime) }}</div>
      </template>

    </v-data-table>



  </v-card>
</template>

<script>
import api from "../api"
export default {
  name: 'Articles',
  data() {
    return {
      search: '',
      items: [],
      headers: [
        { title: 'Наименование', key: 'title_descr', value: item => `${item.title} ${item.descr}`, },
        { title: 'data', key: 'restime', sortable: false },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
    };
  },
  created() {
    this.onLoadArticles();
  },
  computed: {
  },
  methods: {
    navigateToArticle(id) {
      this.$router.push({ path: `/article/${id}` });
      //this.$router.push({ name: 'article', params: { id } });
    },
    getlocaleDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('ru-RU', options);
    },
    async onLoadArticles() {
      try {
        const articleId = this.$route.params.id;

        this.loading = true
        const response = await api.getArticles(articleId);

        this.serverItems = response.data;
        this.totalItems = this.serverItems.length;
        this.loading = false

      } catch (error) {
        console.error(error);
        this.loading = false
      }
    },
    async handleBreadcrumbsClick(item) {
      this.loading = true
      const response = await api.getArticles(item.id);
      this.serverItems = response.data;
      this.totalItems = this.serverItems.length;
      this.loading = false
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