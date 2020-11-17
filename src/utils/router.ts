import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes } from "@/modules/auth/routes";
import PageHomepage from "@/modules/homepage/pages/PageHomepage.vue";
import PageProjects from "@/modules/projects/pages/PageProjects.vue";
import PageSingleProject from "@/modules/projects/pages/PageSingleProject.vue";
import { h } from "vue";
import PageSingleEmployee from "@/modules/employee/pages/PageSingleEmployee.vue";

const TodoComponent = { render: () => h("div", "todo") };

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: PageHomepage,
    children: [
      //prettier-ignore
      { path: "employees", component: TodoComponent},
      {
        name: "SingleEmployee",
        path: "employee/:id",
        component: PageSingleEmployee,
      },
      { path: "trainings", component: TodoComponent },
      { path: "candidates", component: TodoComponent },
      { path: "projects/:id", component: PageSingleProject },
      { path: "projects", component: PageProjects },
    ],
  },
  ...authRoutes,
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
