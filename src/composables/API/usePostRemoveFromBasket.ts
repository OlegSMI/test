import { useFetchClient } from "@/composables/useFetchClient";
import type { UseFetchOptions } from "@vueuse/core";

interface IUsePostRemoveFromBasketReq {
  itemId: number;
}

export const usePostRemoveFromBasket = (
  body: IUsePostRemoveFromBasketReq,
  options: UseFetchOptions = {},
) => {
  const url: string = "removeFromBasket";
  return useFetchClient(url, options).post(body).json<{ data: any }>();
};
