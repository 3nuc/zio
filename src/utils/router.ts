import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes } from "@/modules/auth/routes";
import PageHomepage from "@/modules/homepage/pages/PageHomepage.vue";
import PageProjects from "@/modules/projects/pages/PageProjects.vue";
import PageSingleProject from "@/modules/projects/pages/PageSingleProject.vue";
import { h } from "vue";

const TodoComponent = { render: () => h("div", "todo") };

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: PageHomepage,
    children: [
      //prettier-ignore
      { path: "employees", component: TodoComponent},
      { path: "trainings", component: TodoComponent },
      { path: "candidates", component: TodoComponent },
      { path: "projects", component: PageProjects },
      { path: "projects/:id", component: PageSingleProject },
    ],
  },
  ...authRoutes,
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
