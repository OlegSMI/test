import { useFetchClient } from "@/composables/useFetchClient";
import { useQueryString } from "@/composables/useQueryString";
import { computed, type MaybeRef, unref } from "vue";
import type { ComputedRef } from "vue";
import type { UseFetchOptions } from "@vueuse/core";

export const useGetRequest = <RES = unknown, REQ = unknown>(
  path: string,
  queryObj?: MaybeRef<REQ>,
  useFetchOpts?: UseFetchOptions,
) => {
  const query = useQueryString(queryObj);
  let url: ComputedRef<string> | string;
  if (useFetchOpts?.refetch) {
    // eslint-disable-next-line vue/no-ref-as-operand
    url = computed(() => path + "?" + unref(query));
  } else {
    // eslint-disable-next-line vue/no-ref-as-operand
    url = path + "?" + unref(query);
  }
  return useFetchClient(url, useFetchOpts || {})
    .get()
    .json<RES>();
};
