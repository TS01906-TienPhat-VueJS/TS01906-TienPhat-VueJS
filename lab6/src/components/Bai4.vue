<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 4: CRUD quản lý học sinh</h4>

    <!-- FORM -->
    <form @submit.prevent="onSubmit" class="row g-3">
      <div class="col-12">
        <label class="form-label">Họ tên</label>
        <input v-model.trim="form.name" class="form-control" placeholder="Nhập họ tên" />
      </div>

      <div class="col-12 col-md-4">
        <label class="form-label">Điểm</label>
        <input v-model.number="form.score" type="number" step="0.1" class="form-control" placeholder="0 - 10" />
      </div>

      <div class="col-12 col-md-8">
        <label class="form-label">Ngày sinh</label>
        <input v-model="form.dob" type="date" class="form-control" />
      </div>

      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" type="submit">
          {{ editingIndex === -1 ? 'Thêm' : 'Cập nhật' }}
        </button>
        <button class="btn btn-secondary" type="button" @click="resetForm">Làm mới</button>
      </div>

      <div class="col-12" v-if="error">
        <div class="alert alert-danger mb-0">{{ error }}</div>
      </div>
    </form>

    <hr class="my-4" />

    <!-- DANH SÁCH -->
    <h5 class="mb-3">Danh sách học sinh</h5>

    <div v-if="students.length === 0" class="text-muted">Chưa có học sinh nào.</div>

    <table v-else class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th style="width: 60px;">#</th>
          <th>Họ tên</th>
          <th style="width: 120px;">Điểm</th>
          <th style="width: 140px;">Ngày sinh</th>
          <th style="width: 160px;">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, i) in students" :key="s.id">
          <td>{{ i + 1 }}</td>
          <td>{{ s.name }}</td>
          <td>{{ s.score }}</td>
          <td>{{ s.dob }}</td>
          <td class="d-flex gap-2">
            <button class="btn btn-sm btn-warning" @click="editStudent(i)">Sửa</button>
            <button class="btn btn-sm btn-danger" @click="deleteStudent(i)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const students = ref([
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, dob: '2004-01-01' }
])

const form = ref({ name: '', score: null, dob: '' })
const editingIndex = ref(-1)
const error = ref('')

function validate() {
  if (!form.value.name) return 'Vui lòng nhập họ tên.'
  if (form.value.score === null || form.value.score === '') return 'Vui lòng nhập điểm.'
  if (form.value.score < 0 || form.value.score > 10) return 'Điểm phải từ 0 đến 10.'
  if (!form.value.dob) return 'Vui lòng chọn ngày sinh.'
  return ''
}

function onSubmit() {
  error.value = validate()
  if (error.value) return

  if (editingIndex.value === -1) {
    students.value.push({
      id: Date.now(),
      name: form.value.name,
      score: form.value.score,
      dob: form.value.dob
    })
  } else {
    students.value[editingIndex.value] = {
      ...students.value[editingIndex.value],
      name: form.value.name,
      score: form.value.score,
      dob: form.value.dob
    }
  }

  resetForm()
}

function editStudent(i) {
  editingIndex.value = i
  form.value = {
    name: students.value[i].name,
    score: students.value[i].score,
    dob: students.value[i].dob
  }
  error.value = ''
}

function deleteStudent(i) {
  students.value.splice(i, 1)
  if (editingIndex.value === i) resetForm()
}

function resetForm() {
  form.value = { name: '', score: null, dob: '' }
  editingIndex.value = -1
  error.value = ''
}
</script>
