import { defineStore } from "pinia";
import { useGetUserData } from "@/composables/API/useGetUserData";
import { useGetBirthdays } from "@/composables/API/useGetBirthdays";
import { computed } from "vue";
import type { IBirthdayDto } from "@/types/api/birtdays.dto";
import type { IUserAccess, IUserDto } from "@/types/api/user.dto";
import { useGetAccessRoles } from "@/composables/API/useGetAccessRoles";
import { isTodayDate } from "@/helpers/date";

export const useUserStore = defineStore("features-user", () => {
  const userAccessFn = useGetAccessRoles();
  const { data: userAccessData, isFetching: isFetchingAccess } = userAccessFn;
  const hasTaskAccess = computed<boolean>(() => {
    return userAccessData?.value?.data?.task ?? false;
  });
  const hasKitchenAccess = computed<boolean>(() => {
    return userAccessData?.value?.data?.kitchen ?? false;
  });
  const hasAccessCount = computed<number | undefined>(() => {
    const accessObj = userAccessData?.value?.data as { [key: string]: boolean };
    const accessArr = accessObj ? Object.values(accessObj) : [];
    return accessArr?.filter((value) => value)?.length ?? undefined;
  });
  const hasAccess = computed<boolean>(() => {
    return hasAccessCount.value > 0;
  });
  const userFn = useGetUserData();
  const { data: userData, isFetching: isFetchingUser } = userFn;
  const user = computed<IUserDto>(() => {
    return userData.value?.data?.user as IUserDto;
  });

  const getUser = async () => {
    const { execute } = userFn;
    await execute();
  };
  const getAccess = async () => {
    const { execute } = userAccessFn;
    await execute();
  };

  const birthdaysFn = useGetBirthdays();
  const { data: birthdaysData, isFetching: isFetchingBirthdays } = birthdaysFn;
  const birthdays = computed<IBirthdayDto[]>(() => {
    return birthdaysData.value?.data ?? [];
  });
  const getBirthdays = async () => {
    const { execute } = birthdaysFn;
    await execute();
  };

  const isHiddenBirthday = computed(() => {
    const hiddenDate = localStorage.getItem("onboarding-birthday-hide-date");
    const isToday = hiddenDate ? isTodayDate(hiddenDate) : false;
    return !!hiddenDate && !isToday;
  });
  const showBirthdayOnboard = computed(() => {
    return !isHiddenBirthday.value && birthdays.value?.length;
  });
  return {
    user,
    isFetchingUser,
    getUser,
    birthdays,
    isFetchingBirthdays,
    getBirthdays,
    isFetchingAccess,
    hasAccess,
    hasTaskAccess,
    hasKitchenAccess,
    hasAccessCount,
    getAccess,
    showBirthdayOnboard,
  };
});
