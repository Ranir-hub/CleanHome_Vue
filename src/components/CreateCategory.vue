<template>
  <div class="flex justify-center">
    <form @submit.prevent="createCategory" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">
        Добавление категории
      </h2>

      <div class="flex flex-col">
        <InputText
          type="text"
          placeholder="Введите наименование"
          v-model="categoryName"
          required
        />
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useDataStore } from '@/stores/dataStore';
import Toast from 'primevue/toast';

export default {
  name: "CreateCategory",
  components: { InputText, Button, Toast },

  data() {
    return {
      dataStore: useDataStore(),
      categoryName: '',
      categoryImage: null,
    }
  },

  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    }
  },

  methods: {
    async createCategory() {
      const formData = new FormData();
      formData.append('name', this.categoryName);
      this.dataStore.errorCode = 0;
      await this.dataStore.create(formData, '/api/category');

      if (this.errorCode > 0) {
        this.$toast.add({
          severity: 'error',
          summary: 'Ошибка добавления данных',
          detail: this.errorMessage,
          life: 4000
        });
      } else {
        this.$toast.add({
          severity: 'success',
          summary: 'Данные успешно добавлены',
          detail: this.errorMessage,
          life: 4000
        });
      }
    }
  }
}
</script>

<style scoped>
</style>
