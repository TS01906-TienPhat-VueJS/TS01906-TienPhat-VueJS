<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title mb-3">Register</h3>

          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model.trim="form.name" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model.trim="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" type="password" class="form-control" minlength="4" required />
            </div>

            <button class="btn btn-success w-100">Create account</button>
          </form>

          <div class="mt-3 text-center">
            <RouterLink to="/login">Đã có tài khoản? Login</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
})

async function onSubmit() {
  error.value = ''
  try {
    register(form)
    router.push({ name: 'Posts' })
  } catch (e) {
    error.value = e?.message || 'Register thất bại.'
  }
}
</script>
