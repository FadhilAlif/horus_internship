<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Users Dashboard</h1>

    <!-- Search and Create User Button -->
    <div class="mb-6 flex flex-col sm:flex-row items-center">
      <div class="w-full sm:w-1/3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by username"
          class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th
              class="px-4 py-2 text-left cursor-pointer"
              @click="sortTable('username')"
            >
              Username
              <span v-if="sortColumn === 'username'">
                <i
                  :class="
                    sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
                  "
                  class="ml-2"
                ></i>
              </span>
            </th>
            <th
              class="px-4 py-2 text-left cursor-pointer"
              @click="sortTable('email')"
            >
              Email
              <span v-if="sortColumn === 'email'">
                <i
                  :class="
                    sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
                  "
                  class="ml-2"
                ></i>
              </span>
            </th>
            <th
              class="px-4 py-2 text-left cursor-pointer"
              @click="sortTable('nama')"
            >
              Full Name
              <span v-if="sortColumn === 'nama'">
                <i
                  :class="
                    sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
                  "
                  class="ml-2"
                ></i>
              </span>
            </th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- If no users found -->
          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" class="text-center py-4 text-gray-500">
              Users Not Found
            </td>
          </tr>

          <!-- Loop through users -->
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-4 py-2">{{ user.username }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.nama }}</td>
            <td class="px-4 py-2 flex items-center gap-2">
              <!-- Edit Button -->
              <router-link :to="'/update-user/' + user.id">
                <button
                  class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2"
                >
                  <i class="fas fa-edit"></i> Edit
                </button>
              </router-link>
              <!-- Delete Button -->
              <button
                @click="deleteUser(user.id)"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      users: [],
      searchQuery: "",
      sortColumn: "",
      sortOrder: "asc",
    };
  },
  computed: {
    // Filter users based on the search query
    filteredUsers() {
      return this.users
        .filter((user) => {
          return user.username
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        })
        .sort(this.getSortFunction());
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // Fetch all users from the API
    async fetchUsers() {
      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error.response?.data?.error);
      }
    },

    // Sorting function
    sortTable(column) {
      if (this.sortColumn === column) {
        // Toggle the sort order if the same column is clicked
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        // Set the new column to be sorted
        this.sortColumn = column;
        this.sortOrder = "asc"; // Default to ascending order
      }
    },

    // Get the sorting function based on selected column and order
    getSortFunction() {
      if (!this.sortColumn) return () => 0; // No sorting
      return (a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
        if (aValue < bValue) return this.sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      };
    },

    // Delete a user
    async deleteUser(userId) {
      try {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const response = await api.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert(response.data.message); // Show success message
        this.fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Failed to delete user:", error.response?.data?.error);
      }
    },
  },
};
</script>
