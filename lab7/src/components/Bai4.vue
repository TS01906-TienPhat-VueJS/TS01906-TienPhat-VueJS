<script setup>
import { ref } from 'vue'
import LoginComponent from './LoginComponent.vue'
import CommentComponent from './CommentComponent.vue'

const isLoggedIn = ref(false)
const username = ref('')

const handleLogin = ({ username: u }) => {
  username.value = u
  isLoggedIn.value = true
}

const handleLogout = () => {
  username.value = ''
  isLoggedIn.value = false
}
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <!-- Nếu chưa login thì hiện form login -->
      <LoginComponent v-if="!isLoggedIn" @login="handleLogin" />

      <!-- Login xong thì hiện bình luận theo mẫu -->
      <CommentComponent
        v-else
        :username="username"
        @logout="handleLogout"
      />
    </div>
  </div>
</template>
