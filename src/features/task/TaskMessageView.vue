<script setup lang="ts">
import { useTaskView } from "@/features/task/useTaskView";
import UITextarea from "@/components/ui/UITextarea/UITextarea.vue";
import { useWebApp } from "@/composables/useWebApp";
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from "vue";
import { useRouter } from "vue-router";
import { on, Popup, postEvent, retrieveLaunchParams } from "@tma.js/sdk";
import { usePostCreateSupportTicket } from "@/composables/API/support/usePostCreateSupportTicket";
import { RouteName } from "@/constants/route_name";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useUserStore } from "@/store/user";

const targetEl = ref();
const { hasAccessCount } = toRefs(useUserStore());
const { hasFocus, activate, deactivate } = useFocusTrap(targetEl);
const popup = new Popup("7.0", postEvent);
const { initData } = retrieveLaunchParams();
const router = useRouter();
const isShow = ref<boolean>(false);
const { message, activeTopic, onResetForm } = useTaskView();
const { backButton, mainButton } = useWebApp();

mainButton.setText("Отправить");
if (!backButton.isVisible) {
  backButton.show();
}
if (!mainButton.isVisible) {
  mainButton.show();
}

const onClickBackButton = on("back_button_pressed", () => {
  void router.go(-1);
});
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void popup
    .open({
      title: "Подтверждение",
      message: "Отправить сообщение?",
      buttons: [
        { id: "cancel", type: "default", text: "Отправить" },
        { id: "close", type: "destructive", text: "Отменить" },
      ],
    })
    .then(async (result) => {
      if (result !== "close") {
        mainButton.disable();
        mainButton.showLoader();
        const { statusCode, isFinished } = await usePostCreateSupportTicket({
          topic_id: String(activeTopic.value),
          question: message.value,
          telegram_id: String(initData?.user?.id),
        });

        if (isFinished.value) {
          mainButton.hideLoader();
          if (statusCode.value === 200) {
            void popup
              .open({
                title: "Успешно",
                message:
                  "Сообщение отправлено. Скоро с Вами свяжется менеджер.",
                buttons: [{ id: "close", type: "default", text: "OK" }],
              })
              .then(async () => {
                if (hasAccessCount.value > 1) {
                  await router
                    .push({ name: RouteName.SELECT_FEATURE })
                    .finally(() => {
                      onResetForm();
                    });
                } else {
                  await router
                    .push({ name: RouteName.TASK_SELECT_TOPIC })
                    .finally(() => {
                      onResetForm();
                    });
                }
              });
          } else {
            void popup.open({
              title: "Ошибка",
              message: "Сообщение не отправлено. Попробуйте еще раз.",
              buttons: [{ id: "close", type: "default", text: "OK" }],
            });
          }
          mainButton.enable();
        }
      }
    });
});

watchEffect(() => {
  if (!message.value?.length) {
    mainButton.hide();
  } else {
    mainButton.show();
  }
});
const reveal = async () => {
  isShow.value = true;

  await nextTick();
  activate();
};
onMounted(() => {
  setTimeout(() => {
    void reveal();
  }, 300);
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
      Сообщение
    </div>
    <UITextarea
      v-if="isShow"
      ref="targetEl"
      v-model="message"
      class="text-base"
    />
  </div>
</template>
