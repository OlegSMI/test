<script setup lang="ts">
import { useWebApp } from "@/composables/useWebApp";
import { useRouter } from "vue-router";
import UIButton from "@/components/ui/UIButton/UIButton.vue";
import { RouteName } from "@/constants/route_name";
import { useCheckoutStore } from "@/store/checkout";
import { computed, onBeforeUnmount, toRefs, watch, watchEffect } from "vue";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { on, postEvent } from "@tma.js/sdk";
import { useOrderStore } from "@/store/order";
import type { IProductDto } from "@/types/api/product.dto";
import AddIcon from "@/components/icons/add.vue";
import MinusIcon from "@/components/icons/minus.vue";
import ErrorIcon from "@/components/icons/error.vue";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";

const router = useRouter();
const { isCurrentOrder, isCurrentOrderFoodCount } = toRefs(useOrderStore());
const { toggleItemInCart } = useCheckoutStore();
const [cartItemsEl] = useAutoAnimate();
const [mainFoodItemsEl] = useAutoAnimate();

const isMainFoods = computed<IProductDto[]>(() => {
  return (
    isCurrentOrder.value?.foods?.filter(
      (food: IProductDto) => !!food.mainCategory,
    ) || []
  );
});
const isFirstFood = computed(() => {
  return isMainFoods.value?.[0]?.categoryId === 13;
});
// const isSecondFood = computed(() => {
//   return isMainFoods.value?.[0]?.categoryId === 14;
// });
const onClickMainFood = (index: number) => {
  if (!isFirstFood.value && index === 1) {
    void router.push({ name: RouteName.KITCHEN_HOME, query: { cat: 13 } });
  }
  if (
    (isFirstFood.value && index === 1) ||
    (!isFirstFood.value && index === 2)
  ) {
    void router.push({ name: RouteName.KITCHEN_HOME, query: { cat: 14 } });
  }
};

const onToggleItemCart = (id: number) => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "light",
  });
  void toggleItemInCart(id);
};
const toHomeRoot = async () => {
  await router.push({ name: RouteName.KITCHEN_HOME });
};
// TMA
const { backButton, mainButton, miniApp, themeParams } = useWebApp();
if (!backButton.isVisible) {
  backButton.show();
}
const onClickBackButton = on("back_button_pressed", () => {
  router.go(-1);
});

// mainButton.setText("К выбору времени");
mainButton.setText("Оформить заказ");
mainButton.enable();
if (!mainButton.isVisible) {
  mainButton.show();
}
const onClickMainButton = on("main_button_pressed", () => {
  if (isMainFoods.value?.length < 2) {
    return;
  }
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  void router.push({ name: RouteName.KITCHEN_CART_CONFIRM });
});

onBeforeUnmount(() => {
  mainButton.disable();
  // remove event
  onClickBackButton();
  onClickMainButton();

  mainButton.setBackgroundColor(themeParams.buttonColor as `#${string}`);
  mainButton.setTextColor(themeParams.buttonTextColor as `#${string}`);
});
watch(isCurrentOrderFoodCount, () => {
  if (isCurrentOrderFoodCount.value === 0) {
    mainButton.disable();
    mainButton.hide();
  }
});
watchEffect(() => {
  if (isMainFoods.value?.length < 2) {
    mainButton.setBackgroundColor(miniApp.isDark ? "#333334" : "#EFEFEF");
    mainButton.setTextColor(miniApp.isDark ? "#FFFFFF" : "#222222");
    mainButton.disable();
  } else {
    mainButton.setBackgroundColor(themeParams.buttonColor as `#${string}`);
    mainButton.setTextColor(themeParams.buttonTextColor as `#${string}`);
    mainButton.enable();
  }
});
</script>
<template>
  <div class="flex flex-col p-4">
    <h1 class="text-xl font-bold leading-6 tracking-[-0.45px] mt-4 mb-2">
      Ваш заказ
    </h1>
    <div
      ref="cartItemsEl"
      class="flex flex-col"
    >
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
        <UIButton
          variant="secondary-tab"
          icon-only
          shape="pill"
          size="s"
          class="ml-auto min-h-[34px]"
          @click="onToggleItemCart(product?.foodId as number)"
        >
          <MinusIcon class="h-4 w-4" />
        </UIButton>
      </div>
    </div>
    <div
      v-if="(isMainFoods?.length as number) < 2"
      class="mt-4"
    >
      <h2 class="text-xl font-bold leading-6 tracking-[-0.45px] mb-2.5">
        Кое-чего не хватает
      </h2>
      <p
        class="self-stretch text-sm font-[510] leading-[18px] tracking-[-0.154px] mb-2"
      >
        Обязательно добавьте блюда из категорий
      </p>
      <div ref="mainFoodItemsEl">
        <div
          v-for="index in 2 - (isMainFoods?.length as number)"
          :key="index"
          class="flex items-center gap-3 py-2"
          @click="onClickMainFood(index)"
        >
          <div
            class="min-w-12 min-h-12 w-12 h-12 rounded-3 overflow-hidden bg-tertiary flex items-center justify-center"
          >
            <AddIcon class="text-hint_color h-4 w-4" />
          </div>
          <div class="text-sm font-[510] leading-[18px] tracking-[-0.154px]">
            <template v-if="!isFirstFood && index === 1"> На первое</template>
            <template
              v-if="
                (isFirstFood && index === 1) || (!isFirstFood && index === 2)
              "
            >
              На второе
            </template>
          </div>
          <div class="ml-auto p-2">
            <ErrorIcon class="text-[#F6B536] w-4 h-4" />
          </div>
        </div>
      </div>
    </div>

    <UIButton
      variant="secondary-tab"
      class="mt-4"
      @click="toHomeRoot"
    >
      К меню
    </UIButton>
  </div>
</template>
