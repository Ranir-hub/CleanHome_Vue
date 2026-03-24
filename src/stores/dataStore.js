import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { useAuthStore } from '@/stores/authStore';

export const useDataStore = defineStore('data', {
  state: () => ({
    data: {
      categories: [],
      items: [],
      orders: [],
    },
    totals: {
      categories_total: null,
      items_total: null,
      orders_total: null,
    },
    errorMessage: "",
    errorCode: 0,
    loading: false,
  }),
  actions: {
    async get(key, endpoint, page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + endpoint, {
          params: {
            page: page,
            perpage: perpage,
          }
        });
        this.data[key] = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_total(key, endpoint) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + endpoint);
        this.totals[key] = response.data;
        console.log(this.totals[key]);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_auth(key, endpoint, page = 0, perpage = 5) {
      this.errorMessage = "";
      const authStore = useAuthStore();
      try {
        const response = await axios.get(backendUrl + endpoint, {
          params: {
            page: page,
            perpage: perpage,
          },
          headers: {Authorization: 'Bearer ' + authStore.token}
        });
        this.data[key] = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_total_auth(key, endpoint) {
      this.errorMessage = "";
      const authStore = useAuthStore();
      try {
        const response = await axios.get(backendUrl + endpoint, {
          headers: {Authorization: 'Bearer ' + authStore.token}
        });
        this.totals[key] = response.data;
        console.log(this.totals[key]);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async create(formData, endpoint) {
      this.errorCode = 0;
      this.errorMessage = "";
      const authStore = useAuthStore();
      try {
        const response = await axios.post(backendUrl + endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + authStore.token
          },
        });
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        } else{
          this.errorCode = 13;
          console.log(error);
        }
      }
    }
  }
});
