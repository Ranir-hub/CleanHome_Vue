<script setup>
</script>

<template>
  <h2>Список товаров:</h2>
  <div class="table-responsive">
    <table>
      <thead class="table-light">
      <tr>
        <th scope="col" class="text-center">ID</th>
        <th scope="col">Наименование</th>
        <th scope="col">Цена</th>
        <th scope="col">Количество</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="text-center fw-bold">{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.balance }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script>
import { useItemStore } from '@/stores/itemStore';

export default {
  name: 'Items',
  data() {
    return {
      itemStore: useItemStore(),
    };
  },
  computed: {
    items() {
      return this.itemStore.items;
    },
    error() {
      return this.itemStore.errorMessage;
    },
  },
  methods: {
    fetchItems() {
      this.itemStore.fetchItems();
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.items {
  padding: 20px;
}
.error {
  color: red;
}
td{
  padding: 10px;
}
</style>
