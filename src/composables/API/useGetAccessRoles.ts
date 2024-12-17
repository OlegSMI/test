import { useFetchClient } from "@/composables/useFetchClient";
import type { IUserAccess } from "@/types/api/user.dto";

export const useGetAccessRoles = () => {
  const url = "getAccessRoles";
  return useFetchClient(url).json<{
    data: IUserAccess | null;
  }>();
};
