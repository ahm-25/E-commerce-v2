<script setup lang="ts">
import { onMounted } from 'vue'
import { useWishlistStore } from '~/stores/wishlist'
import WishlistGrid from '~/components/wishlist/WishlistGrid.vue'
import WishlistToolbar from '~/components/wishlist/WishlistToolbar.vue'
import WishlistEmptyState from '~/components/wishlist/WishlistEmptyState.vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'المفضلة | حسابي'
})

import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'

const router = useRouter()
const accountStore = useAccountStore()
const wishlistStore = useWishlistStore()

onMounted(() => {
  if (!accountStore.isLoggedIn) {
    router.push('/auth/login')
    return
  }

  // Load products details on mount
  if (wishlistStore.itemsCount > 0) {
    wishlistStore.loadWishlist()
  }
})
</script>

<template>
  <div class="min-h-screen bg-background py-8 md:py-12">
    <div class="container mx-auto px-4 lg:px-8">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-text-secondary mb-8">
        <NuxtLink to="/" class="hover:text-primary transition-colors">الرئيسية</NuxtLink>
        <span>/</span>
        <NuxtLink to="/account" class="hover:text-primary transition-colors">حسابي</NuxtLink>
        <span>/</span>
        <span class="text-text-primary font-medium">المفضلة</span>
      </nav>
      
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar -->
        <div class="w-full lg:w-1/4 flex-shrink-0">
          <AccountSidebar />
        </div>
        
        <!-- Main Content -->
        <div class="w-full lg:w-3/4">
          <!-- Hero Section -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-text-primary mb-2">المفضلة</h1>
            <p class="text-text-secondary">
              احتفظ بالمنتجات التي أعجبتك لتعود إليها في أي وقت.
            </p>
          </div>
          
          <div class="bg-surface rounded-2xl border border-border p-4 md:p-6 shadow-sm">
            
            <!-- Loading State -->
            <div v-if="wishlistStore.isLoading" class="space-y-6">
              <div class="h-14 bg-background border border-border rounded-lg animate-pulse w-full"></div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <div v-for="i in 4" :key="i" class="flex flex-col gap-3">
                  <div class="aspect-[3/4] bg-background border border-border rounded-lg animate-pulse"></div>
                  <div class="h-4 bg-background border border-border rounded w-3/4 animate-pulse"></div>
                  <div class="h-4 bg-background border border-border rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <!-- Loaded State -->
            <template v-else>
              <!-- Empty State -->
              <WishlistEmptyState v-if="wishlistStore.itemsCount === 0" />
              
              <!-- Grid State -->
              <div v-else>
                <WishlistToolbar :item-count="wishlistStore.itemsCount" />
                <WishlistGrid :products="wishlistStore.sortedItems.map(i => i.product).filter(p => !!p)" />
              </div>
            </template>
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
