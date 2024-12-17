<script setup lang="ts">
import { on, postEvent } from "@tma.js/sdk";
import { useWebApp } from "@/composables/useWebApp";
import { useState } from "@/helpers/utilities";
import router from "@/router";
import { RouteName } from "@/constants/route_name";
import { onBeforeUnmount, toRefs, watchEffect } from "vue";
import WelcomeFirst from "@/components/welcome/WelcomeFirst.vue";
import WelcomeSecond from "@/components/welcome/WelcomeSecond.vue";
import WelcomeThird from "@/components/welcome/WelcomeThird.vue";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import UIStepLine from "@/components/ui/UIStepLine/UIStepLine.vue";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";

const [isStep, setStep] = useState<number>(1);
const appStore = useAppStore();
const { hasAccessCount } = toRefs(useUserStore());
// TWA
const { mainButton, backButton } = useWebApp();
if (!backButton.isVisible && hasAccessCount.value > 1) {
  backButton.show();
}
const onClickMainButton = on("main_button_pressed", () => {
  onClickMainButtonHandler(isStep.value);
});
const onClickBackButton = on("back_button_pressed", () => {
  void router.push({ name: RouteName.SELECT_FEATURE });
});
watchEffect(() => {
  if (appStore.isReady) {
    mainButton.setText("Хорошо");
    if (!mainButton.isVisible) {
      mainButton.show();
      mainButton.enable();
    }
  }

  if (isStep.value === 1) {
    mainButton.setText("Хорошо");
  }
  if (isStep.value === 2) {
    mainButton.setText("Отлично");
  }
  if (isStep.value === 3) {
    mainButton.setText("К заказу");
  }
});
const onClickMainButtonHandler = (step: number) => {
  if (step === 3) {
    localStorage.setItem("welcome-hide", "true");
    void router.push({ name: RouteName.KITCHEN_HOME });
  } else {
    setStep(isStep.value + 1);
  }
};
const onPrevStep = () => {
  if (isStep.value > 1) {
    setStep(isStep.value - 1);
  } else {
    return;
  }
};
const [parent] = useAutoAnimate();

onBeforeUnmount(() => {
  // mainButton.disable();
  // remove event
  onClickMainButton();
  onClickBackButton();
});
</script>
<template>
  <div
    ref="parent"
    class="py-4 px-10 flex items-center h-screen"
  >
    <div class="fixed top-0 left-0 right-0 bottom-0 flex z-3">
      <div
        class="w-1/2 h-full"
        @click="onPrevStep"
      />
      <div
        class="w-1/2 h-full"
        @click="onClickMainButtonHandler(isStep)"
      />
    </div>

    <div class="m-auto">
      <UIStepLine
        :num-steps="3"
        :step="isStep"
      />
      <template v-if="isStep === 1">
        <WelcomeFirst />
      </template>

      <template v-if="isStep === 2">
        <WelcomeSecond />
      </template>

      <template v-if="isStep === 3">
        <WelcomeThird />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
