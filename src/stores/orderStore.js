import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    token: localStorage.getItem('token') || null,
    errorMessage: null,
  }),
  actions: {
    async fetchOrders() {
      this.errorMessage = null;
      try {
        const response = await axios.get(backendUrl + '/api/order',{
          headers: { Authorization: `Bearer ` + this.token }
        });
        this.orders = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message;
      }
    },
  },
});
