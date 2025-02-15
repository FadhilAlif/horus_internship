<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">
        Register
      </h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mb-4">
          <label for="nama" class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            v-model="nama"
            type="text"
            id="nama"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div class="mt-4">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </div>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:text-blue-700"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      nama: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await api.post("/users", {
          username: this.username,
          password: this.password,
          email: this.email,
          nama: this.nama,
        });
        this.$router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error.response.data.error);
      }
    },
  },
};
</script>
