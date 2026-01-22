<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-8">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title mb-3">My Profile</h3>

          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
          <div v-if="success" class="alert alert-success py-2">{{ success }}</div>

          <form @submit.prevent="onSave">
            <div class="mb-3">
              <label class="form-label">Avatar URL</label>
              <input v-model.trim="form.avatar" class="form-control" placeholder="https://..." />
              <div v-if="form.avatar" class="mt-2">
                <img :src="form.avatar" class="rounded border" style="width:88px; height:88px; object-fit:cover;" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model.trim="form.name" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model.trim="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">New Password (optional)</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Để trống nếu không đổi" />
            </div>

            <button class="btn btn-primary w-100">Save</button>
          </form>

          <hr class="my-4" />
          <div class="text-muted small">
            Tip: Đăng bài chỉ sửa/xóa được bài của chính bạn (đúng yêu cầu authentication cơ bản).
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { currentUser, updateProfile } from '../services/auth'

const error = ref('')
const success = ref('')

const form = reactive({
  avatar: '',
  name: '',
  email: '',
  password: '',
})

onMounted(() => {
  const u = currentUser()
  form.avatar = u?.avatar || ''
  form.name = u?.name || ''
  form.email = u?.email || ''
})

function onSave() {
  error.value = ''
  success.value = ''
  try {
    updateProfile(form)
    form.password = ''
    success.value = 'Cập nhật thành công!'
  } catch (e) {
    error.value = e?.message || 'Cập nhật thất bại.'
  }
}
</script>
