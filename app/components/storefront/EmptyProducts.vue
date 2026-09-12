<script setup lang="ts">
import { PackageX } from 'lucide-vue-next'
import { useProductFiltersStore } from '~/stores/productFilters'

const filtersStore = useProductFiltersStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div class="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 shadow-premium dark:shadow-premium-dark border border-border">
      <PackageX class="w-12 h-12 text-text-secondary" />
    </div>
    <h3 class="text-2xl font-bold text-text-primary mb-2">لا توجد منتجات</h3>
    <p class="text-text-secondary mb-8 max-w-md">
      لم نتمكن من العثور على أي منتجات تطابق بحثك أو الفلاتر المحددة. جرب تغيير بعض الخيارات.
    </p>
    <button 
      @click="filtersStore.clearFilters()"
      class="px-8 py-3 bg-primary text-surface rounded-full font-bold hover:bg-primary-hover transition-colors shadow-premium"
    >
      مسح الفلاتر
    </button>
  </div>
</template>
