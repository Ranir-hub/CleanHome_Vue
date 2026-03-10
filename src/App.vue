<script setup></script>

<template>
  <Menubar :model="menu">
    <template #start>
      <span>
        <img src="@/assets/logo.png" width="50" alt="logo" />
      </span>
    </template>
    <template #item="{ item }">
      <a class="flex items-center m-2 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon"/>
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
        <nav>
          <div v-if="isAuthenticated && user" class="login">
            {{ user.name }}
            <button @click="logout" type="button">Выйти</button>
          </div>
          <div v-else class="login">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="phone">Телефон:</label>
                <InputText v-model="phone" type="tel" id="phone" required placeholder="Телефон" class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
              </div>
              <div class="form-group">
                <label for="password">Пароль:</label>
                <InputText v-model="password" type="password" placeholder="Пароль" id="password" required class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
              </div>
              <Button type="submit">Войти</Button>
              <p v-if="authError" class="error">{{ authError }}</p>
            </form>
          </div>
        </nav>
    </template>
  </Menubar>

  <main class="content">
    <router-view></router-view>
  </main>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

export default {
  components: {Button, Menubar, InputText},
  data() {
    return {
      phone: '',
      password: '',
      authStore: useAuthStore(),
      items:[
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          submenu: [],
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-list',
          route: '/categories',
        },
        {
          label: 'Товары',
          icon: 'pi pi-fw pi-shopping-cart',
          route: '/items',
        },
      ]
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
    menu(){
      const items = [...this.items];
      if(this.isAuthenticated && !this.items.find(item => item.label === 'Заказы')) {
        this.items.push(
        {
          label: 'Заказы',
          icon: 'pi pi-fw pi-file-edit',
          route: '/orders',
        })
      }
      else if(this.items.find(item => item.label === 'Заказы')){
        this.items.pop();
      }
      return items;
    }
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
.content{
  margin: 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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
  font-size: 13px;
}

.content {
  padding-top: 10px;
}
</style>
