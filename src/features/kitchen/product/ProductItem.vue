<script setup lang="ts">
import UIButton from "@/components/ui/UIButton/UIButton.vue";
import { useState } from "@/helpers/utilities";
import { useCheckoutStore } from "@/store/checkout";
import { computed, nextTick, ref, toRefs } from "vue";
import type { IProductDto } from "@/types/api/product.dto";
import { useRouter } from "vue-router";
import { useOrderStore } from "@/store/order";
import { useElementSize } from "@vueuse/core";
import ProductChartGptLabel from "@/features/kitchen/product/ProductChartGptLabel.vue";
import AddIcon from "@/components/icons/add.vue";
import MinusIcon from "@/components/icons/minus.vue";
import SpinnerIcon from "@/components/icons/spinner.vue";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";
import { RouteName } from "@/constants/route_name";

interface Props {
  product?: IProductDto;
  isReplace?: boolean;
  isReplaceFood?: IProductDto;
}

const router = useRouter();
const props = defineProps<Props>();
const productImageEl = ref<HTMLElement | null>(null);
const { width } = useElementSize(productImageEl);
const [isLoading, setLoading] = useState<boolean>(false);
const { isCurrentOrder } = toRefs(useOrderStore());
const { toggleItemInCart, replaceItemInCart } = useCheckoutStore();

const isInCart = computed<boolean>(() => {
  return isCurrentOrder.value?.foods?.some(
    (f) => f.foodId === props.product?.id,
  );
});
const onClickProduct = async () => {
  await router.push({
    name: RouteName.KITCHEN_PRODUCT_ID,
    params: { id: props.product?.id },
  });
};
const onToggleCartProduct = async () => {
  await toggleItemInCart(props.product?.id as number);
};

const onClickProductButton = async () => {
  setLoading(true);
  if (!props.isReplace) {
    await onToggleCartProduct();
  } else {
    await replaceItemInCart(
      props.isReplaceFood?.id as number,
      props.product?.id as number,
    );
  }
  await nextTick();
  setLoading(false);
};
</script>
<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col"
      @click="onClickProduct"
    >
      <div
        ref="productImageEl"
        class="relative rounded-[12px] overflow-hidden mb-2 w-full aspect-square"
        :style="`height: ${width}px;`"
      >
        <ProductChartGptLabel
          v-if="!props.product?.realPhoto"
          class="absolute right-0 bottom-0 z-20 h-[36px]"
        />
        <ProductImage
          :src="props.product?.photoUrl"
          class="z-10 w-full h-full"
        />
      </div>
      <h3
        class="font-medium text-sm leading-[18px] tracking-[-0.154px] text-text_color mb-0.5"
      >
        {{ props.product?.name }}
      </h3>
    </div>
    <p
      class="text-sm text-hint_color leading-[18px] tracking-[-0.154px] truncate mb-2"
    >
      {{ props.product?.description }}
    </p>
    <UIButton
      :variant="!isInCart || props.isReplace ? 'secondary' : 'primary'"
      size="s"
      class="w-fit mt-auto"
      :class="{ 'pointer-events-none': isLoading }"
      shape="pill"
      @click="onClickProductButton"
    >
      <template #left>
        <template v-if="!isLoading">
          <MinusIcon
            v-if="isInCart"
            class="w-3 h-3"
          />
          <AddIcon
            v-else
            class="w-3 h-3"
          />
        </template>
        <template v-else>
          <SpinnerIcon class="w-3 h-3 animate-spin" />
        </template>
      </template>
      <template v-if="!isReplace">
        {{ isInCart ? "Добавлено" : "Добавить" }}
      </template>
      <template v-else> Заменить</template>
    </UIButton>
  </div>
</template>
