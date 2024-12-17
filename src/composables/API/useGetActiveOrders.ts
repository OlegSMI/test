import { useGetRequest } from "@/composables/useGetRequest";
import type { IOrderDto } from "@/types/api/order.dto";
import type { UseFetchOptions } from "@vueuse/core";

export const useGetActiveOrders = (options: UseFetchOptions = {}) => {
  const url = "getActiveOrders";
  return useGetRequest<{ data: IOrderDto[] | null }>(url, { ...options });
};
