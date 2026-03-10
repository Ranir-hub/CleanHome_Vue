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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
export default {
  name: "Items",
  components: {DataTable, Column},
  data(){
    return{
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
    }
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
.items {
  padding: 20px;
}
</style>

