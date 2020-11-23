import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterView,
} from "vue-router";
import { authRoutes } from "@/modules/auth/routes";
import PageHomepage from "@/modules/homepage/pages/PageHomepage.vue";
import PageProjects from "@/modules/projects/pages/PageProjects.vue";
import PageSingleProject from "@/modules/projects/pages/PageSingleProject.vue";
import PageSingleEmployee from "@/modules/employee/pages/PageSingleEmployee.vue";
import PageEmployees from "@/modules/employee/pages/PageEmployees.vue";
import PageTrainings from "@/modules/trainings/pages/PageTrainings.vue";
import PageSingleTraining from "@/modules/trainings/pages/PageSingleTraining.vue";
import PageAddProject from "@/modules/projects/pages/PageAddProject.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home/",
    name: "Home",
    redirect: "/home/projects",
    component: PageHomepage,
    children: [
      {
        path: "employees",
        component: RouterView,
        children: [
          {
            path: "",
            component: PageEmployees,
          },
          {
            path: ":id",
            name: "SingleEmployee",
            component: PageSingleEmployee,
          },
        ],
      },
      {
        path: "trainings",
        component: RouterView,
        children: [
          {
            path: "",
            component: PageTrainings,
          },
          {
            name: "SingleTraining",
            path: ":id(\\d+)",
            props: true,
            component: PageSingleTraining,
          },
        ],
      },
      { path: "candidates", component: PageEmployees },
      { path: "projects", component: PageProjects },
      { path: "projects/:id", component: PageSingleProject },
      { path: "projects/add", component: PageAddProject, name: "AddProject" },
    ],
  },
  ...authRoutes,
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
