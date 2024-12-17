<script setup lang="ts">
import pieJSON from "@/assets/lottie/pie.json";
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
      :animation-data="pieJSON"
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
        Выбирайте любые блюда<br />
        и напитки на завтра
      </h1>
      <p
        class="self-stretch text-center text-sm font-normal leading-[18px] tracking-[-0.154px]"
      >
        Каждый день доступно новое меню,<br />
        в котором можно выбрать то, что вы<br />
        будете есть на обед завтра
      </p>
    </div>
  </div>
</template>
