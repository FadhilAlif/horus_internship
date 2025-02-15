<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-200 text-red-700 p-3 mb-4 rounded-md text-center"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin">
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
        <div class="mt-4">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:text-blue-700"
          >Sign Up</router-link
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
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ""; // Clear previous error message

      try {
        // Make API call to login
        const response = await api.post("/login", {
          username: this.username,
          password: this.password,
        });

        // If login is successful, store the token
        localStorage.setItem("token", response.data.token);

        // Redirect to the dashboard
        this.$router.push("/dashboard");
      } catch (error) {
        // Clear the form to prevent showing invalid data
        this.username = "";
        this.password = "";

        // Debugging: Log the error to understand its structure
        console.log("Error response:", error.response);
        console.log("Error message:", error.message);
        console.log("Error status:", error.response?.status);

        // Handle specific errors
        if (error.response) {
          // Server responded with an error
          if (error.response.status === 401) {
            this.errorMessage =
              error.response.data.error ||
              "Invalid username or password. Please try again.";
          } else {
            this.errorMessage =
              error.response.data.error ||
              "An error occurred. Please try again later.";
          }
        } else if (error.request) {
          // No response from server
          this.errorMessage =
            "No response from server. Please check your connection.";
        } else {
          // Other errors
          this.errorMessage = "An error occurred. Please try again later.";
        }
      }
    },
  },
};
</script>
