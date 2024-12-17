<script setup lang="ts">
import UIRadioButton from "@/components/ui/UIRadioButton/UIRadioButton.vue";
import UICheckbox from "@/components/ui/UICheckbox/UICheckbox.vue";
import { useTaskView } from "@/features/task/useTaskView";
import { useWebApp } from "@/composables/useWebApp";
import { useRouter } from "vue-router";
import { onBeforeUnmount, toRefs, watchEffect } from "vue";
import { on, postEvent } from "@tma.js/sdk";
import { useUserStore } from "@/store/user";
import { RouteName } from "@/constants/route_name";

const router = useRouter();
const { hasAccessCount } = toRefs(useUserStore());
const { topics, activeTopic } = useTaskView();
const onUpdateActiveTopic = (v: number) => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "light",
  });
  activeTopic.value = v;
};
const { backButton, mainButton } = useWebApp();
mainButton.setText("Продолжить");

if (!mainButton.isVisible) {
  mainButton.show();
}
if (!mainButton.isEnabled) {
  mainButton.enable();
}

const onClickBackButton = on("back_button_pressed", () => {
  void router.go(-1);
});
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void router.push({ name: RouteName.TASK_MESSAGE });
});

watchEffect(() => {
  if (backButton.isVisible && hasAccessCount.value === 1) {
    backButton.hide();
  }
  if (!backButton.isVisible && hasAccessCount.value > 1) {
    backButton.show();
  }
});

onBeforeUnmount(() => {
  // remove event
  onClickBackButton();
  onClickMainButton();
});
</script>

<template>
  <div class="w-full h-full max-w-[600px] mx-auto p-4">
    <div
      class="flex-[1_0_0] text-xl font-bold leading-6 tracking-[-0.45px] my-4"
    >
      Выберите тему
    </div>
    <div class="flex flex-col gap-3">
      <UIRadioButton
        v-for="topic in topics"
        :key="topic.id"
        v-model="activeTopic"
        :value="topic.id"
        size="full"
        @update:model-value="onUpdateActiveTopic"
      >
        <div class="w-full flex gap-2">
          <div class="flex flex-col flex-1 gap-1">
            <div class="text-base font-medium">{{ topic.title }}</div>
            <div class="text-xs transition-all text-subtitle_text_color">
              {{ topic.text }}
            </div>
          </div>
          <UICheckbox
            :model-value="activeTopic === topic.id"
            inert
            shape="round"
          />
        </div>
      </UIRadioButton>
    </div>
  </div>
</template>
