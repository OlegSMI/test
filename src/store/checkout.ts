import { defineStore } from "pinia";
import { computed, ref, toRefs } from "vue";
import { useState } from "@/helpers/utilities";
import { useCatalogStore } from "@/store/catalog";
import type { IProductDto } from "@/types/api/product.dto";
import { usePostAddFood } from "@/composables/API/usePostAddFood";
import { usePostRemoveFromBasket } from "@/composables/API/usePostRemoveFromBasket";
import { useGetAvailableTime } from "@/composables/API/useGetAvailableTime";
import { useOrderStore } from "./order";

export const useCheckoutStore = defineStore("features-cart", () => {
  const { getCurrentOrder } = useOrderStore();
  const { isCurrentOrder } = toRefs(useOrderStore());
  const { products, isDateOfMenu } = toRefs(useCatalogStore());
  const time = useGetAvailableTime();
  const { data: isAvailableTime, isFetching } = time;

  const getAvailableTime = async () => {
    const { execute } = time;
    await execute();
  };

  const cartItemsId = ref<number[]>([]);
  const cartCount = computed(() => cartItemsId.value?.length);
  const [isPlace, setPlace] = useState<
    "pickup" | "free_table" | "reserved_table"
  >("pickup");
  const [isTime, setTime] = useState<string>("");
  const [isTableNumber, setTableNumber] = useState<number | undefined>(
    undefined,
  );
  const [isSeatNumber, setSeatNumber] = useState<number | undefined>(undefined);

  const isBookedTime = computed(() => {
    const time = isTime.value?.replace(".", ":") || "00:00" + ":00";
    return isDateOfMenu.value?.slice(0, 11) + time;
  });
  const cartItems = computed(() => {
    return products.value?.filter((product: IProductDto) =>
      cartItemsId.value?.includes(product?.id),
    );
  });
  const toggleItemInCart = async (id: number) => {
    if (isCurrentOrder.value?.foods.some((food) => food.foodId === id)) {
      await usePostRemoveFromBasket({ itemId: id }).then(() => {
        void getCurrentOrder();
      });
    } else {
      await usePostAddFood({ foodId: id }).then(() => {
        void getCurrentOrder();
      });
    }
  };
  const replaceItemInCart = async (oldId: number, newId: number) => {
    await usePostRemoveFromBasket({ itemId: oldId }).then(async () => {
      await usePostAddFood({ foodId: newId }).then(async () => {
        await getCurrentOrder();
      });
    });
  };
  const isItemInCart = (id: number) => {
    return cartItemsId.value.includes(id);
  };

  const onResetCart = () => {
    setPlace("pickup");
    setTime("");
  };

  return {
    cartItemsId,
    cartItems,
    cartCount,
    isPlace,
    isTime,
    isAvailableTime,
    isFetching,
    isTableNumber,
    isSeatNumber,
    isBookedTime,
    setPlace,
    setTime,
    setTableNumber,
    setSeatNumber,
    toggleItemInCart,
    replaceItemInCart,
    isItemInCart,
    onResetCart,
    getAvailableTime,
  };
});
