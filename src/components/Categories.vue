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
    <template #footer>
      <div v-if="user?.is_admin" class ="text-end">
        <Button type="button" @click="this.$router.push('/createCategory')" icon="pi pi-plus" label="Добавить категорию"/>
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
import { useAuthStore } from '@/stores/authStore';

export default {
  name: "Categories",
  components: {DataTable, Column, Button},
  data(){
    return{
      dataStore:useDataStore(),
      authStore: useAuthStore(),
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
    },
    user() {
      return this.authStore.user;
    },
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
</style>

