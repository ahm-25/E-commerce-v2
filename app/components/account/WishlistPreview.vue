<script setup lang="ts">
import { useAccountStore } from '~/stores/account'
import { Heart, ChevronLeft, ShoppingCart, Trash2 } from 'lucide-vue-next'

const accountStore = useAccountStore()

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })
    .format(amount)
    .replace('EGP', 'ج.م')
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
    <div class="p-6 border-b border-border flex flex-wrap gap-4 items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-xl">
          <Heart class="w-5 h-5 text-primary" />
        </div>
        <h3 class="text-xl font-bold text-text-primary">المنتجات المفضلة</h3>
      </div>
      <NuxtLink to="/account/wishlist" class="text-sm font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-1 group">
        عرض جميع المفضلة
        <ChevronLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="accountStore.isLoading" class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="`skel-wish-${i}`" class="h-48 bg-border rounded-xl animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="accountStore.wishlist.length === 0" class="p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
        <Heart class="w-8 h-8 text-text-secondary opacity-50" />
      </div>
      <h4 class="text-base font-bold text-text-primary mb-2">قائمة المفضلة فارغة</h4>
      <p class="text-sm text-text-secondary mb-4 max-w-sm">أضف المنتجات التي تعجبك إلى قائمتك المفضلة للرجوع إليها لاحقاً.</p>
    </div>

    <!-- Wishlist Grid Preview -->
    <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="product in accountStore.wishlist.slice(0, 4)" 
        :key="product.id"
        class="border border-border rounded-xl p-3 hover:border-primary/50 hover:shadow-sm transition-all duration-200 group flex flex-col relative"
      >
        <button class="absolute top-4 left-4 z-10 w-8 h-8 bg-surface/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
          <Trash2 class="w-4 h-4" />
        </button>

        <NuxtLink :to="`/products/${product.slug}`" class="block rounded-lg overflow-hidden bg-background mb-3 aspect-square relative">
          <img :src="product.images[0]?.url" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <span v-if="product.badge" class="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-md">
            {{ product.badge }}
          </span>
        </NuxtLink>
        
        <NuxtLink :to="`/products/${product.slug}`" class="text-sm font-bold text-text-primary mb-1 line-clamp-1 hover:text-primary transition-colors">
          {{ product.name }}
        </NuxtLink>
        
        <div class="mt-auto flex items-center justify-between pt-2">
          <div class="font-bold text-primary">{{ formatCurrency(product.price) }}</div>
          <button class="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="إضافة للسلة">
            <ShoppingCart class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
