import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DrinkView from "../views/DrinkView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/drinks/:id',
            name: 'drink',
            component: DrinkView
        }
    ]
});

export default router;