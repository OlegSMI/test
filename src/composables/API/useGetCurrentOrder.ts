import { useGetRequest } from "@/composables/useGetRequest";
import type { IOrderDto } from "@/types/api/order.dto";
import type { UseFetchOptions } from "@vueuse/core";

export const useGetCurrentOrder = (options: UseFetchOptions = {}) => {
  const url = "getCurrentOrder";
  return useGetRequest<{ data: IOrderDto | null }>(url, { ...options });
};
