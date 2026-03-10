<script setup>
</script>

<template>
  <h2>Список категорий:</h2>
  <DataTable
    :value="categories"
    :loading="dataStore.loading"
    :paginator="true"
    :lazy="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="categories_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
    >
      <Column field="id" header="№"/>
      <Column field="name" header="Наименование категории"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
export default {
  name: "Categories",
  components: {DataTable, Column},
  data(){
    return{
      dataStore:useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed:{
    categories(){
      return this.dataStore.data.categories;
    },
    categories_total(){
      return this.dataStore.totals.categories_total;
    }
  },
  mounted(){
    console.log('Categories mounted');
    this.dataStore.get('categories','/api/category');
    this.dataStore.get_total('categories_total','/api/category_total');
    console.log('Categories=', this.categories, this.categories_total);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get('categories','/api/category',this.offset/this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
.categories {
  padding: 20px;
}
</style>

