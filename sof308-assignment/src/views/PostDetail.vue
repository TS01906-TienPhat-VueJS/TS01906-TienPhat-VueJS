<template>
  <div v-if="post" class="card shadow-sm">
    <img v-if="post.image" :src="post.image" class="card-img-top" style="height:320px; object-fit:cover;" />
    <div class="card-body">
      <h2 class="h4">{{ post.title }}</h2>
      <p class="text-muted small">
        by {{ post.authorName }} • {{ format(post.createdAt) }}
      </p>

      <p style="white-space:pre-line;">{{ post.content }}</p>

      <hr />

      <div class="d-flex align-items-center justify-content-between">
        <h3 class="h6 mb-0">Comments ({{ post.comments?.length || 0 }})</h3>
        <span v-if="!user" class="text-muted small">Login để bình luận</span>
      </div>

      <form v-if="user" class="mt-2" @submit.prevent="submitComment">
        <div class="input-group">
          <input v-model.trim="commentText" class="form-control" placeholder="Nhập bình luận..." required />
          <button class="btn btn-dark">Send</button>
        </div>
      </form>

      <div class="mt-3">
        <div v-for="c in post.comments" :key="c.id" class="border rounded p-2 mb-2">
          <div class="d-flex justify-content-between">
            <b>{{ c.userName }}</b>
            <span class="text-muted small">{{ format(c.createdAt) }}</span>
          </div>
          <div>{{ c.content }}</div>
        </div>

        <div v-if="(post.comments?.length || 0) === 0" class="text-muted">
          Chưa có bình luận.
        </div>
      </div>
    </div>
  </div>

  <div v-else class="alert alert-warning">
    Không tìm thấy bài viết.
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { currentUser } from '../services/auth'
import { addComment, getPostById } from '../services/blog'

const route = useRoute()
const user = computed(() => currentUser())

const post = ref(null)
const commentText = ref('')

function load() {
  post.value = getPostById(String(route.params.id))
}

function format(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function submitComment() {
  try {
    addComment(String(route.params.id), commentText.value)
    commentText.value = ''
    load()
  } catch (e) {
    alert(e?.message || 'Bình luận thất bại.')
  }
}

watchEffect(load)
</script>
