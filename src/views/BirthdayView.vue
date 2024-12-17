<script setup lang="ts">
import { on, postEvent } from "@tma.js/sdk";
import { useWebApp } from "@/composables/useWebApp";
import { RouteName } from "@/constants/route_name";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { computed, onBeforeUnmount, ref, toRefs, watchEffect } from "vue";
import { useRouter } from "vue-router";
import cakeJSON from "@/assets/lottie/cake.json";
import confettiJSON from "@/assets/lottie/confetti.json";
import { LottieAnimation } from "lottie-web-vue";
import { useState } from "@/helpers/utilities";
import { useMousePressed } from "@vueuse/core";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { getFormatDate } from "@/helpers/date";

const appStore = useAppStore();
const { birthdays, hasAccessCount, hasKitchenAccess, hasTaskAccess } =
  toRefs(useUserStore());
const buttonLikeEl = ref();
const { pressed: isPressed } = useMousePressed({ target: buttonLikeEl });
const [parent] = useAutoAnimate();
const router = useRouter();
const computedColumnClass = computed(() => {
  let columnClass = "grid-cols-1";
  if (birthdays.value?.length >= 8 && birthdays.value?.length <= 12) {
    columnClass = "grid-cols-2";
  } else if (birthdays.value?.length > 12) {
    columnClass = "grid-cols-3";
  }
  return columnClass;
});
const numLike = ref(0);
const [isLiked, setLiked] = useState<boolean>(false);
const [isShowConfetti, setShowConfetti] = useState<boolean>(false);
const onSetNumLike = () => {
  if (numLike.value > 0) {
    numLike.value--;
    setLiked(false);
  } else {
    numLike.value++;
    setLiked(true);
    setShowConfetti(true);
  }
};

// TWA
const { mainButton } = useWebApp();
watchEffect(() => {
  if (!mainButton.isVisible && appStore.isReady) {
    mainButton.show();
    mainButton.enable();
  }

  if (hasAccessCount.value > 1) {
    mainButton.setText("Продолжить");
  } else {
    if (hasKitchenAccess.value) {
      mainButton.setText("К заказу");
    }
    if (hasTaskAccess.value) {
      mainButton.setText("+ Task");
    }
  }
});
const onClickMainButton = on("main_button_pressed", () => {
  localStorage.setItem(
    "onboarding-birthday-hide-date",
    getFormatDate(new Date()),
  );
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  if (hasAccessCount.value > 1) {
    void router.push({ name: RouteName.SELECT_FEATURE });
  } else {
    if (hasTaskAccess.value) {
      void router.push({ name: RouteName.TASK_SELECT_TOPIC });
    }
    if (hasKitchenAccess.value) {
      void router.push({ name: RouteName.KITCHEN_HOME });
    }
  }
});

onBeforeUnmount(() => {
  mainButton.disable();
  // remove event
  onClickMainButton();
});
</script>
<template>
  <div
    ref="parent"
    class="py-4 px-10 flex items-center h-screen"
  >
    <div class="m-auto flex flex-col items-center">
      <LottieAnimation
        ref="animationEl"
        :animation-data="cakeJSON"
        :auto-play="true"
        :loop="true"
        :speed="1"
        class="w-24 h-24 mb-6"
      />
      <h1
        class="self-stretch text-center text-xl font-bold leading-6 tracking-[-0.45px] mb-2"
      >
        Поздравляем коллег с днём рождения!
      </h1>
      <ul
        class="mb-3 grid justify-center w-fit mx-auto gap-x-3"
        :class="computedColumnClass"
      >
        <li
          v-for="(item, index) in birthdays"
          :key="index"
          class="text-center"
        >
          {{ item?.nickname }}
        </li>
      </ul>
      <div class="relative w-fit">
        <button
          ref="buttonLikeEl"
          class="flex items-center gap-1 py-2 px-3 rounded-full cursor-default transition-all"
          :class="[
            isLiked ? 'bg-button_color' : 'bg-tertiary',
            isPressed ? 'scale-[0.86]' : 'scale-1',
          ]"
          @click="onSetNumLike"
        >
          <img
            src="/image/emoji-birthday.webp"
            alt=""
            class="w-6 h-6"
          />
          <!-- <span
            v-show="numLike > 0"
            class="text-sm font-normal leading-[18px] tracking-[-0.154px]"
          >
            {{ numLike }}
          </span> -->
        </button>
        <div
          v-if="isShowConfetti"
          class="absolute right-0 bottom-0 translate-x-7 translate-y-24"
        >
          <LottieAnimation
            ref="animationEl"
            :animation-data="confettiJSON"
            :auto-play="true"
            :loop="1"
            :speed="1"
            class="w-[240px] h-[240px]"
            @complete="setShowConfetti(false)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
