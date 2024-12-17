import { useFetchClient } from "@/composables/useFetchClient";
import type { UseFetchOptions } from "@vueuse/core";

interface IUsePostAddFoodReq {
  foodId: number;
}

export const usePostAddFood = (
  body: IUsePostAddFoodReq,
  options: UseFetchOptions = {},
) => {
  const url: string = "addFood";
  return useFetchClient(url, options).post(body).json<{ data: any }>();
};
