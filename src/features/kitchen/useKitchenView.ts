import { computed } from "vue";

export const useKitchenView = () => {
  const isHiddenOnboardingWelcome = computed<boolean | undefined>(() => {
    const lcKey = localStorage.getItem("welcome-hide");
    return !!lcKey;
  });
  return {
    isHiddenOnboardingWelcome,
  };
};
