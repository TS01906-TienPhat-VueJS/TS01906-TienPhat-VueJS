<script setup>
import { ref } from 'vue'

const form = ref({
  fullName: '',
  email: '',
  password: '',
  dob: '',
  gender: 'Nam',
  languages: []
})

const submitted = ref(false)

const submit = () => {
  submitted.value = true
}

const reset = () => {
  form.value = {
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: 'Nam',
    languages: []
  }
  submitted.value = false
}
</script>

<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 3 - Form đăng ký</h4>

    <form class="row g-3" @submit.prevent="submit">
      <div class="col-md-6">
        <label class="form-label">Họ tên</label>
        <input class="form-control" v-model="form.fullName" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input class="form-control" type="email" v-model="form.email" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Mật khẩu</label>
        <input class="form-control" type="password" v-model="form.password" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Ngày sinh</label>
        <input class="form-control" type="date" v-model="form.dob" />
      </div>

      <div class="col-md-6">
        <label class="form-label d-block">Giới tính</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" value="Nam" v-model="form.gender" />
          <label class="form-check-label">Nam</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" value="Nữ" v-model="form.gender" />
          <label class="form-check-label">Nữ</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" value="Khác" v-model="form.gender" />
          <label class="form-check-label">Khác</label>
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label d-block">Ngôn ngữ</label>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="Việt Nam" v-model="form.languages" />
          <label class="form-check-label">Việt Nam</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="English" v-model="form.languages" />
          <label class="form-check-label">English</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="Japanese" v-model="form.languages" />
          <label class="form-check-label">Japanese</label>
        </div>
      </div>

      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" type="submit">Đăng ký</button>
        <button class="btn btn-outline-secondary" type="button" @click="reset">Reset</button>
      </div>
    </form>

    <hr />

    <div v-if="submitted" class="alert alert-success">
      <h5 class="mb-2">Thông tin đã đăng ký</h5>
      <p class="mb-1"><b>Họ tên:</b> {{ form.fullName }}</p>
      <p class="mb-1"><b>Email:</b> {{ form.email }}</p>
      <p class="mb-1"><b>Ngày sinh:</b> {{ form.dob }}</p>
      <p class="mb-1"><b>Giới tính:</b> {{ form.gender }}</p>
      <p class="mb-0"><b>Ngôn ngữ:</b> {{ form.languages.join(', ') || '(Chưa chọn)' }}</p>
    </div>
  </div>
</template>
