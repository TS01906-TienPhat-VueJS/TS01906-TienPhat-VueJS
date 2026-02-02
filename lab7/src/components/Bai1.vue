<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([
  { id: 1, name: 'Học Vue' },
  { id: 2, name: 'Làm Lab 7' }
])

const addTask = () => {
  const name = newTask.value.trim()
  if (!name) return
  tasks.value.unshift({ id: Date.now(), name })
  newTask.value = ''
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 1 - Quản lý công việc</h4>

    <form class="row g-2" @submit.prevent="addTask">
      <div class="col-sm-9">
        <input
          class="form-control"
          v-model="newTask"
          placeholder="Nhập công việc..."
        />
      </div>
      <div class="col-sm-3 d-grid">
        <button class="btn btn-primary" type="submit">Thêm công việc</button>
      </div>
    </form>

    <hr />

    <ul class="list-group">
      <li
        v-for="t in tasks"
        :key="t.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ t.name }}</span>
        <button class="btn btn-sm btn-danger" @click="removeTask(t.id)">Xóa</button>
      </li>
    </ul>

    <p v-if="tasks.length === 0" class="text-muted mt-3 mb-0">
      Chưa có công việc nào.
    </p>
  </div>
</template>
