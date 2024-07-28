<template>
  <v-card
    flat
  >
  <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>


    <v-data-table
    :headers="headers"
    :items="serverItems"
    item-value="title"
  >

    <template v-slot:item.actions="{ item }">
      <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:item.title="{ item }">
       <v-icon>{{ item.icon || 'mdi-file' }}</v-icon>
      <div>{{ item.title }}</div>
      <div>{{ item.descr }}</div>
    </template>
    <template v-slot:item.restime="{ item }">
      <div>{{ item.time_create }}</div>
      <div>{{ item.restime }}</div>
    </template>

</v-data-table>







  </v-card>
</template>

<script>
import api from "../api"
export default {
  name: 'List',
  data() {
    return {
      search: '',
      items: [],
      headers: [
        { title: 'Наименование', key: 'title', align: 'start', },
        { title: 'Actions', key: 'actions', sortable: false },
        { title: 'data', key: 'restime', sortable: false },
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
    async onLoadArticles() {
      try {
        this.loading = true
        const response = await api.getArticles();

        this.serverItems = response.data;
        this.totalItems = this.serverItems.length;
        this.loading = false

      } catch (error) {
        console.error(error);
        this.loading = false
      }
    }
  },
}
</script>