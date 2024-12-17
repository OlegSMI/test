<script setup lang="ts">
import kitchenRouterIcon from "@/components/icons/svg/kitchenRouterIcon.svg";
import storeRouterIcon from "@/components/icons/svg/storeRouterIcon.svg";
import taskRouterIcon from "@/components/icons/svg/taskRouterIcon.svg";
import RouterItem from "@/components/RouterItem.vue";
import { RouteName } from "@/constants/route_name";
import { useRouter } from "vue-router";

const router = useRouter();


</script>

<template>
  <div class="navigate">
      <RouterItem
        :img="kitchenRouterIcon"
        title="Kitchen"
        text="Бронирования еды и столов"
        @click="router.push({ name: RouteName.KITCHEN_ROOT })"
      />
      <a href="https://concierge-store.pages.dev/" target="_blank" rel="noopener noreferrer">
        <RouterItem
        :img="storeRouterIcon"
        title="Store"
        text="Внутренний маркетплейс"
      />
    </a>
      
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
