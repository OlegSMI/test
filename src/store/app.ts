import { defineStore } from "pinia";
import { computed, ref, toRefs } from "vue";
import { appConfig } from "@/config/app";
import dayjs from "dayjs";
import { getFormatDate } from "@/helpers/date";
import { useState } from "@/helpers/utilities";
import { useCatalogStore } from "@/store/catalog";

export const useAppStore = defineStore("features-app", () => {
  const [isReady, setReady] = useState<boolean>(false);

  const { isDateOfMenu } = toRefs(useCatalogStore());
  // const isDateOfMenu = ref("2024-04-23");
  const isOrderTimeEnd = computed(() => {
    const prevMenuDay = dayjs(new Date(isDateOfMenu.value)).add(-1, "day");
    return getFormatDate(
      prevMenuDay,
      `YYYY-MM-DD ${appConfig.ordersTimeFinished}:00`,
    );
  });
  const isOrdersTimeFinished = computed(() => {
    const now = new Date();
    const currentTimestampTime = dayjs(
      getFormatDate(now, "YYYY-MM-DD HH:mm:ss"),
    );
    return (
      dayjs(isOrderTimeEnd.value).diff(currentTimestampTime, "seconds") < 0
    );
  });
  return {
    isReady,
    setReady,
    isOrderTimeEnd,
    isOrdersTimeFinished,
  };
});
