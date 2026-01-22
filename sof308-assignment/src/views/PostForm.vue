<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-8">
      <div class="card shadow-sm">
        <div class="card-body">
          <h3 class="card-title mb-3">{{ isEdit ? 'Edit Post' : 'New Post' }}</h3>

          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input v-model.trim="form.title" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Image URL (optional)</label>
              <input v-model.trim="form.image" class="form-control" placeholder="https://..." />
              <div v-if="form.image" class="mt-2">
                <img :src="form.image" class="img-fluid rounded border" alt="preview" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Content</label>
              <textarea v-model.trim="form.content" class="form-control" rows="7" required></textarea>
            </div>

            <button class="btn btn-dark w-100">{{ isEdit ? 'Save' : 'Create' }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPost, getPostById, updatePost } from '../services/blog'

const route = useRoute()
const router = useRouter()
const error = ref('')

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  title: '',
  image: '',
  content: '',
})

watchEffect(() => {
  if (!isEdit.value) return
  const p = getPostById(String(route.params.id))
  if (!p) return
  form.title = p.title
  form.image = p.image || ''
  form.content = p.content
})

function onSubmit() {
  error.value = ''
  try {
    if (isEdit.value) {
      const p = updatePost(String(route.params.id), form)
      router.push({ name: 'PostDetail', params: { id: p.id } })
    } else {
      const p = createPost(form)
      router.push({ name: 'PostDetail', params: { id: p.id } })
    }
  } catch (e) {
    error.value = e?.message || 'Lưu bài thất bại.'
  }
}
</script>
