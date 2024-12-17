import { RouteName } from "@/constants/route_name";
import type { RouteRecordRaw } from "vue-router";

export const taskRoutes: RouteRecordRaw[] = [
  {
    path: "/task/topic",
    component: () => import("@/features/task/TaskSelectTopicView.vue"),
    name: RouteName.TASK_SELECT_TOPIC,
  },
  {
    path: "/task/message",
    component: () => import("@/features/task/TaskMessageView.vue"),
    name: RouteName.TASK_MESSAGE,
  },
];
