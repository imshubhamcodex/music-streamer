import { createRouter, createWebHistory } from "vue-router";
import Player from "../components/Player.vue";

const routes = [
  {
    path: "/player",
    name: "Home",
    component: Player,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
