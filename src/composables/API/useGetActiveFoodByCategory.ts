import { useGetRequest } from "@/composables/useGetRequest";
import type { UseFetchOptions } from "@vueuse/core";
import type { MaybeRef } from "vue";
import type { IProductDto } from "@/types/api/product.dto";

interface IUseGetActiveFoodByCategory {
  categoryId?: number;
  offset?: number;
}

export const useGetActiveFoodByCategory = (
  reqConfig: MaybeRef<IUseGetActiveFoodByCategory> = {},
  options: UseFetchOptions = {},
) => {
  const url = "getActiveFood";
  return useGetRequest<
    { data: IProductDto[] | null },
    IUseGetActiveFoodByCategory
  >(url, reqConfig, { ...options });
};
