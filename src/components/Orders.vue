<script setup>
</script>

<template>
  <h2>Список заказов:</h2>
  <DataTable
    :value="orders"
    :loading="dataStore.loading"
    :paginator="true"
    :lazy="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="orders_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="№"/>
    <Column header="Состав заказа">
      <template #body="slotProps">
        <div v-for="item in slotProps.data.items" :key="item.id">
          {{ item.name }} {{ item.pivot.amount }} шт.
        </div>
      </template>
    </Column>
    <Column field="total_price" header="Итоговая стоимость"/>
    <Column field="time_start" header="Время начала"/>
    <Column field="time_end" header="Время окончания"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
export default {
  name: "Orders",
  components: {DataTable, Column},
  data(){
    return{
      dataStore:useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed:{
    orders(){
      return this.dataStore.data.orders;
    },
    orders_total(){
      return this.dataStore.totals.orders_total;
    }
  },
  mounted(){
    console.log('Orders mounted');
    this.dataStore.get_auth('orders','/api/order');
    this.dataStore.get_total_auth('orders_total','/api/order_total');
    console.log('Orders=', this.orders, this.orders_total);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_auth('orders','/api/order',this.offset/this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
.categories {
  padding: 20px;
}
</style>

