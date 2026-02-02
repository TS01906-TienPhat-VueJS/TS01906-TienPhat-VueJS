<script setup>
import { ref } from 'vue'

const props = defineProps({
  username: { type: String, required: true }
})
const emit = defineEmits(['logout'])

const comment = ref('')
const comments = ref([])

const addComment = () => {
  const c = comment.value.trim()
  if (!c) return
  comments.value.push(`${props.username}: ${c}`)
  comment.value = ''
}
</script>

<template>
  <div class="card" style="max-width: 420px;">
    <div class="card-header fw-bold">
      Bình luận bài viết
    </div>

    <!-- Ảnh -->
    <img
      class="card-img-top"
      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=60"
      alt="Ảnh rau củ"
    />

    <div class="card-body">
      <h5 class="card-title mb-2">8 loại rau củ quả giàu canxi</h5>
      <p class="card-text text-muted" style="font-size: 14px;">
        Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi,
        trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...
      </p>

      <div class="mb-2">
        <input
          class="form-control"
          v-model="comment"
          placeholder="Nhập bình luận của bạn"
        />
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-success" @click="addComment">Gửi bình luận</button>
        <button class="btn btn-outline-secondary" @click="emit('logout')">Đăng xuất</button>
      </div>

      <hr />

      <div class="fw-bold mb-2">Danh sách các bình luận:</div>
      <div v-if="comments.length === 0" class="text-muted" style="font-size: 14px;">
        Chưa có bình luận.
      </div>
      <ul v-else class="mb-0" style="font-size: 14px;">
        <li v-for="(c, i) in comments" :key="i">{{ c }}</li>
      </ul>
    </div>
  </div>
</template>
