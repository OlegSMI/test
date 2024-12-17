<script setup lang="ts">
import { useWebApp } from "@/composables/useWebApp";
import { useRouter } from "vue-router";
import UIButton from "@/components/ui/UIButton/UIButton.vue";
import UIIcon from "@/components/ui/UIIcon/UIIcon.vue";
import { RouteName } from "@/constants/route_name";
import { useCheckoutStore } from "@/store/checkout";
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import { on, postEvent } from "@tma.js/sdk";
import { useGetTablesAndFreeChairByTime } from "@/composables/API/useGetTablesAndFreeChairByTime";
import dayjs from "dayjs";
import { useCatalogStore } from "@/store/catalog";
import { useOrderStore } from "@/store/order";
import { useAppStore } from "@/store/app";

const router = useRouter();
const appStore = toRefs(useAppStore());
const { isDateOfMenu } = toRefs(useCatalogStore());
const { isPlace, isTime, isTableNumber, isSeatNumber, isAvailableTime } =
  toRefs(useCheckoutStore());

const { isCurrentOrder } = toRefs(useOrderStore());
const { setPlace, setTime, setTableNumber, setSeatNumber } = useCheckoutStore();
watchEffect(() => {
  if (
    isPlace.value === "reserved_table" &&
    !isTime.value &&
    isAvailableTime.value
  ) {
    setTime(isAvailableTime.value?.data?.[0]?.time as string);
  }
});
const getTableReqConfig = reactive({
  bookedDate: "",
});
const onSetBookedDate = () => {
  const time = isTime.value?.replace(".", ":") + ":00";
  const d = dayjs(isDateOfMenu.value?.slice(0, 11) + time);
  Object.assign(getTableReqConfig, {
    bookedDate: String(dayjs(d).unix()),
  });
};
const { data, execute } = useGetTablesAndFreeChairByTime(getTableReqConfig, {
  immediate: false,
  refetch: true,
});
watch(isTime, async (value, oldValue) => {
  if (value !== oldValue) {
    if (isTime.value && isDateOfMenu.value) {
      onSetBookedDate();
      await execute();
    }
    // console.log(data);
  }
});
watchEffect(() => {
  if (
    isTime.value &&
    isDateOfMenu.value &&
    isPlace.value === "reserved_table" &&
    !isTableNumber.value &&
    !isSeatNumber.value
  ) {
    onSetBookedDate();
    void execute();
  }
  if (data?.value) {
    if (!isTableNumber.value) {
      setTableNumber(data?.value?.data?.[0]?.table_number);
    }
    if (!isSeatNumber.value) {
      setSeatNumber(data?.value?.data?.[0]?.chairs[0]?.position);
    }
  }
});
onMounted(() => {
  if (!isTime.value) {
    setTime(isAvailableTime.value?.data?.[0]?.time as string);
  }
});

const onSetPlace = (place: string) => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "light",
  });
  setPlace(place);
};
const onSetTime = (time: string) => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "light",
  });
  setTime(time);
};
//TWA
const { backButton, mainButton } = useWebApp();
if (!backButton.isVisible) {
  backButton.show();
}
const onClickBackButton = on("back_button_pressed", () => {
  router.go(-1);
});

mainButton.enable();
const setMainButton = () => {
  if (isPlace.value === "reserved_table") {
    mainButton.setText("Забронировать место");
  } else {
    // mainButton.setText("Забронировать без места");
    mainButton.setText("К подтверждению заказа");
  }
};
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void router.push({ name: RouteName.KITCHEN_CART_CONFIRM });
});

onBeforeMount(() => {
  setMainButton();
});

onBeforeUnmount(() => {
  mainButton.disable();
  mainButton.hideLoader();
  // remove event
  onClickBackButton();
  onClickMainButton();
});

watchEffect(() => {
  if (appStore.isReady) {
    mainButton.show();
  }
  // if (!isTime.value || !isTableNumber.value || !isSeatNumber.value) {
  //   mainButton.disable();
  //   mainButton.showLoader();
  // } else {
  //   mainButton.enable();
  //   mainButton.hideLoader();
  // }
});
watch(isPlace, () => {
  setMainButton();
});
</script>
<template>
  <div class="flex flex-col py-4">
    <h3
      class="text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mb-2 px-4"
    >
      Где будете есть?
    </h3>
    <div class="flex items-center gap-2 my-2 px-4">
      <!--      <UIButton-->
      <!--        :variant="isPlace === 'reserved_table' ? 'primary' : 'secondary-tab'"-->
      <!--        size="s"-->
      <!--        shape="pill"-->
      <!--        @click="onSetPlace('reserved_table')"-->
      <!--      >-->
      <!--        На месте-->
      <!--      </UIButton>-->
      <UIButton
        :variant="isPlace === 'pickup' ? 'primary' : 'secondary-tab'"
        size="s"
        shape="pill"
        @click="onSetPlace('pickup')"
      >
        В свободной зоне/с собой
      </UIButton>
    </div>

    <template v-if="isPlace === 'reserved_table'">
      <div
        class="px-4 flex-[1_0_0] text-xl font-bold leading-6 tracking-[-0.45px] mt-4 mb-2"
      >
        Ваш стол {{ isTableNumber }}, место {{ isSeatNumber }}
      </div>
      <div class="p-4 w-full flex justify-center">
        <div class="flex flex-col gap-2 w-fit">
          <div class="flex items-center gap-6 mx-auto">
            <span
              :class="
                isSeatNumber === 1
                  ? 'text-link_color border border-link_color'
                  : 'text-hint_color border-tertiary border bg-tertiary'
              "
              class="flex items-center justify-center h-8.5 w-8.5 rounded-full text-sm font-[510] leading-[18px] tracking-[-0.154px]"
            >
              1
            </span>
            <span
              :class="
                isSeatNumber === 2
                  ? 'text-link_color border border-link_color'
                  : 'text-hint_color border-tertiary border bg-tertiary'
              "
              class="flex items-center justify-center h-8.5 w-8.5 rounded-full text-sm font-[510] leading-[18px] tracking-[-0.154px]"
            >
              2
            </span>
          </div>
          <div
            class="flex items-center justify-center w-[138px] h-[74px] border border-link_color rounded-[9px] text-link_color"
          >
            <span
              class="text-[28px] font-bold leading-[34px] tracking-[0.38px]"
            >
              {{ isTableNumber }}
            </span>
          </div>
          <div class="flex items-center gap-6 mx-auto">
            <span
              :class="
                isSeatNumber === 3
                  ? 'text-link_color border border-link_color'
                  : 'text-hint_color border-tertiary border bg-tertiary'
              "
              class="flex items-center justify-center h-8.5 w-8.5 rounded-full text-sm font-[510] leading-[18px] tracking-[-0.154px]"
            >
              3
            </span>
            <span
              :class="
                isSeatNumber === 4
                  ? 'text-link_color border border-link_color'
                  : 'text-hint_color border-tertiary border bg-tertiary'
              "
              class="flex items-center justify-center h-8.5 w-8.5 rounded-full text-sm font-[510] leading-[18px] tracking-[-0.154px]"
            >
              4
            </span>
          </div>
        </div>
      </div>
      <h3
        class="text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mt-4 mb-2 px-4"
      >
        Во сколько подойдете?
      </h3>
      <div
        class="py-2 max-w-screen w-screen scroll-smooth snap-x scroll-px-4 will-change-scroll hide-scroll-bar touch-pan-x overflow-x-auto bg-bg_color"
      >
        <div class="inline-flex flex-nowrap gap-2 px-4">
          <UIButton
            v-for="(item, index) in isAvailableTime?.data"
            :key="index"
            :variant="isTime === item.time ? 'primary' : 'secondary-tab'"
            size="s"
            shape="pill"
            @click="onSetTime(item.time)"
          >
            {{ item.time?.replace(":0", ":00") }}
          </UIButton>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="px-4 flex-[1_0_0] text-xl font-bold leading-6 tracking-[-0.45px] mt-4 mb-2"
      >
        Можно будет сесть в свободной зоне или забрать с собой
      </div>
      <h3
        class="px-4 text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px] mt-4 mb-2"
      >
        Подходите в любое время до 19:00
      </h3>
    </template>

    <div class="px-4 mt-4 mb-2 flex items-center justify-between">
      <h3
        class="text-hint_color text-sm font-[510] leading-[18px] tracking-[-0.154px]"
      >
        Выбранные блюда
      </h3>
      <UIButton
        variant="clean"
        icon-only
        size="fit"
        @click="router.push({ name: RouteName.KITCHEN_CART })"
      >
        <UIIcon
          icon="edit"
          class="text-4"
        />
      </UIButton>
    </div>
    <div class="px-4 my-2 flex items-center gap-1">
      <div
        v-for="(product, index) in isCurrentOrder?.foods"
        :key="index"
        class="w-12 h-12 rounded-3 overflow-hidden"
      >
        <img
          :src="product.photoUrl"
          alt=""
          class="w-full h-full object-center object-cover"
        />
      </div>
    </div>
  </div>
</template>
