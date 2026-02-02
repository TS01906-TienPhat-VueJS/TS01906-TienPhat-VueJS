<template>
  <div id="app">
    <h1>LAB 5 - FPT POLYTECHNIC</h1>

    <Bai1 />
    <Bai2 />
    <Bai3 />
    <CreatePost />
    <PostList />

  </div>
</template>

<script setup>
// Import từng bài vào đây
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import CreatePost from './components/CreatePost.vue';
import PostList from './components/PostList.vue';

</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>