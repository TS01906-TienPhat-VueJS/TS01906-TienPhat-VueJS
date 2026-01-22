import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../services/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Posts from '../views/Posts.vue'
import PostDetail from '../views/PostDetail.vue'
import PostForm from '../views/PostForm.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },

  { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'Register', component: Register, meta: { guestOnly: true } },

  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetail, props: true },

  // Protected routes (yêu cầu đăng nhập)
  { path: '/posts/new', name: 'PostNew', component: PostForm, meta: { requiresAuth: true } },
  { path: '/posts/:id/edit', name: 'PostEdit', component: PostForm, props: true, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },

  { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && isAuthenticated()) {
    return { name: 'Home' }
  }
  return true
})

export default router
