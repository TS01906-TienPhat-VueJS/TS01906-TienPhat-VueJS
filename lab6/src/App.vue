<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">LAB 6</h2>

    <div class="d-flex justify-content-center gap-2 flex-wrap mb-4">
      <button class="btn btn-outline-primary" @click="tab = 'bai1'">Bài 1</button>
      <button class="btn btn-outline-primary" @click="tab = 'bai2'">Bài 2</button>
      <button class="btn btn-outline-primary" @click="tab = 'bai3'">Bài 3</button>
      <button class="btn btn-outline-primary" @click="tab = 'bai4'">Bài 4</button>
    </div>

    <Bai1 v-if="tab === 'bai1'" />
    <Bai2 v-else-if="tab === 'bai2'" />
    <Bai3 v-else-if="tab === 'bai3'" />
    <Bai4 v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bai1 from './components/Bai1.vue'
import Bai2 from './components/Bai2.vue'
import Bai3 from './components/Bai3.vue'
import Bai4 from './components/Bai4.vue'

const tab = ref('bai1')
</script>
