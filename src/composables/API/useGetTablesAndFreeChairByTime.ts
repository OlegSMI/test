import { useGetRequest } from "@/composables/useGetRequest";
import type { UseFetchOptions } from "@vueuse/core";
import type { MaybeRef } from "vue";

interface IGetTablesAndFreeChairByTime {
  bookedDate?: Date | string;
}

export const useGetTablesAndFreeChairByTime = (
  reqConfig: MaybeRef<IGetTablesAndFreeChairByTime> = {},
  options: UseFetchOptions = {},
) => {
  const url = "getTablesAndFreeChairsByTime";
  return useGetRequest<{ data: any | null }, IGetTablesAndFreeChairByTime>(
    url,
    reqConfig,
    { ...options },
  );
};
