<script setup lang="ts">
import forkAndKnifeJSON from "@/assets/lottie/fork-and-knife.json";
import { LottieAnimation } from "lottie-web-vue";
import { onMounted, ref } from "vue";

const animationEl = ref();
const playAnimation = () => {
  animationEl.value?.goToAndPlay(0, true);
};
onMounted(() => {
  setTimeout(() => {
    animationEl.value;
  }, 500);
});
</script>
<template>
  <div
    class="flex flex-col items-center justify-center px-8 py-12"
    @click="playAnimation"
  >
    <LottieAnimation
      ref="animationEl"
      :animation-data="forkAndKnifeJSON"
      :auto-play="true"
      :loop="false"
      :speed="1"
      class="w-24 h-24 mb-3"
    />
    <div class="flex flex-col gap-1">
      <h1
        class="self-stretch text-center text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
      >
        Обед на следующий день<br />
        запланирован
      </h1>
      <p
        class="self-stretch text-center text-sm font-normal leading-[18px] tracking-[-0.154px]"
      >
        Планировать меню на последующие дни можно будет заранее за день
      </p>
    </div>
  </div>
</template>
