<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">SOF308 Blog</RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/posts">Posts</RouterLink>
            </li>
          </ul>

          <div class="d-flex gap-2 align-items-center">
            <template v-if="user">
              <RouterLink class="btn btn-outline-light btn-sm" to="/posts/new">New Post</RouterLink>
              <RouterLink class="btn btn-outline-info btn-sm" to="/profile">Profile</RouterLink>
              <button class="btn btn-warning btn-sm" @click="doLogout">Logout</button>
            </template>

            <template v-else>
              <RouterLink class="btn btn-outline-light btn-sm" to="/login">Login</RouterLink>
              <RouterLink class="btn btn-success btn-sm" to="/register">Register</RouterLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="container my-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, logout } from '../services/auth'

const router = useRouter()
const user = ref(currentUser())

function syncUser() {
  user.value = currentUser()
}

function doLogout() {
  logout()
  syncUser()
  router.push({ name: 'Home' })
}

onMounted(() => {
  window.addEventListener('session-changed', syncUser)
})

onBeforeUnmount(() => {
  window.removeEventListener('session-changed', syncUser)
})
</script>
