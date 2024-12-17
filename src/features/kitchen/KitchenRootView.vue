<script setup lang="ts">
import { useKitchenView } from "@/features/kitchen/useKitchenView";
import { RouteName } from "@/constants/route_name";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import TheLoader from "@/components/TheLoader.vue";

const router = useRouter();
const { isHiddenOnboardingWelcome } = useKitchenView();

watchEffect(() => {
  if (isHiddenOnboardingWelcome.value === false) {
    void router.push({ name: RouteName.KITCHEN_ONBOARD });
  } else {
    void router.push({ name: RouteName.KITCHEN_HOME });
  }
});
</script>

<template>
  <TheLoader />
</template>
