<script setup lang="ts">
import { ChevronLeft, Home } from 'lucide-vue-next'

interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="flex items-center text-sm md:text-base py-6 w-full overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-3 space-x-reverse min-w-max">
      <li>
        <NuxtLink to="/" class="flex items-center justify-center w-10 h-10 rounded-full bg-surface shadow-sm border border-border/50 text-text-secondary hover:text-primary hover:bg-primary/5 hover:border-primary/20 hover:scale-105 transition-all duration-300">
          <Home class="w-4 h-4" />
          <span class="sr-only">الرئيسية</span>
        </NuxtLink>
      </li>
      
      <li v-for="(item, index) in items" :key="index" class="flex items-center space-x-3 space-x-reverse">
        <ChevronLeft class="w-4 h-4 text-border" />
        <NuxtLink 
          v-if="item.to && index !== items.length - 1" 
          :to="item.to"
          class="text-text-secondary hover:text-primary font-medium transition-colors hover:underline underline-offset-4 decoration-primary/30"
        >
          {{ item.label }}
        </NuxtLink>
        <div 
          v-else 
          class="px-4 py-1.5 rounded-full bg-primary/5 text-primary font-bold border border-primary/10 shadow-sm"
          aria-current="page"
        >
          {{ item.label }}
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
