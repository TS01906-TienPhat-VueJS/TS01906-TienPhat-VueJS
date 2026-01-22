<template>
  <div class="p-4 bg-light rounded border mb-4">
    <h1 class="h3 mb-2">Ứng dụng quản lý Blog</h1>
    <p class="mb-0">
      Demo Assignment SOF308: đăng ký/đăng nhập, đăng bài, bình luận, quản lý profile.
    </p>
  </div>

  <div class="d-flex align-items-center justify-content-between mb-3">
    <h2 class="h5 mb-0">Bài viết mới nhất</h2>
    <RouterLink class="btn btn-sm btn-dark" to="/posts">Xem tất cả</RouterLink>
  </div>

  <!-- CHƯA LOGIN: chỉ hiện thông báo -->
  <div v-if="!user" class="alert alert-warning">
    Bạn cần <b>đăng nhập</b> để xem bài viết mới nhất.
  </div>

  <!-- ĐÃ LOGIN: mới hiện danh sách bài -->
  <template v-else>
    <div v-if="posts.length === 0" class="alert alert-info">
      Chưa có bài viết nào. Hãy vào <b>Posts</b> và tạo bài viết mới!
    </div>

    <div v-else class="row g-3">
      <div v-for="p in posts" :key="p.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img
            v-if="p.image"
            :src="p.image"
            class="card-img-top"
            style="height: 180px; object-fit: cover;"
            alt="post"
          />

          <div class="card-body">
            <h5 class="card-title mb-1">{{ p.title }}</h5>
            <p class="text-muted small mb-2">
              by {{ p.authorName }} • {{ format(p.createdAt) }}
            </p>

            <p
              class="card-text"
              style="display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;"
            >
              {{ p.content }}
            </p>

            <!-- Home chỉ để xem -->
            <div class="d-flex gap-2 flex-wrap">
              <RouterLink
                class="btn btn-primary btn-sm"
                :to="{ name: 'PostDetail', params: { id: p.id } }"
              >
                View
              </RouterLink>
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
import { listPosts } from '../services/blog'
import { currentUser } from '../services/auth'

const posts = ref([])
const user = ref(currentUser())

function load() {
  posts.value = listPosts().slice(0, 6)
}

function syncUser() {
  user.value = currentUser()
  // nếu vừa login thì load bài luôn
  if (user.value) load()
}

function format(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
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
