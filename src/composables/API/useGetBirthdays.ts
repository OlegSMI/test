import { useFetchClient } from "@/composables/useFetchClient";
import type { IBirthdayDto } from "@/types/api/birtdays.dto";

export const useGetBirthdays = () => {
  const url = "getBirthdays";
  return useFetchClient(url).json<{
    data: IBirthdayDto[] | null;
  }>();
};
