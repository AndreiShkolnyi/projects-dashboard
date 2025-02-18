import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const modifiedRoutes = routes.map((route) => {
  if (['/login', 'register', '/'].includes(route.path)) {
    return {
      ...route,
      meta: { showBreadcrumbs: false },
    }
  } else {
    return {
      ...route,
      meta: { showBreadcrumbs: true },
    }
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: modifiedRoutes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await authStore.getSession()

  const isAuthPage = ['/login', '/register'].includes(to.path)

  if (!authStore.user && !isAuthPage) {
    return {
      name: '/login',
    }
  }

  if (authStore.user && isAuthPage) {
    return {
      name: '/',
    }
  }
})

export default router
