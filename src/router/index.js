import { createRouter, createWebHistory } from 'vue-router'
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
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
    }
  ]
})

export default router
