<script setup lang="ts">
import { RouteName } from "@/constants/route_name.js";
import type { IOrderDto } from "@/types/api/order.dto";
import { getCalendarDate, getFormatDate } from "@/helpers/date";
import { appConfig } from "../../../config/app";
import ProductImage from "@/features/kitchen/product/ProductImage.vue";

interface Props {
  order: IOrderDto;
}

const props = defineProps<Props>();
</script>

<template>
  <router-link
    :to="{
      name: RouteName.KITCHEN_ORDER_ID,
      params: { id: props.order.orderId },
    }"
  >
    <div
      class="bg-custom_button_color bg-opacity-10 pl-2 py-2 w-full h-full rounded-3"
    >
      <div class="active-order py-2 overflow-hidden">
        <div class="flex items-center justify-between pr-4">
          <div class="flex flex-col gap-1">
            <span
              class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
            >
              {{
                props.order?.seatingType === "pickup"
                  ? `До ${appConfig.pickupTimeFinished}`
                  : getFormatDate(props.order.bookedData, "HH:mm")
              }}
            </span>
            <span
              class="text-sm font-normal leading-[18px] tracking-[-0.154px]"
            >
              {{ getCalendarDate(props.order.bookedData) }}
            </span>
          </div>
          <div class="flex flex-col gap-1 text-right">
            <span
              class="text-[17px] font-[590] leading-[22px] tracking-[-0.43px]"
            >
              {{
                props.order?.seatingType === "pickup"
                  ? "В свободной зоне"
                  : `Стол ${props.order?.tableId}`
              }}
            </span>
            <span
              class="text-sm font-normal leading-[18px] tracking-[-0.154px]"
            >
              {{
                props.order?.seatingType === "pickup"
                  ? "или с собой"
                  : `Место ${props.order?.chairId}`
              }}
            </span>
          </div>
        </div>
        <div class="inline-flex gap-2 mt-4">
          <ProductImage
            v-for="food in props.order.foods"
            :key="food.id"
            :src="food.photoUrl"
            class="w-12 h-12 rounded-3"
          />
        </div>
      </div>
    </div>
  </router-link>
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
