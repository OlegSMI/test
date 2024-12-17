<script setup lang="ts">
import kitchenRouterIcon from "@/components/icons/svg/kitchenRouterIcon.svg";
import storeRouterIcon from "@/components/icons/svg/storeRouterIcon.svg";
import taskRouterIcon from "@/components/icons/svg/taskRouterIcon.svg";
import RouterItem from "@/components/RouterItem.vue";
import { RouteName } from "@/constants/route_name";
import { useRouter } from "vue-router";

const router = useRouter();

const routerItems = [
  {
    img: kitchenRouterIcon,
    title: "Kitchen",
    text: "Бронирования еды и столов",
    route: router.push({ name: RouteName.KITCHEN_ROOT }),
  },
  {
    img: storeRouterIcon,
    title: "Store",
    text: "Внутренний маркетплейс",
    route: window.open('https://concierge-store.pages.dev/', '_blank'),
  },
  {
    img: taskRouterIcon,
    title: "Task",
    text: "",
    route: router.push({ name: RouteName.TASK_SELECT_TOPIC }),
  },

];
</script>

<template>
  <div class="navigate">
    <div v-for="item in routerItems">
      <RouterItem
        v-if="!item.mode"
        :key="item.title"
        :img="item.img"
        :title="item.title"
        :text="item.text"
        @click="item.route"
      />
    </div>
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
