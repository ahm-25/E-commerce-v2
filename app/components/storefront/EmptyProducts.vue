<script setup lang="ts">
import { useProductFiltersStore } from '~/stores/productFilters'
import EmptyState from '~/components/common/EmptyState.vue'

const filtersStore = useProductFiltersStore()
</script>

<template>
  <EmptyState 
    title="لا توجد منتجات"
    description="لم نتمكن من العثور على أي منتجات تطابق الفلاتر المحددة. جرب تغيير بعض الخيارات أو مسح الفلاتر."
    icon="PackageX"
    :primary-action="{
      label: 'مسح الفلاتر',
      action: () => filtersStore.clearFilters()
    }"
  />
</template>
