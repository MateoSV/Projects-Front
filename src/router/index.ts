import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import TasksView from "@/views/TasksView.vue";
import {validateToken} from "@/middleware/authMiddleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      beforeEnter: validateToken,
      children: [
        {
          path: '/projects',
          name: 'Projects',
          component: ProjectsView,
        },
        {
          path: '/tasks',
          name: 'Tasks',
          component: TasksView,
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (to.name === 'Login' && token) {
      return next({ name: 'Projects' });
    }

    await validateToken(to, from, next);

  }

  if (to.name !== 'Login') {
      return next({ name: 'Login' });
  }

  return next();

});

export default router
