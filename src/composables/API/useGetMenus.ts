import { useFetchClient } from "@/composables/useFetchClient";
import type { IMenuDto } from "@/types/api/menu.dto";

export const useGetMenus = () => {
  const url = "getMenus";
  return useFetchClient(url).json<{
    data: IMenuDto[] | null;
  }>();
};
