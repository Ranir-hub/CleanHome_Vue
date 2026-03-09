<script setup></script>

<template>
  <h2>Список заказов:</h2>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead class="table-light">
        <tr>
          <th scope="col" class="text-center">ID</th>
          <th scope="col">Начало</th>
          <th scope="col">Конец</th>
          <th scope="col">Состав заказа</th>
          <th scope="col">Итоговая стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td> {{ order.id }} </td>
          <td> {{ order.time_start }} </td>
          <td> {{ order.time_end }} </td>
          <td>
            <div v-for="item in order.items" :key="item.id">
              {{ item.name }} {{ item.pivot.amount }} шт.
            </div>
          </td>
          <td>{{ order.total_price }}₽</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script>
import { useOrderStore } from '@/stores/orderStore';

export default {
  name: 'Orders',
  data() {
    return {
      orderStore: useOrderStore(),
    };
  },
  computed: {
    orders() {
      return this.orderStore.orders;
    },
    error() {
      return this.orderStore.errorMessage;
    },
  },
  methods: {
    fetchOrders() {
      this.orderStore.fetchOrders();
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.orders {
  padding: 20px;
}
.error {
  color: red;
}
td{
  padding: 10px;
}
</style>
