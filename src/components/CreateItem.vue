<template>
  <div class="flex justify-center">
    <form @submit.prevent="createItem" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">
        Добавление товара
      </h2>

      <div class="flex flex-col mt-2">
        <InputText
          type="text"
          placeholder="Введите наименование"
          v-model="itemName"
          required
        />

        <div class="flex flex-col mt-2">
          <Select
            v-model="itemCategory"
            :options="categories"
            optionLabel="name"
            optionValue="id"
            placeholder="Выберите категорию"
            required
          />
        </div>
      </div>

      <div class="flex flex-col mt-2 mb-2">
        <p class="text-left" style="color: dimgrey">
          Цена
        </p>
        <InputText
          type="number"
          v-model="itemPrice"
          required
        />
      </div>

      <p class="text-left" style="color: dimgrey">
        На балансе
      </p>
      <div class="flex flex-col">
        <InputText
          type="number"
          v-model="itemBalance"
          required
        />
      </div>

      <div class="mt-2">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50"
        >
          <span class="pi pi-upload mx-3"></span>
          Выбрать изображение
        </label>
        <input
          type="file"
          hidden
          id="file"
          name="file"
          @change="changeCaption"
          required
          accept="image/*"
        >
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
import Select from 'primevue/select';
import categories from "@/components/Categories.vue";

export default {
  name: "CreateItem",
  components: { InputText, Button, Toast, Select},

  data() {
    return {
      dataStore: useDataStore(),
      itemName: '',
      itemCategory: 0,
      itemPrice: 0,
      itemBalance: 0,
      itemImage: null,
    }
  },

  mounted() {
    this.dataStore.get('categories','/api/category', null, null);
  },

  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    },
    categories(){
      console.log(this.dataStore.data.categories)
      return this.dataStore.data.categories;
    },
  },

  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      const fileLabel = document.getElementById('file-label');

      if (file) {
        fileLabel.innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.itemImage = file;
      } else {
        fileLabel.innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.itemImage = null;
      }
    },

    async createItem() {
      const formData = new FormData();
      formData.append('name', this.itemName);
      formData.append('price', this.itemPrice);
      formData.append('category_id', this.itemCategory);
      formData.append('balance', this.itemBalance);
        formData.append('image', this.itemImage);
        this.dataStore.errorCode = 0;
      await this.dataStore.create(formData, '/api/item');

      if (this.dataStore.errorCode > 0) {
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
