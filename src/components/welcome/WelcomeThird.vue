<script setup lang="ts">
import tastyJSON from "@/assets/lottie/tasty.json";
import { LottieAnimation } from "lottie-web-vue";
import { onMounted, ref } from "vue";

const animationEl = ref();
onMounted(() => {
  setTimeout(() => {
    animationEl.value;
  }, 500);
});
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <LottieAnimation
      :animation-data="tastyJSON"
      :auto-play="true"
      :loop="true"
      :speed="1"
      ref="animationEl"
      class="w-24 h-24 mb-6"
    />
    <div class="flex flex-col gap-2">
      <h1
        class="self-stretch text-center text-xl font-bold leading-6 tracking-[-0.45px]"
      >
        Бронируйте стол ко времени<br />
        или только еду
      </h1>
      <p
        class="self-stretch text-center text-sm font-normal leading-[18px] tracking-[-0.154px]"
      >
        Можно запланировать прийти в любое<br />
        время, расположиться в зоне свободной<br />
        посадки или забрать еду с собой
      </p>
    </div>
  </div>
</template>
