<script setup>
import { ref } from 'vue'
import Bai1 from './components/Bai1.vue'
import Bai2 from './components/Bai2.vue'
import Bai3 from './components/Bai3.vue'
import Bai4 from './components/Bai4.vue'

const tab = ref(1)
</script>

<template>
  <div class="container py-4">
    <h2 class="mb-3">LAB 7</h2>

    <div class="btn-group mb-4">
      <button class="btn btn-outline-primary" @click="tab = 1">Bài 1</button>
      <button class="btn btn-outline-primary" @click="tab = 2">Bài 2</button>
      <button class="btn btn-outline-primary" @click="tab = 3">Bài 3</button>
      <button class="btn btn-outline-primary" @click="tab = 4">Bài 4</button>
    </div>

    <Bai1 v-if="tab === 1" />
    <Bai2 v-else-if="tab === 2" />
    <Bai3 v-else-if="tab === 3" />
    <Bai4 v-else />
  </div>
</template>
