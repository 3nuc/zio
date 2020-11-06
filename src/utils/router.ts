import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes } from "@/modules/auth/routes";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/auth" },
  ...authRoutes,
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
