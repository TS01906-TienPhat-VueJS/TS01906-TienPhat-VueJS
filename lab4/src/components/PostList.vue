<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">Kiến thức sức khỏe cộng đồng</h1>

    <div class="row g-3">
      <div class="col-12 col-md-4" v-for="(item, i) in items" :key="i">
        <div class="card h-100">
          <img :src="item.image" class="card-img-top" :alt="item.title" />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.content }}</p>

            <button class="btn btn-info mt-auto" @click="viewDetail(item)">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import img1 from '../assets/images/orange_300x300.jpg'
import img2 from '../assets/images/sesameoil_300x300.jpg'
import img3 from '../assets/images/spinach_300x300.jpg'


const items = [
  {
    title: '8 loại rau củ quả giàu canxi',
    content: 'Canxi quan trọng cho xương. Một số loại rau củ giàu canxi có thể bổ sung mỗi ngày.',
    image: img1
  },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content: 'Một số gia vị quen thuộc như gừng, nghệ, tỏi... có lợi nếu dùng đúng cách.',
    image: img2
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content: 'Các loại đậu như đậu lăng, đậu nành, đậu đen... giàu protein và chất xơ.',
    image: img3
  }
]

function viewDetail(item) {
  alert(`Bạn chọn bài viết: ${item.title}`)
}
</script>
