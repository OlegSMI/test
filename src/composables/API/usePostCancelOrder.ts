import { useFetchClient } from "@/composables/useFetchClient";
import type { UseFetchOptions } from "@vueuse/core";

interface IUsePostCancelOrderReq {
  orderId: number;
}

export const usePostCancelOrder = (
  body: IUsePostCancelOrderReq,
  options: UseFetchOptions = {},
) => {
  const url: string = "cancelOrder";
  return useFetchClient(url, options).post(body).json<{ data: any }>();
};
