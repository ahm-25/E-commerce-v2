<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Lock,
  Settings,
  LogOut,
  BadgeCheck
} from 'lucide-vue-next'

const route = useRoute()
const accountStore = useAccountStore()

const menuItems = [
  { name: 'لوحة التحكم', path: '/account', icon: LayoutDashboard },
  { name: 'طلباتي', path: '/account/orders', icon: ShoppingBag },
  { name: 'المفضلة', path: '/account/wishlist', icon: Heart },
  { name: 'العناوين المحفوظة', path: '/account/addresses', icon: MapPin },
  { name: 'البيانات الشخصية', path: '/account/profile', icon: User },
  { name: 'تغيير كلمة المرور', path: '/account/security', icon: Lock },
  { name: 'الإعدادات', path: '/account/settings', icon: Settings },
]

const isActive = (path: string) => {
  if (path === '/account') {
    return route.path === '/account'
  }
  return route.path.startsWith(path)
}

const handleLogout = () => {
  accountStore.logout()
  // In a real app, redirect to login or home
  navigateTo('/')
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
    <!-- User Info Profile Area -->
    <div v-if="accountStore.profile" class="p-6 border-b border-border flex flex-col items-center text-center">
      <div class="relative mb-4">
        <div class="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-primary/10 overflow-hidden shadow-sm">
          <img v-if="accountStore.profile.avatarUrl" :src="accountStore.profile.avatarUrl" :alt="`${accountStore.profile.firstName} ${accountStore.profile.lastName}`" class="w-full h-full object-cover">
          <User v-else class="w-10 h-10 text-primary/60" />
        </div>
      </div>
      <h3 class="text-lg font-bold text-text-primary mb-1">{{ accountStore.profile.firstName }} {{ accountStore.profile.lastName }}</h3>
      <p class="text-sm text-text-secondary mb-3" dir="ltr">{{ accountStore.profile.email }}</p>
      
      <div v-if="accountStore.profile.status === 'active'" class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
        <BadgeCheck class="w-4 h-4" />
        حساب مفعل
      </div>
    </div>
    
    <!-- Skeleton loader for profile area -->
    <div v-else class="p-6 border-b border-border flex flex-col items-center text-center animate-pulse">
      <div class="w-20 h-20 bg-border rounded-full mb-4"></div>
      <div class="h-5 w-32 bg-border rounded mb-2"></div>
      <div class="h-4 w-40 bg-border rounded mb-3"></div>
      <div class="h-6 w-24 bg-border rounded-full"></div>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-4 flex flex-col gap-1">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold',
          isActive(item.path) 
            ? 'bg-primary/5 text-primary border-r-4 border-primary' 
            : 'text-text-secondary hover:bg-background hover:text-text-primary border-r-4 border-transparent'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" :class="isActive(item.path) ? 'text-primary' : 'text-text-secondary'" />
        {{ item.name }}
      </NuxtLink>

      <div class="my-2 border-t border-border"></div>

      <button
        @click="handleLogout"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border-r-4 border-transparent"
      >
        <LogOut class="w-5 h-5" />
        تسجيل الخروج
      </button>
    </nav>
  </div>
</template>
