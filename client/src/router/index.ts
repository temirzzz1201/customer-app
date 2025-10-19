import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
