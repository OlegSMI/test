<script setup lang="ts">
import TheLoader from "@/components/TheLoader.vue";
import UITransition from "@/components/ui/UITransition/UITransition.vue";
import { useWebApp } from "@/composables/useWebApp";
import { RouteName } from "@/constants/route_name";
import { useAppStore } from "@/store/app";
import { useCatalogStore } from "@/store/catalog";
import { useCheckoutStore } from "@/store/checkout";
import { useOrderStore } from "@/store/order";
import { useUserStore } from "@/store/user";
import { computed, onBeforeMount, ref, toRefs, watchEffect } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const { viewport } = useWebApp();
viewport.expand();
const { getMenu } = useCatalogStore();
const { isFetching: isMenuFetching } = toRefs(useCatalogStore());
const { getAvailableTime } = useCheckoutStore();
const { isFetching: isTimeFetching } = toRefs(useCheckoutStore());
const { getActiveOrders, getCurrentOrder } = useOrderStore();
const { isFetchingActiveOrders, isFetchingCurrentOrder } =
  toRefs(useOrderStore());
const {
  isFetchingUser,
  isFetchingBirthdays,
  isFetchingAccess,
  hasAccessCount,
  hasKitchenAccess,
  hasTaskAccess,
  showBirthdayOnboard,
} = toRefs(useUserStore());

const initData = async () => {
  await Promise.all([
    getCurrentOrder(),
    getActiveOrders(),
    getMenu(),
    getAvailableTime(),
  ]);
};
void initData();
const isReady = ref(false);
const isInitDataFinished = computed(() => {
  return (
    !isMenuFetching.value &&
    !isTimeFetching.value &&
    !isFetchingActiveOrders.value &&
    !isFetchingCurrentOrder.value &&
    !isFetchingUser.value &&
    !isFetchingBirthdays.value &&
    !isFetchingAccess.value &&
    hasAccessCount.value !== undefined
  );
});
onBeforeMount(() => {});
watchEffect(() => {
  // if (isInitDataFinished.value && !isReady.value) {
  //   isReady.value = true;
    // if (route.fullPath.includes("#tg")) {
      // if (hasAccessCount.value === 0) {
      //   void router.push({ name: RouteName.NOT_ACCESS }).then(() => {
      //     setTimeout(() => {
      //       appStore.setReady(true);
      //     }, 300);
      //   });
      // } else 
      // if (showBirthdayOnboard.value) {
      //   void router.push({ name: RouteName.BIRTHDAY }).then(() => {
      //     setTimeout(() => {
      //       appStore.setReady(true);
      //     }, 300);
      //   });
      // } else if (hasAccessCount.value === 1 && hasKitchenAccess.value) {
        void router.push({ name: RouteName.KITCHEN_ROOT }).then(() => {
          setTimeout(() => {
            appStore.setReady(true);
          }, 300);
        });
  //     } else if (hasAccessCount.value === 1 && hasTaskAccess.value) {
  //       void router.push({ name: RouteName.TASK_SELECT_TOPIC }).then(() => {
  //         setTimeout(() => {
  //           appStore.setReady(true);
  //         }, 300);
  //       });
  //     } else if (hasAccessCount.value > 1) {
  //       void router.push({ name: RouteName.SELECT_FEATURE }).then(() => {
  //         setTimeout(() => {
  //           appStore.setReady(true);
  //         }, 300);
  //       });
  //     }
  //   } else {
  //     setTimeout(() => {
  //       appStore.setReady(true);
  //     }, 300);
  //   }
  // }
});
</script>

<template>
  <div class="app-container">
    <!--    {{ hasAccess }}-->
    <!--    {{ hasAccessCount }}-->
    <!--    {{ hasAccessCount }}-->
    <!--    {{ $route }}-->
    <router-view v-slot="{ Component, route }">
      <transition
        :name="
          route?.meta?.transition ? String(route.meta.transition) : 'ui-fade'
        "
        mode="out-in"
        appear
        :duration="100"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <UITransition name="ui-fade">
      <TheLoader
        v-if="!appStore.isReady"
        class="absolute top-0 left-0 right-0 bottom-0"
      />
    </UITransition>
  </div>
</template>

<style lang="scss">
html,
body {
  @apply text-text_color scroll-smooth select-none;
}

html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  display: none;
}

.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

$duration: 0.5s;
.transition {
  overflow: hidden;
}

.router-view,
.router-view-back {
  &-enter-active,
  &-leave-active {
    position: fixed;
    width: 100%;
    background: white;
    min-height: 100vh;
    top: 0;
  }
}

// router view
.router-view-enter-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(100%);
}

.router-view-enter-to {
  z-index: 2;
  transform: translateX(0%);
}

.router-view-leave-active {
  z-index: -1;
}

.router-view-leave-to {
  z-index: -1;
}

// router view back

.router-view-back-leave-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(0%);
}

.router-view-back-leave-to {
  z-index: 2;
  transform: translateX(100%);
}
</style>
