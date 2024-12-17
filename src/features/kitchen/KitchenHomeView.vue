<script setup lang="ts">
import ProductItem from "@/features/kitchen/product/ProductItem.vue";
import AppHeader from "@/components/AppHeader.vue";
import UIButton from "@/components/ui/UIButton/UIButton.vue";
import { nextTick, onBeforeUnmount, onMounted, toRefs, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { on, postEvent } from "@tma.js/sdk";
import { useWebApp } from "@/composables/useWebApp";
import { useState } from "@/helpers/utilities";
import { RouteName } from "@/constants/route_name";
import { useCatalogStore } from "@/store/catalog";
import OrderItem from "@/features/kitchen/order/OrderItem.vue";
import KitchenOrderedMessage from "@/features/kitchen/KitchenOrderedMessage.vue";
import { useOrderStore } from "@/store/order";
import type { IProductDto } from "@/types/api/product.dto";
import { useAppStore } from "@/store/app";
import KitchenHomeBanner from "@/features/kitchen/KitchenHomeBanner.vue";
import { getCalendarDate } from "@/helpers/date";
import { useUserStore } from "@/store/user";

const router = useRouter();
const appStore = useAppStore();
const { hasAccessCount } = toRefs(useUserStore());
const [isActiveCategory, setActiveCategory] = useState<number | null>(null);
const { isOrdersTimeFinished } = toRefs(useAppStore());
const { categories, isDateOfMenu } = toRefs(useCatalogStore());
const {
  isActiveOrders,
  isActiveOrdersCount,
  isCurrentOrder,
  isCurrentOrderFoodCount,
} = toRefs(useOrderStore());

const onSelectCategory = (id: number) => {
  setActiveCategory(id);
  const el = document.getElementById(`cat${id}`);
  void nextTick();
  el?.scrollIntoView({ behavior: "smooth" });
};

const isReplace = (foods: IProductDto[], productId: number) => {
  let isFoodInOrder = foods?.some((food) =>
    isCurrentOrder.value?.foods?.some(
      (orderFood) => food.id === orderFood.foodId,
    ),
  );
  let isProductInOrder = isCurrentOrder.value?.foods?.some(
    (orderFood) => orderFood.foodId === productId,
  );

  return isFoodInOrder && !isProductInOrder;
};

const isReplaceFood = (foods: IProductDto[]) => {
  return foods.find((food) =>
    isCurrentOrder.value?.foods.some(
      (orderFood) => food.id === orderFood.foodId,
    ),
  );
};

const route = useRoute();
onMounted(() => {
  if (route?.query?.cat) {
    setTimeout(() => {
      onSelectCategory(route?.query?.cat as unknown as number);
    }, 300);
  }
});

watchEffect(() => {
  // set first active category
  if (!isActiveCategory.value && categories.value?.length) {
    setActiveCategory(categories.value?.[0]?.id);
  }
});
// const activeButtonEl = ref<HTMLElement | null>(null);
// const activeCategoryViewId = ref<number>(-1);
// const onIntersectionObserver = ([{ target }]: IntersectionObserverEntry[]) => {
//   // console.log(Number(target?.id?.slice(3, 99)));
//   activeCategoryViewId.value = Number(target?.id?.slice(3, 99));
// };
// watch(isActiveCategory, () => {
//   activeButtonEl.value =
//     document?.getElementsByClassName("is-active-button")?.[0];
// });
// watch(activeCategoryViewId, (value, oldValue) => {
//   if (
//     activeCategoryViewId.value !== isActiveCategory.value &&
//     value !== oldValue
//   ) {
//     setActiveCategory(activeCategoryViewId.value);
//   }
// });
// TWA
const { backButton, mainButton } = useWebApp();
const setMainButton = () => {
  const buttonTextDay = getCalendarDate(new Date(isDateOfMenu.value), {
    sameDay: "сегодня",
    nextDay: "завтра",
    nextWeek: "dddd",
  });
  if (
    isCurrentOrderFoodCount.value > 0 &&
    !isOrdersTimeFinished.value &&
    appStore.isReady
  ) {
    mainButton.setText(`Заказать на ${buttonTextDay}`);
    mainButton.enable();
    if (!mainButton.isVisible) {
      mainButton.show();
    }
  } else {
    mainButton.disable();
    if (mainButton.isVisible) {
      mainButton.hide();
    }
  }
};
const onClickBackButton = on("back_button_pressed", () => {
  void router.push({ name: RouteName.SELECT_FEATURE });
});
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void router.push({ name: RouteName.KITCHEN_CART });
});
onBeforeUnmount(() => {
  mainButton.disable();
  // remove events
  onClickBackButton();
  onClickMainButton();
});
watchEffect(() => {
  setMainButton();
  if (backButton.isVisible && hasAccessCount.value === 1) {
    backButton.hide();
  }
  if (!backButton.isVisible && hasAccessCount.value > 1) {
    backButton.show();
  }
});
</script>

<template>
  <div class="w-full h-full max-w-[600px] mx-auto pb-4">
    <AppHeader />
    <KitchenHomeBanner class="p-4" />
    <template v-if="isActiveOrdersCount > 0">
      <div class="p-4">
        <OrderItem
          v-for="order in isActiveOrders"
          :key="order.orderId"
          :order="order"
        />
      </div>
    </template>
    <template
      v-if="
        isActiveOrdersCount > 0 || isOrdersTimeFinished || !categories?.length
      "
    >
      <KitchenOrderedMessage />
    </template>
    <template v-if="!isOrdersTimeFinished">
      <div
        class="max-w-screen z-[1000] w-screen scroll-smooth snap-x scroll-px-4 will-change-scroll hide-scroll-bar touch-pan-x overflow-x-auto sticky top-0 bg-bg_color -translate-y-px"
      >
        <div
          v-if="categories"
          class="inline-flex flex-nowrap gap-2 px-4 py-2"
        >
          <UIButton
            v-for="(category, index) in categories"
            :key="index"
            :variant="
              category.id === isActiveCategory ? 'primary' : 'secondary-tab'
            "
            class="snap-start w-auto"
            :class="{ 'is-active-button': category.id === isActiveCategory }"
            size="s"
            @click="onSelectCategory(category.id)"
          >
            {{ category?.name }}
          </UIButton>
        </div>
      </div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="flex flex-col gap-4 px-4 pt-2 pb-4"
      >
        <template v-if="category?.foods?.length">
          <h2
            :id="`cat${category.id}`"
            class="scroll-mt-14 mb-2 text-text_color text-xl font-bold leading-6 tracking-[-0.45px]"
          >
            {{ category?.name }}
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <ProductItem
              v-for="product in category?.foods"
              :key="product.id"
              :is-replace="isReplace(category?.foods, product.id as number)"
              :is-replace-food="isReplaceFood(category?.foods)"
              :product="product"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
