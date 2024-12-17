import { useFetchClient } from "@/composables/useFetchClient";
import type { IUserDto } from "@/types/api/user.dto";

export const useGetUserData = () => {
  const url = "getUserData";
  return useFetchClient(url).json<{
    data: { user: IUserDto } | null;
  }>();
};
