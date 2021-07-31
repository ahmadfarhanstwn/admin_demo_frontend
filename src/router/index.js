import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/Index.vue"),
  },
  {
    path: "/data",
    name: "dashboard.data",
    component: () => import("@/views/dashboard/TableData.vue"),
  },
  {
    path: "/create",
    name: "dashboard.create",
    component: () => import("@/views/dashboard/Create.vue"),
  },
  {
    path: "/edit/:id",
    name: "dashboard.edit",
    component: () => import("@/views/dashboard/Edit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
