import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { RouteName } from "@/constants/route_name";
import { kitchenRoutes } from "@/features/kitchen/routes";
import { taskRoutes } from "@/features/task/routes";

const routes: RouteRecordRaw[] = [
  ...kitchenRoutes,
  ...taskRoutes,
  {
    path: "/",
    component: () => import("@/components/TheLoader.vue"),
  },
  {
    path: "/access",
    name: RouteName.ACCESS,
    component: () => import("@/components/TheLoader.vue"),
  },

  {
    path: "/select-mode",
    component: () => import("@/views/SelectFeatureView.vue"),
    name: RouteName.SELECT_FEATURE,
  },

  // {
  //     path: "/404",
  //     component: () => import("@/views/404.vue"),
  // },
  // {
  //     path: "/:pathMatch(.*)*",
  //     redirect: "/404",
  // },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || ""),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.path === from.path && to.query) {
      return;
    } else {
      return {
        el: "body",
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

export default router;
