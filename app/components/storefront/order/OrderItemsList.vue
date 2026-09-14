<script setup lang="ts">
import type { OrderItem } from '~/types'

defineProps<{
  items: OrderItem[]
}>()
</script>

<template>
  <div class="py-8">
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">
      المنتجات المطلوبة
    </h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
      >
        <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <NuxtImg 
            :src="item.image" 
            :alt="item.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div class="flex-grow min-w-0">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
            {{ item.name }}
          </h4>
          <div class="flex items-center justify-between mt-2">
            <span class="text-sm font-bold text-gray-900 dark:text-white dir-ltr">
              {{ item.price.toLocaleString('en-US') }} ج.م
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              الكمية: {{ item.quantity }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
  display: inline-block;
}
</style>
