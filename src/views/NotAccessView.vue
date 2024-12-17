<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import animatedStickerJSON from "@/assets/lottie/animated-sticker.json";
import animatedStickerSecondJSON from "@/assets/lottie/animated-sticker-2.json";
import bubbleJSON from "@/assets/lottie/bubble.json";
import { LottieAnimation } from "lottie-web-vue";
import { onMounted, ref } from "vue";
import { useWebApp } from "@/composables/useWebApp";
import { useMousePressed } from "@vueuse/core";

const { utils } = useWebApp();
const animationContainerEl = ref();
const animationEl = ref();
const animationSecondEl = ref();
const animationThirdEl = ref();
onMounted(() => {
  setTimeout(() => {
    animationEl.value;
    animationSecondEl.value;
    animationThirdEl.value;
  }, 500);
});
const [parent] = useAutoAnimate();

const { pressed: isPressed } = useMousePressed({
  target: animationContainerEl,
});
</script>
<template>
  <div
    ref="parent"
    class="py-4 px-10 flex items-center h-screen"
  >
    <div class="m-auto">
      <div class="flex flex-col items-center justify-center">
        <div
          ref="animationContainerEl"
          class="relative p-6 -mt-6"
        >
          <LottieAnimation
            ref="animationEl"
            :animation-data="animatedStickerJSON"
            :auto-play="true"
            :loop="true"
            :speed="1"
            class="w-24 h-24"
          />
          <div
            v-if="isPressed"
            class="absolute top-6 z-20"
          >
            <LottieAnimation
              ref="animationSecondEl"
              :animation-data="animatedStickerSecondJSON"
              :auto-play="true"
              :loop="true"
              :speed="1"
              class="w-24 h-24 scale-[1.3]"
            />
          </div>
          <div
            v-if="isPressed"
            class="absolute top-6 z-10"
          >
            <LottieAnimation
              ref="animationThirdEl"
              :animation-data="bubbleJSON"
              :auto-play="true"
              :loop="false"
              :speed="0.75"
              class="w-24 scale-[3]"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h1
            class="self-stretch text-center text-xl font-bold leading-6 tracking-[-0.45px]"
          >
            Мы не смогли вас<br />
            идентифицировать среди<br />
            сотрудников компании<br />
            AYA Group
          </h1>
          <p
            class="self-stretch text-center text-sm font-normal leading-[18px] tracking-[-0.154px]"
          >
            Если вы считаете что это ошибка, свяжитесь с офис менеджером
            компании для получения доступа
          </p>
          <ul
            class="cursor-default text-link_color flex flex-col gap-4 mt-4 text-center self-stretch text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
          >
            <li @click="utils.openTelegramLink('https://t.me/@Amelia_T07')">
              Amelia
            </li>
            <li @click="utils.openTelegramLink('https://t.me/@Sidney_91')">
              Sidney
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
