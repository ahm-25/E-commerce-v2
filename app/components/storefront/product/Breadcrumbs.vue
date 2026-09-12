<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

const props = defineProps<{
  items: { name: string, url: string }[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center space-x-2 space-x-reverse flex-wrap gap-y-2 text-sm text-text-secondary">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <NuxtLink 
          :to="item.url" 
          class="hover:text-primary transition-colors"
          :class="{ 'text-primary font-medium pointer-events-none': index === items.length - 1 }"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.name }}
        </NuxtLink>
        <ChevronLeft v-if="index < items.length - 1" class="w-4 h-4 mx-2 text-border" />
      </li>
    </ol>
  </nav>
</template>
