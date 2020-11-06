import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes } from "@/modules/auth/routes";
import PageHomepage from "@/modules/homepage/pages/PageHomepage.vue";
import PageProjects from "@/modules/projects/pages/PageProjects.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: PageHomepage,
    children: [
      //prettier-ignore
      { path: "projects", component: PageProjects },
    ],
  },
  ...authRoutes,
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
