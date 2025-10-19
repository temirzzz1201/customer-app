import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { useAuth } from "../composibles/useAuth";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const { user, fetchProfile } = useAuth();

  if (to.meta.requiresAuth) {
    if (!user.value) {
      const profile = await fetchProfile();
      if (!profile) return next("/");
    }
  }

  next();
});
