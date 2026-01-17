<template>
  <div style="padding:16px; text-align:center">
    <h2>{{ greeting }}</h2>

    <button :title="hint" @click="changeGreeting">
      Click để đổi lời chào
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: "Xin chào bạn!",
      hint: "Nhấn để đổi lời chào"
    };
  },
  methods: {
    changeGreeting() {
      this.greeting = "Hello World!";
      this.hint = "Đã đổi xong!";
    }
  }
};
</script>
