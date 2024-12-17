import { computed, unref, type MaybeRef } from "vue";
import queryString from "query-string";

export const useQueryString = <T = unknown>(obj: MaybeRef<T>) => {
  return computed(() => {
    return queryString.stringify(unref<T>(obj), { arrayFormat: "comma" });
  });
};
