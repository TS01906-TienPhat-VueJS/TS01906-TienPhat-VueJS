<template>
  <div class="card p-4">
    <h4 class="mb-3">Bài 1: Xếp loại theo điểm trung bình</h4>

    <label class="form-label">Nhập điểm trung bình (0 - 10):</label>
    <input
      type="number"
      class="form-control"
      v-model.number="dtb"
      min="0"
      max="10"
      step="0.1"
      placeholder="Ví dụ: 7.5"
    />

    <div class="mt-3" v-if="dtb !== null && dtb !== ''">
      <div v-if="dtb < 0 || dtb > 10" class="alert alert-danger mb-0">
        Điểm không hợp lệ! Vui lòng nhập từ 0 đến 10.
      </div>

      <div v-else class="alert alert-info mb-0">
        Xếp loại:
        <b v-if="dtb < 5">Yếu</b>
        <b v-else-if="dtb < 6.5">Trung bình</b>
        <b v-else-if="dtb < 8">Khá</b>
        <b v-else-if="dtb < 9">Giỏi</b>
        <b v-else>Xuất sắc</b>
      </div>
    </div>

    <!-- ví dụ v-show: hiện gợi ý khi chưa nhập -->
    <p class="text-muted mt-3 mb-0" v-show="dtb === null || dtb === ''">
      Nhập ĐTB để xem xếp loại.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dtb = ref(null)
</script>
