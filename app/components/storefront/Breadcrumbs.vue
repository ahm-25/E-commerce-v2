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
  <nav class="flex items-center text-sm text-text-secondary py-4" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 space-x-reverse">
      <li>
        <NuxtLink to="/" class="hover:text-primary transition-colors flex items-center">
          <Home class="w-4 h-4" />
          <span class="sr-only">الرئيسية</span>
        </NuxtLink>
      </li>
      
      <li v-for="(item, index) in items" :key="index" class="flex items-center space-x-2 space-x-reverse">
        <ChevronLeft class="w-4 h-4 text-border" />
        <NuxtLink 
          v-if="item.to && index !== items.length - 1" 
          :to="item.to"
          class="hover:text-primary transition-colors font-medium"
        >
          {{ item.label }}
        </NuxtLink>
        <span 
          v-else 
          class="text-text-primary font-semibold"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
