<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title mb-3">Login</h3>

          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model.trim="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>

            <button class="btn btn-primary w-100">Login</button>
          </form>

          <div class="mt-3 text-center">
            <RouterLink to="/register">Chưa có tài khoản? Register</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()
const route = useRoute()
const error = ref('')

const form = reactive({
  email: '',
  password: '',
})

async function onSubmit() {
  error.value = ''
  try {
    login(form)
    const redirect = route.query.redirect || '/posts'
    router.push(redirect)
  } catch (e) {
    error.value = e?.message || 'Login thất bại.'
  }
}
</script>
