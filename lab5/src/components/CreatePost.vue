<template>
  <div class="mt-4">
    <h2>Tạo bài viết mới</h2>

    <input v-model="title" class="form-control mb-3" placeholder="Tiêu đề bài viết" />
    <input v-model="author" class="form-control mb-3" placeholder="Tên tác giả" />
    <textarea v-model="content" class="form-control mb-3" rows="4" placeholder="Nội dung bài viết"></textarea>

    <button class="btn btn-primary" @click="submitPost">Đăng bài</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add-post'])

const title = ref('')
const author = ref('')
const content = ref('')

function submitPost() {
  if (title.value && author.value && content.value) {
    emit('add-post', { title: title.value, author: author.value, content: content.value })
    title.value = ''
    author.value = ''
    content.value = ''
  }
}
</script>
