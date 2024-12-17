<script setup lang="ts">
// import tastyJSON from "@/assets/lottie/tasty.json";
import { useWebApp } from "@/composables/useWebApp";
import AyaIcon from "@/components/icons/aya.vue";
// import { LottieAnimation } from "lottie-web-vue";
// import { onMounted, ref } from "vue";

const { mainButton } = useWebApp();
if (mainButton.isVisible) {
  mainButton.hide();
}
// const animationEl = ref();
// onMounted(() => {
//   setTimeout(() => {
//     animationEl.value;
//   }, 500);
// });
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-bg_color">
    <div class="logo">
      <AyaIcon class="w-[160px] text-button_color" />
    </div>
    <!--    <LottieAnimation-->
    <!--      ref="animationEl"-->
    <!--      :animation-data="tastyJSON"-->
    <!--      :auto-play="true"-->
    <!--      :loop="true"-->
    <!--      :speed="1"-->
    <!--      class="w-24 h-24 mb-6"-->
    <!--    />-->
  </div>
</template>
<style lang="scss" scoped>
.logo {
  animation: scaleAnim 0.6s alternate infinite ease-in;
}

@keyframes scaleAnim {
  100% {
    transform: scale(0.9);
  }
}
</style>
