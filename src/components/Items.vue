<script setup>
</script>

<template>
  <h2>Список товаров:</h2>
  <DataTable
    :value="items"
    :loading="dataStore.loading"
    :paginator="true"
    :lazy="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="items_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="name" header="Наименование товара"/>
    <Column field="category.name" header="Категория"/>
    <Column field="price" header="Цена"/>
    <Column>
      <template #body="slotProps">
        <img
          :src="slotProps.data.picture_url"
          alt="pic"
          width="20"
        />
      </template>
    </Column>
    <template #footer>
      <div v-if="user?.is_admin" class ="text-end">
        <Button type="button" @click="this.$router.push('/createItem')" icon="pi pi-plus" label="Добавить товар"/>
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
import Button from "primevue/button";
import { useAuthStore } from '@/stores/authStore';

export default {
  name: "Items",
  components: {DataTable, Column, Button, Image},
  data(){
    return{
      authStore: useAuthStore(),
      dataStore:useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed:{
    items(){
      return this.dataStore.data.items;
    },
    items_total(){
      return this.dataStore.totals.items_total;
    },
    user() {
      return this.authStore.user;
    },
  },
  mounted(){
    console.log('Items mounted');
    this.dataStore.get('items','/api/item');
    this.dataStore.get_total('items_total','/api/item_total');
    console.log('Items=', this.items, this.items_total);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get('items','/api/item',this.offset/this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
</style>

