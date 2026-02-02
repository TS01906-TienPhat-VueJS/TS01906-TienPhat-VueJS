<template>
  <div class="mt-4">
    <h2>Danh sách bài viết</h2>

    <div v-for="(post, index) in posts" :key="index" class="border rounded p-4 mt-3">
      <h3 class="text-success">{{ post.title }}</h3>
      <h5 class="text-danger">{{ post.author }}</h5>
      <p class="mb-0">{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: { posts: { type: Array, required: true } }
}
</script>
