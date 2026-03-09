<script setup></script>

<template>
  <div class="app-layout">
    <header>
      <nav>
        <ul class="nav-list">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/categories">Категории</router-link></li>
          <li><router-link to="/items">Товары</router-link></li>
          <li v-if="isAuthenticated && user"><router-link to="/orders">Заказы</router-link></li>
        </ul>

        <div v-if="isAuthenticated && user" class="login">
          {{ user.name }}
          <button @click="logout" type="button">Выйти</button>
        </div>
        <div v-else class="login">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="phone">Телефон:</label>
              <input v-model="phone" type="tel" id="phone" required />
            </div>
            <div class="form-group">
              <label for="password">Пароль:</label>
              <input v-model="password" type="password" placeholder="Пароль" id="password" required />
            </div>
            <button type="submit">Войти</button>
            <p v-if="authError" class="error">{{ authError }}</p>
          </form>
        </div>
      </nav>
    </header>

    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      phone: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    login() {
      this.authStore.login({ phone: this.phone, password: this.password });
    },
    logout() {
      this.authStore.logout();
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.app-layout {
  font-family: sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 15px;
  padding: 0;
  margin: 0;
}

.nav-list a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.login {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group {
  display: inline-block;
  margin-right: 10px;
}

.form-group label {
  margin-right: 4px;
  font-size: 14px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
  background-color: #f4d911;
  color: white;
  border: none;
  border-radius: 4px;
}

.error {
  color: red;
  margin: 5px 0 0 0;
  font-size: 13px;
  width: 100%;
}

.content {
  padding-top: 10px;
}
</style>
