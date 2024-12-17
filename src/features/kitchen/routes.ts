import { RouteName } from "@/constants/route_name";
import type { RouteRecordRaw } from "vue-router";

export const kitchenRoutes: RouteRecordRaw[] = [
  {
    path: "/kitchen",
    component: () => import("@/features/kitchen/KitchenRootView.vue"),
    name: RouteName.KITCHEN_ROOT,
  },
  {
    path: "/kitchen/home",
    component: () => import("@/features/kitchen/KitchenHomeView.vue"),
    name: RouteName.KITCHEN_HOME,
  },
  {
    path: "/kitchen/welcome",
    component: () => import("@/features/kitchen/KitchenOnboardView.vue"),
    name: RouteName.KITCHEN_ONBOARD,
  },
  {
    path: "/kitchen/product/:id",
    component: () => import("@/features/kitchen/KitchenProductView.vue"),
    name: RouteName.KITCHEN_PRODUCT_ID,
  },
  {
    path: "/birthday",
    component: () => import("@/views/BirthdayView.vue"),
    name: RouteName.BIRTHDAY,
  },
  {
    path: "/not-access",
    component: () => import("@/views/NotAccessView.vue"),
    name: RouteName.NOT_ACCESS,
  },
  {
    path: "/kitchen/cart",
    component: () => import("@/features/kitchen/KitchenCartView.vue"),
    name: RouteName.KITCHEN_CART,
  },
  {
    path: "/kitchen/checkout",
    component: () => import("@/features/kitchen/KitchenCartCheckoutView.vue"),
    name: RouteName.KITCHEN_CART_CHECKOUT,
  },
  {
    path: "/kitchen/confirm",
    component: () => import("@/features/kitchen/KitchenCartConfirmView.vue"),
    name: RouteName.KITCHEN_CART_CONFIRM,
  },
  {
    path: "/kitchen/order/:id",
    component: () => import("@/features/kitchen/KitchenOrderView.vue"),
    name: RouteName.KITCHEN_ORDER_ID,
  },
];
