<script setup lang="ts">
import ProductChartGptLabel from "@/features/kitchen/product/ProductChartGptLabel.vue";
import { useRoute, useRouter } from "vue-router";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from "vue";
import { on, postEvent } from "@tma.js/sdk";
import { useWebApp } from "@/composables/useWebApp";
import { useCheckoutStore } from "@/store/checkout";
import { useCatalogStore } from "@/store/catalog";
import type { IProductDto } from "@/types/api/product.dto";
import { useState } from "@/helpers/utilities";
import { useElementSize } from "@vueuse/core";
import { useOrderStore } from "@/store/order";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";

const productImageEl = ref<HTMLElement | null>(null);
const { width } = useElementSize(productImageEl);
const router = useRouter();
const route = useRoute();

const [isLoading, setLoading] = useState<boolean>(false);
const { toggleItemInCart, replaceItemInCart } = useCheckoutStore();
const { isCurrentOrder } = toRefs(useOrderStore());
const { getProductById } = useCatalogStore();

const product = computed<IProductDto | undefined>(() => {
  return getProductById(Number(route?.params?.id)) ?? undefined;
});
const isInCart = computed<boolean>(() => {
  return (
    isCurrentOrder.value?.foods?.some(
      (item) => item.foodId === product.value?.id,
    ) ?? false
  );
});

const productInCartFromCurrentCategory = computed<IProductDto>(() => {
  return isCurrentOrder.value?.foods?.find(
    (p: IProductDto) => p.categoryId === product.value?.categoryId,
  );
});

//TWA
const { backButton, mainButton, miniApp, themeParams } = useWebApp();
if (!backButton.isVisible) {
  backButton.show();
}
const onClickBackButton = on("back_button_pressed", () => {
  router.go(-1);
});

mainButton.enable();
if (!mainButton.isVisible) {
  mainButton.show();
}
const setMainButton = () => {
  if (isInCart.value) {
    mainButton.setText("Добавлено");
    mainButton.setBackgroundColor(miniApp.isDark ? "#333334" : "#EFEFEF");
    mainButton.setTextColor(miniApp.isDark ? "#FFFFFF" : "#222222");
  } else if (productInCartFromCurrentCategory.value) {
    mainButton.setText("Заменить");
    mainButton.setBackgroundColor(miniApp.isDark ? "#333334" : "#EFEFEF");
    mainButton.setTextColor(miniApp.isDark ? "#FFFFFF" : "#222222");
  } else {
    mainButton.setBackgroundColor(themeParams.buttonColor as `#${string}`);
    mainButton.setTextColor(themeParams.buttonTextColor as `#${string}`);
    mainButton.setText("Добавить");
  }
};
const toggleItem = async () => {
  setLoading(true);
  mainButton.disable();
  if (productInCartFromCurrentCategory.value) {
    await replaceItemInCart(
      productInCartFromCurrentCategory.value?.foodId as number,
      route?.params?.id as number,
    ).then(() => {
      setMainButton();
      setLoading(false);
      mainButton.enable();
    });
  } else {
    await toggleItemInCart(Number(route.params.id)).then(() => {
      setMainButton();
      setLoading(false);
      mainButton.enable();
    });
  }
};
const onClickMainButton = on("main_button_pressed", () => {
  postEvent("web_app_trigger_haptic_feedback", {
    type: "impact",
    impact_style: "medium",
  });
  toggleItem();
});

onMounted(() => {
  setMainButton();
  watchEffect(() => {
    if (isCurrentOrder.value && product.value) {
      setMainButton();
    }
  });
});

onBeforeUnmount(() => {
  mainButton.disable();
  mainButton.hideLoader();
  mainButton.setBackgroundColor(themeParams.buttonColor as `#${string}`);
  mainButton.setTextColor(themeParams.buttonTextColor as `#${string}`);
  // remove event
  onClickBackButton();
  onClickMainButton();
});

watchEffect(() => {
  if (isLoading.value) {
    mainButton.showLoader();
  } else {
    mainButton.hideLoader();
  }
});
</script>
<template>
  <div class="p-4">
    <div
      ref="productImageEl"
      class="rounded-6 relative overflow-hidden w-full mb-4"
      :style="`height: ${width}px;`"
    >
      <ProductChartGptLabel
        v-if="!product?.realPhoto"
        class="absolute right-0 bottom-0 z-20 h-16"
      />
      <ProductImage
        :src="product?.photoUrl"
        class="z-10 w-full h-full"
      />
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-xl font-bold">{{ product?.name }}</h1>
      <p class="text-sm">
        {{ product?.description }}
      </p>
    </div>
  </div>
</template>
