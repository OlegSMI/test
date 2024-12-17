import { computed, ref } from "vue";
import type { ComputedRef } from "vue";
//TODO: Перенести в composables
export const useState = <T>(
  initialValue: T
): [ComputedRef<T>, (value: T) => void] => {
  const refValue = ref<T>(initialValue);
  // @ts-ignore
  const mutationFn = (v: T) => (refValue.value = v);
  // @ts-ignore
  const immutableData = computed<T>(() => refValue.value);

  return [immutableData, mutationFn];
};

export const debounce = (func: (...args: Array<any>) => any, delay: number) => {
  let timerId: any;

  return (...args: Array<any>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const encodeEmailForTelegram = (
  email: string | undefined
): string | undefined => {
  if (!email) return;
  let result = email.toLowerCase();
  result = result.replace(/\./gi, "fdc3b1");
  result = result.replace(/@/gi, "588d31");
  return result;
};
