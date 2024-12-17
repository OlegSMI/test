import { useFetchClient } from "@/composables/useFetchClient";
import type { IProductDto } from "@/types/api/product.dto";

export const useGetActiveFood = () => {
  const url = "getActiveFood";
  return useFetchClient(url).json<{
    data: IProductDto[] | null;
  }>();
};
