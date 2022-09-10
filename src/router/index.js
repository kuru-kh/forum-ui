import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForumsView from '../views/ForumsView.vue'
import ForumsCreate from '../views/ForumsCreate.vue'
import ForumsSingleView from '../views/ForumsSingleView.vue'
import ForumsPendingView from '../views/ForumsPendingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: HomeView // update component
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forums',
      name: 'forum.index',
      component: ForumsView
    },
    {
      path: '/forums/pending',
      name: 'forum.pending',
      component: ForumsPendingView
    },
    {
      path: '/forums/create',
      name: 'forum.create',
      component: ForumsCreate
    },
    {
      path: '/forums/:id/view',
      name: 'forum.view',
      component: ForumsSingleView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
