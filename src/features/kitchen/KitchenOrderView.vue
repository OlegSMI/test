<script setup lang="ts">
import { useWebApp } from "@/composables/useWebApp";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { on, postEvent } from "@tma.js/sdk";
import { useState } from "@/helpers/utilities";
import { useRoute, useRouter } from "vue-router";
import type { IOrderDto } from "@/types/api/order.dto";
import { useOrderStore } from "@/store/order";
import { usePostCancelOrder } from "@/composables/API/usePostCancelOrder";
import { RouteName } from "@/constants/route_name";
import { getCalendarDate, getFormatDate } from "@/helpers/date";
import dayjs from "dayjs";
import { appConfig } from "@/config/app";
import { useAppStore } from "@/store/app";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const [isLoading, setLoading] = useState<boolean>(false);
const { getActiveOrderById, getActiveOrders, getCurrentOrder } =
  useOrderStore();

const order = computed<IOrderDto | undefined>(() => {
  return getActiveOrderById(Number(route?.params?.id));
});
const dateNow = ref(new Date());
const diffTimestampTime = computed(() => {
  const currentTimestampTime = dayjs(
    getFormatDate(dateNow.value, "YYYY-MM-DD HH:mm:ss"),
  );
  const orderDate = order.value?.bookedData.slice(0, 10);
  const endTimestampTime = dayjs(
    getFormatDate(
      new Date(),
      `${orderDate} ${appConfig.ordersTimeFinished}:00`,
    ),
  );
  return endTimestampTime.diff(currentTimestampTime, "seconds");
});

const timeForCancelOrder = computed(() => {
  const date =
    dayjs(order.value?.bookedData).add(-1, "day").toJSON().slice(0, 11) +
    appConfig.ordersTimeFinished;
  return getCalendarDate(date, {
    sameDay: "до HH:mm",
    nextDay: "до завтра, HH:mm",
    nextWeek: "до dd, HH:mm",
  });
});
let timeInterval;
onMounted(() => {
  timeInterval = setInterval(() => {
    dateNow.value = new Date();
  }, 1000);
});

// TWA
const { backButton, mainButton, popup, themeParams, miniApp } = useWebApp();
watchEffect(() => {
  if (appStore.isReady) {
    if (!backButton.isVisible) {
      backButton.show();
    }
  }
});
const onClickBackButton = on("back_button_pressed", () => {
  router.go(-1);
});

mainButton.setText("Отменить заказ");

if (!mainButton.isVisible) {
  mainButton.show();
}

watchEffect(() => {
  if (diffTimestampTime.value > 60 * 60 * 23.5) {
    mainButton.enable();
    mainButton.setParams({
      textColor: themeParams.buttonTextColor as `#${string}`,
      backgroundColor: themeParams.buttonColor as `#${string}`,
    });
  } else {
    mainButton.disable();
    mainButton.setParams({
      textColor: miniApp.isDark ? "#606060" : "#B9B9BA",
      backgroundColor: miniApp.isDark ? "#303031" : "#EFEFEF",
    });
  }
});

const onClickMainButton = on("main_button_pressed", () => {
  if (diffTimestampTime.value > 0) {
    postEvent("web_app_trigger_haptic_feedback", {
      type: "impact",
      impact_style: "medium",
    });
    void popup
      .open({
        title: "Отменить заказ?",
        message: "Можно будет сделать новый",
        buttons: [
          { id: "cancel", type: "default", text: "Не отменять" },
          { id: "close", type: "destructive", text: "Отменить" },
        ],
      })
      .then(async (result) => {
        if (result === "close") {
          await usePostCancelOrder({
            orderId: order.value?.orderId as number,
          }).then(() => {
            mainButton.hide();
            void popup
              .open({
                title: "Заказ отменен",
                message: "Ваш заказ успешно отменен",
                buttons: [{ id: "close", type: "default", text: "OK" }],
              })
              .then(() => {
                appStore.setReady(false);
                void router.push({ name: RouteName.KITCHEN_HOME }).then(() => {
                  void Promise.all([getCurrentOrder(), getActiveOrders()]).then(
                    () => {
                      appStore.setReady(true);
                    },
                  );
                });
              });
          });
        }
      });
  }
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
  mainButton.disable();
  mainButton.hideLoader();
  // remove event
  onClickBackButton();
  onClickMainButton();
});

watch(isLoading, () => {
  if (isLoading.value) {
    mainButton.showLoader();
  } else {
    mainButton.hideLoader();
  }
});
</script>

<template>
  <div
    class="flex flex-col justify-start min-h-[var(--tg-viewport-stable-height)]"
  >
    <div class="flex flex-col">
      <div
        class="px-4 flex-[1_0_0] text-xl font-bold leading-6 tracking-[-0.45px] mt-4 mb-2"
      >
        Ваш заказ
      </div>
      <h3
        class="px-4 text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mt-4 mb-2"
      >
        Место и время
      </h3>

      <div class="p-4">
        <div
          class="border border-text_color rounded-3 py-8 px-3 flex items-center justify-center"
        >
          <div class="flex flex-col gap-1 text-center">
            <span
              class="text-[28px] font-bold leading-[34px] tracking-[0.38px]"
            >
              {{ order?.userNumber }}
            </span>
            <span
              class="self-stretch text-sm font-normal leading-[18px] tracking-[-0.154px]"
            >
              Ваш номер для получения
            </span>
          </div>
        </div>
      </div>

      <div class="p-4">
        <div class="active-order flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <span
              class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
            >
              {{
                order?.seatingType === "pickup"
                  ? `До ${appConfig.pickupTimeFinished}`
                  : getFormatDate(order?.bookedData, "HH:mm")
              }}
            </span>
            <span
              class="text-sm font-normal leading-[18px] tracking-[-0.154px]"
            >
              {{ getCalendarDate(order?.bookedData) }}
            </span>
          </div>
          <div class="flex flex-col gap-1 text-right">
            <span
              class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
            >
              {{
                order?.seatingType === "pickup"
                  ? "В свободной зоне"
                  : `Стол ${order?.tableId}`
              }}
            </span>
            <span
              class="text-sm font-normal leading-[18px] tracking-[-0.154px]"
            >
              {{
                order?.seatingType === "pickup"
                  ? "или с собой"
                  : `Место ${order?.chairId}`
              }}
            </span>
          </div>
        </div>
      </div>

      <h3
        class="px-4 text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mt-4 mb-2"
      >
        Выбранные блюда
      </h3>
      <div class="px-4 flex flex-col">
        <div
          v-for="item in order?.foods"
          :key="item.id"
          class="flex items-center gap-3 py-2"
        >
          <ProductImage
            :src="item.photoUrl"
            class="w-12 h-12 rounded-3"
          />
          <div class="text-sm font-[510] leading-[18px] tracking-[-0.154px]">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <h3
      class="mt-auto p-4 text-hint_color text-center self-stretch text-sm font-[510] leading-[18px] tracking-[-0.154px]"
    >
      {{
        diffTimestampTime > 0
          ? `Отменить можно ${timeForCancelOrder}`
          : `После ${appConfig.ordersTimeFinished} отмена не доступна`
      }}
    </h3>
  </div>
</template>

<style lang="scss" scoped>
.active-order {
  @apply relative pl-[19px];
  &:before {
    @apply absolute left-0 top-0 bottom-0 h-full w-[3px] rounded-full bg-link_color;
    content: "";
  }
}
</style>
