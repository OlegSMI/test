import { useFetchClient } from "@/composables/useFetchClient";
import type { ICategoryDto } from "@/types/api/category.dto";

export const useGetActiveCategories = () => {
  const url = "getActiveCategories";
  return useFetchClient(url).json<{
    data: ICategoryDto[] | null;
  }>();
};
