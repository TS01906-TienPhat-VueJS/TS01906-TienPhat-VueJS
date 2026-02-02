<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const login = () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) emailError.value = 'Email là bắt buộc.'
  else if (!emailRegex.test(email.value)) emailError.value = 'Vui lòng nhập email hợp lệ.'

  if (!password.value) passwordError.value = 'Mật khẩu là bắt buộc.'

  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true
  }
}

const logout = () => {
  isLoggedIn.value = false
  email.value = ''
  password.value = ''
  emailError.value = ''
  passwordError.value = ''
}
</script>

<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 2 - Form đăng nhập</h4>

    <div v-if="!isLoggedIn" class="col-sm-6">
      <h5>Form Đăng nhập</h5>

      <form @submit.prevent="login">
        <div class="mb-3 mt-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" v-model="email" placeholder="Nhập email" />
          <p v-if="emailError" class="text-danger mb-0">{{ emailError }}</p>
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu:</label>
          <input type="password" class="form-control" v-model="password" placeholder="Nhập mật khẩu" />
          <p v-if="passwordError" class="text-danger mb-0">{{ passwordError }}</p>
        </div>

        <button type="submit" class="btn btn-primary">Đăng nhập</button>
      </form>
    </div>

    <div v-else class="col-sm-8">
      <h5>Chào mừng, {{ email }}!</h5>
      <button class="btn btn-secondary" @click="logout">Đăng xuất</button>
    </div>
  </div>
</template>
