<script setup lang="ts">
import kitchenRouterIcon from "@/components/icons/svg/kitchenRouterIcon.svg";
import storeRouterIcon from "@/components/icons/svg/storeRouterIcon.svg";
import taskRouterIcon from "@/components/icons/svg/taskRouterIcon.svg";
import RouterItem from "@/components/RouterItem.vue";
import { RouteName } from "@/constants/route_name";
import { Utils } from "@tma.js/sdk";
import { useRouter } from "vue-router";

const router = useRouter();

const utils = new Utils();
</script>

<template>
  <div class="navigate">
    <RouterItem
      :img="kitchenRouterIcon"
      title="Kitchen"
      text="Бронирования еды и столов"
      @click="router.push({ name: RouteName.KITCHEN_ROOT })"
    />
    <RouterItem
      :img="storeRouterIcon"
      title="Store"
      text="Внутренний маркетплейс"
      @click="utils.openTelegramLink('https://t.me/@Amelia_T07')"
    />

    <RouterItem
      :img="taskRouterIcon"
      title="Task"
      text=""
      @click="router.push({ name: RouteName.TASK_SELECT_TOPIC })"
    />
  </div>
</template>

<style scoped>
.navigate {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}
</style>
