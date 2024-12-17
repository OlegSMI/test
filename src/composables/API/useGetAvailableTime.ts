import { useFetchClient } from "@/composables/useFetchClient";

interface IGetAvailableTime {
  time: string;
}

export const useGetAvailableTime = () => {
  const url = "getAvailableTime";
  return useFetchClient(url).json<{
    data: IGetAvailableTime[] | null;
  }>();
};
