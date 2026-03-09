import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    errorMessage: null,
  }),
  actions: {
    async fetchCategories() {
      this.errorMessage = null;
      try {
        const response = await axios.get(backendUrl + '/api/category');
        this.categories = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message;
      }
    },
  },
});
