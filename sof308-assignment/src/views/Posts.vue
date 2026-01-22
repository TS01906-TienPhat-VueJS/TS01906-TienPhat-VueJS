<template>
  <!-- CHƯA LOGIN -->
  <div v-if="!user" class="alert alert-warning">
    Bạn cần <b>đăng nhập</b> để xem danh sách bài viết.
  </div>

  <!-- ĐÃ LOGIN -->
  <template v-else>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h4 mb-0">Posts</h2>
      <RouterLink class="btn btn-sm btn-dark" to="/posts/new">+ New</RouterLink>
    </div>

    <div v-if="posts.length === 0" class="alert alert-info mt-3">
      Chưa có bài viết nào. Hãy tạo bài viết mới!
    </div>

    <div v-else class="row g-3">
      <div v-for="p in posts" :key="p.id" class="col-12 col-md-6">
        <div class="card h-100 shadow-sm">
          <img
            v-if="p.image"
            :src="p.image"
            class="card-img-top"
            style="height:200px; object-fit:cover;"
          />

          <div class="card-body">
            <h5 class="card-title">{{ p.title }}</h5>
            <p class="card-text text-muted small mb-2">
              by {{ p.authorName }} • {{ format(p.createdAt) }}
            </p>

            <p
              class="card-text"
              style="display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;"
            >
              {{ p.content }}
            </p>

            <div class="d-flex gap-2">
              <RouterLink
                class="btn btn-primary btn-sm"
                :to="{ name: 'PostDetail', params: { id: p.id } }"
              >
                View
              </RouterLink>

              <RouterLink
                v-if="user && user.id === p.authorId"
                class="btn btn-outline-secondary btn-sm"
                :to="{ name: 'PostEdit', params: { id: p.id } }"
              >
                Edit
              </RouterLink>

              <button
                v-if="user && user.id === p.authorId"
                class="btn btn-outline-danger btn-sm"
                @click="onDelete(p.id)"
              >
                Delete
              </button>
            </div>
          </div>

          <div class="card-footer text-muted small">
            {{ (p.comments?.length || 0) }} comments
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { currentUser } from '../services/auth'
import { deletePost, listPosts } from '../services/blog'

const user = ref(currentUser())
const posts = ref([])

function load() {
  // Chỉ load posts khi đã login
  if (!user.value) {
    posts.value = []
    return
  }
  posts.value = listPosts()
}

function syncUser() {
  user.value = currentUser()
  load()
}

function format(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function onDelete(id) {
  if (!confirm('Xóa bài viết này?')) return
  try {
    deletePost(id)
    load()
  } catch (e) {
    alert(e?.message || 'Xóa thất bại.')
  }
}

onMounted(() => {
  syncUser()
  window.addEventListener('session-changed', syncUser)
})

onBeforeUnmount(() => {
  window.removeEventListener('session-changed', syncUser)
})
</script>
