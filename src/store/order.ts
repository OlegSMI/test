import { useGetActiveOrders } from "@/composables/API/useGetActiveOrders";
import type { IOrderDto } from "@/types/api/order.dto";
import { defineStore } from "pinia";
import { computed } from "vue";
import { useGetCurrentOrder } from "@/composables/API/useGetCurrentOrder";

export const useOrderStore = defineStore("features-order", () => {
  const activeOrdersFn = useGetActiveOrders();
  const currentOrderFn = useGetCurrentOrder();
  const { data: activeOrdersData, isFetching: isFetchingActiveOrders } =
    activeOrdersFn;
  const { data: currentOrderData, isFetching: isFetchingCurrentOrder } =
    currentOrderFn;

  const isActiveOrders = computed<IOrderDto[]>(
    () => activeOrdersData?.value?.data ?? [],
  );
  const isActiveOrdersCount = computed<number>(
    () => isActiveOrders.value?.length,
  );

  const isCurrentOrder = computed<IOrderDto | undefined>(() => {
    return currentOrderData.value?.data ?? undefined;
  });

  const isCurrentOrderFoodCount = computed<number>(() => {
    return isCurrentOrder.value?.foods?.length ?? 0;
  });

  const getActiveOrders = async () => {
    const { execute } = activeOrdersFn;
    await execute();
  };

  const getCurrentOrder = async () => {
    const { execute } = currentOrderFn;
    await execute();
  };

  const getActiveOrderById = (id: number) => {
    return isActiveOrders.value.find((order) => order.orderId === id);
  };
  return {
    isActiveOrders,
    isActiveOrdersCount,
    isFetchingActiveOrders,
    isFetchingCurrentOrder,
    isCurrentOrder,
    isCurrentOrderFoodCount,
    getActiveOrders,
    getActiveOrderById,
    getCurrentOrder,
  };
});
