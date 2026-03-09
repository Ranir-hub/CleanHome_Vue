<script setup>
</script>

<template>
  <h2>Список категорий:</h2>
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead class="table-light">
        <tr>
          <th scope="col" class="text-center">ID</th>
          <th scope="col">Наименование</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td class="text-center fw-bold">{{ category.id }}</td>
        <td>{{ category.name }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script>
import { useCategoryStore } from '@/stores/categoryStore';

export default {
  name: 'Categories',
  data() {
    return {
      categoryStore: useCategoryStore(),
    };
  },
  computed: {
    categories() {
      return this.categoryStore.categories;
    },
    error() {
      return this.categoryStore.errorMessage;
    },
  },
  methods: {
    fetchCategories() {
      this.categoryStore.fetchCategories();
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.categories {
  padding: 20px;
}
.error {
  color: red;
}
td{
  padding: 10px;
}
</style>

