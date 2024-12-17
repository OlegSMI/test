<script setup lang="ts">
import { useWebApp } from "@/composables/useWebApp";
import { useRouter } from "vue-router";
import { RouteName } from "@/constants/route_name";
import { useCheckoutStore } from "@/store/checkout";
import { onBeforeUnmount, toRefs } from "vue";
import { on, postEvent } from "@tma.js/sdk";
import { getCalendarDate } from "@/helpers/date";
import { useOrderStore } from "@/store/order";
import { useCatalogStore } from "@/store/catalog";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { appConfig } from "@/config/app";
import { usePostFinalizeOrder } from "@/composables/API/usePostFinalizeOrder";
import dayjs from "dayjs";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";

const appStore = useAppStore();
const { user } = toRefs(useUserStore());
const router = useRouter();
const { isPlace, isTime, isBookedTime, isSeatNumber, isTableNumber } =
  toRefs(useCheckoutStore());
const { onResetCart } = useCheckoutStore();
const { isCurrentOrder } = toRefs(useOrderStore());
const { getActiveOrders, getCurrentOrder } = useOrderStore();
const { getMenu } = useCatalogStore();
//TWA
const { backButton, mainButton, popup } = useWebApp();
if (!backButton.isVisible) {
  backButton.show();
}
const onClickBackButton = on("back_button_pressed", () => {
  router.go(-1);
});
mainButton.setText("Подтвердить");
mainButton.enable();
if (!mainButton.isVisible) {
  mainButton.show();
}
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void onConfirmOrder();
});
const onConfirmOrder = async () => {
  const bookedDate = dayjs(isBookedTime.value).format("YYYY-MM-DD HH:mm:ss+03");
  const { statusCode, isFinished } = await usePostFinalizeOrder({
    orderId: isCurrentOrder.value?.orderId as number,
    bookedDate,
    seatingType: isPlace.value,
    chairId:
      isPlace.value === "reserved_table"
        ? (isSeatNumber.value as number)
        : undefined,
    tableId:
      isPlace.value === "reserved_table"
        ? (isTableNumber.value as number)
        : undefined,
  });
  if (isFinished.value) {
    if (statusCode.value === 200) {
      mainButton.hide();
      void popup
        .open({
          title: "Заказ подтвержден",
          message: `Номер для получения: ${user.value?.userNumber as string}`,
          buttons: [{ id: "close", type: "default", text: "OK" }],
        })
        .then(() => {
          appStore.setReady(false);
          onResetCart();
          void router.push({ name: RouteName.KITCHEN_HOME }).then(() => {
            void Promise.all([
              getMenu(),
              getActiveOrders(),
              getCurrentOrder(),
            ]).then(() => {
              appStore.setReady(true);
            });
          });
        });
    } else {
      void popup.open({
        title: "Ошибка",
        message: `Заказ не потвержден. Свяжитесь с менеджером.`,
        buttons: [{ id: "close", type: "default", text: "OK" }],
      });
    }
  }
};
onBeforeUnmount(() => {
  mainButton.disable();
  // remove event
  onClickBackButton();
  onClickMainButton();
});
</script>
<template>
  <div class="flex flex-col py-4">
    <div
      class="px-4 flex-[1_0_0] text-xl font-bold leading-6 tracking-[-0.45px] mt-4 mb-2"
    >
      Подтвердите ваш заказ
    </div>
    <h3
      class="px-4 text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mt-4 mb-2"
    >
      Место и время
    </h3>
    <div class="p-4">
      <div class="active-order flex items-center justify-between">
        <div class="flex flex-col gap-1">
          <span
            class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
          >
            {{
              isPlace === "pickup"
                ? `До ${appConfig.pickupTimeFinished}`
                : isTime?.replace(":0", ":00")
            }}
          </span>
          <span class="text-sm font-normal leading-[18px] tracking-[-0.154px]">
            {{ getCalendarDate(isBookedTime) }}
          </span>
        </div>
        <div class="flex flex-col gap-1 text-right">
          <span
            class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
          >
            {{
              isPlace === "pickup"
                ? "В свободной зоне"
                : `Стол ${isTableNumber}`
            }}
          </span>
          <span class="text-sm font-normal leading-[18px] tracking-[-0.154px]">
            {{ isPlace === "pickup" ? "или с собой" : `Место ${isSeatNumber}` }}
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
        v-for="(product, index) in isCurrentOrder?.foods"
        :key="index"
        class="flex items-center gap-3 py-2"
      >
        <ProductImage
          :src="product.photoUrl"
          class="min-w-12 min-h-12 w-12 h-12 rounded-3"
        />
        <div class="text-sm font-[510] leading-[18px] tracking-[-0.154px]">
          {{ product.name }}
        </div>
      </div>
    </div>
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
