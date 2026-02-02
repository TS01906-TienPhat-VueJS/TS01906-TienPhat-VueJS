<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 2: Nhập tháng và in ra mùa</h4>

    <label class="form-label">Nhập tháng của bạn:</label>
    <input
      type="number"
      class="form-control"
      v-model.number="month"
      placeholder="1 - 12"
      min="1"
      max="12"
    />

    <div class="mt-3">
      <p v-if="month === null || month === ''" class="text-muted mb-0">
        Hãy nhập tháng (1 - 12).
      </p>

      <p v-else-if="month < 1 || month > 12" class="text-danger mb-0">
        Vui lòng nhập tháng từ 1 đến 12!
      </p>

      <p v-else-if="month >= 1 && month <= 3" class="mb-0"><b>Mùa Xuân</b></p>
      <p v-else-if="month <= 6" class="mb-0"><b>Mùa Hè</b></p>
      <p v-else-if="month <= 9" class="mb-0"><b>Mùa Thu</b></p>
      <p v-else class="mb-0"><b>Mùa Đông</b></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const month = ref(null)
</script>
