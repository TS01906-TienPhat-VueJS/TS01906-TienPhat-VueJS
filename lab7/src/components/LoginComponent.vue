<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')
const err = ref('')

const submit = () => {
  err.value = ''
  if (!username.value.trim() || !password.value.trim()) {
    err.value = 'Vui lòng nhập đầy đủ tên và mật khẩu.'
    return
  }
  emit('login', { username: username.value.trim() })
  username.value = ''
  password.value = ''
}
</script>

<template>
  <div class="card p-4">
    <h5 class="mb-3">Đăng nhập</h5>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Tên</label>
        <input class="form-control" v-model="username" placeholder="Nhập tên..." />
      </div>

      <div class="mb-2">
        <label class="form-label">Mật khẩu</label>
        <input class="form-control" type="password" v-model="password" placeholder="Nhập mật khẩu..." />
      </div>

      <p v-if="err" class="text-danger">{{ err }}</p>

      <button class="btn btn-primary" type="submit">Đăng nhập</button>
    </form>
  </div>
</template>
