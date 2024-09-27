import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddTodoView from "../views/AddTodoView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false, title: 'Login | My Todo App' }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { requiresAuth: false, title: 'Register | My Todo App' }
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true, title: 'Home | My Todo App' }
        },
        {
            path: '/add',
            name: 'add',
            component: AddTodoView,
            meta: { requiresAuth: true, title: 'Add Todo | My Todo App' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.access_token;

    if(to.meta.requiresAuth && !token) {
        next({ name: 'login' });
    } else if (to.name === 'login' && token) {
        next({ name: 'home' });
    } else {
        document.title = to.meta.title || 'My Todo App'
        next()
    }
})

export default router;