<script setup lang="ts">
import { useAccountStore } from '~/stores/account'
import { Package, Truck, CheckCircle, Heart } from 'lucide-vue-next'

const accountStore = useAccountStore()

const statCards = [
  { 
    id: 'total', 
    title: 'إجمالي الطلبات', 
    icon: Package, 
    key: 'totalOrders',
    colorClass: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400',
    link: '/account/orders',
    linkText: 'عرض جميع الطلبات'
  },
  { 
    id: 'pending', 
    title: 'الطلبات قيد التنفيذ', 
    icon: Truck, 
    key: 'pendingOrders',
    colorClass: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    link: '/account/orders?status=pending',
    linkText: 'متابعة الطلبات'
  },
  { 
    id: 'completed', 
    title: 'الطلبات المكتملة', 
    icon: CheckCircle, 
    key: 'completedOrders',
    colorClass: 'text-green-500 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
    link: '/account/orders?status=completed',
    linkText: 'عرض الطلبات'
  },
  { 
    id: 'wishlist', 
    title: 'المنتجات المفضلة', 
    icon: Heart, 
    key: 'wishlistCount',
    colorClass: 'text-red-500 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    link: '/account/wishlist',
    linkText: 'عرض المفضلة'
  },
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Skeleton Loaders -->
    <template v-if="accountStore.isLoading">
      <div v-for="i in 4" :key="`skel-${i}`" class="bg-surface rounded-2xl p-5 border border-border shadow-sm flex flex-col justify-between h-36 animate-pulse">
        <div class="flex justify-between items-start">
          <div class="h-4 w-24 bg-border rounded"></div>
          <div class="w-12 h-12 bg-border rounded-full"></div>
        </div>
        <div class="h-8 w-12 bg-border rounded mt-2"></div>
        <div class="h-3 w-20 bg-border rounded mt-4"></div>
      </div>
    </template>
    
    <!-- Actual Stats -->
    <template v-else-if="accountStore.stats">
      <div 
        v-for="card in statCards" 
        :key="card.id" 
        class="bg-surface rounded-2xl p-5 border border-border shadow-sm flex flex-col hover:shadow-premium transition-shadow duration-300"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h4 class="text-sm font-medium text-text-secondary mb-1">{{ card.title }}</h4>
            <div class="text-3xl font-bold text-text-primary">
              {{ accountStore.stats[card.key as keyof typeof accountStore.stats] }}
            </div>
          </div>
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center', card.colorClass]">
            <component :is="card.icon" class="w-6 h-6" />
          </div>
        </div>
        <div class="mt-auto pt-4 border-t border-border">
          <NuxtLink :to="card.link" class="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors">
            {{ card.linkText }}
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>
