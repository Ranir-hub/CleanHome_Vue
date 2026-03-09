import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
    errorMessage: null,
  }),
  actions: {
    async fetchItems() {
      this.errorMessage = null;
      try {
        const response = await axios.get(backendUrl + '/api/item');
        this.items = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message;
      }
    },
  },
});
