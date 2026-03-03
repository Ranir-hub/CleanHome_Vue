<script setup></script>

<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/categories">Категории</router-link></li>
        <li><router-link to="/items">Товары</router-link></li>
      </ul>
      <div v-if="isAuthenticated && user">
        Welcome, {{ user.name }}
        <button @click="logout" type="submit">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="phone">Phone:</label>
            <input v-model="phone" type="phone" id="phone" required/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input v-model="password" type="password" placeholder="Password" id="password" required/>
          </div>
          <button type="submit">Login</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
export default {
  data(){
    return {
      phone: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated(){
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError(){
      return this.authStore.errorMessage;
    },
  },
  methods: {
    login(){
      this.authStore.login({phone: this.phone, password: this.password});
    },
    logout() {
      this.authStore.logout();
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if(token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  }
}

</script>
.error{
  color: red;
}
<style scoped></style>
