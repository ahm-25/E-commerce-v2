import { useAuthStore } from '~/stores/auth'

// Pages that require a signed-in customer
const isProtected = (path: string) => path === '/account' || path.startsWith('/account/')

// Pages that make no sense once signed in
const GUEST_ONLY = ['/auth/login', '/auth/register', '/auth/forgot-password']

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  auth.restoreSession()

  if (isProtected(to.path) && !auth.isAuthenticated) {
    return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } }, { replace: true })
  }

  if (GUEST_ONLY.includes(to.path) && auth.isAuthenticated) {
    return navigateTo(safeRedirect(to.query.redirect, '/account'), { replace: true })
  }
})
