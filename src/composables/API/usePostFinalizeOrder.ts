import { useFetchClient } from "@/composables/useFetchClient";
import type { UseFetchOptions } from "@vueuse/core";

interface IUsePostFinalizeOrderReq {
  orderId: number;
  bookedDate: Date | string;
  seatingType: "pickup" | "free_table" | "reserved_table";
  chairId?: number;
  tableId?: number;
}

export const usePostFinalizeOrder = (
  body: IUsePostFinalizeOrderReq,
  options: UseFetchOptions = {},
) => {
  const url: string = "finalizeOrder";
  return useFetchClient(url, options).post(body).json<{ data: any }>();
};
