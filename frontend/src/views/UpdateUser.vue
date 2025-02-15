<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Update User
      </h2>

      <form @submit.prevent="handleUpdate">
        <!-- Username Input -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Full Name Input -->
        <div class="mb-6">
          <label for="nama" class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            v-model="nama"
            type="text"
            id="nama"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Buttons: Update and Back -->
        <div class="flex justify-between">
          <!-- Back Button -->
          <router-link to="/dashboard">
            <button
              type="button"
              class="py-2 px-4 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600"
            >
              Back
            </button>
          </router-link>

          <!-- Update Button -->
          <button
            type="submit"
            class="py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </form>
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
  created() {
    this.fetchUserData();
  },
  methods: {
    // Fetch user data based on ID passed in the route parameters
    async fetchUserData() {
      try {
        const userId = this.$route.params.id;
        const response = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = response.data;
        this.username = user.username;
        this.email = user.email;
        this.nama = user.nama;
      } catch (error) {
        console.error(
          "Failed to fetch user data:",
          error.response?.data?.error || error.message
        );
      }
    },

    // Handle update functionality
    async handleUpdate() {
      try {
        const userId = this.$route.params.id;
        const response = await api.put(
          `/users/${userId}`,
          {
            username: this.username,
            password: this.password,
            email: this.email,
            nama: this.nama,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Redirect to the dashboard after a successful update
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(
          "Update failed:",
          error.response?.data?.error || error.message
        );
      }
    },
  },
};
</script>
