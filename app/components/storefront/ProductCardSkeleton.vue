<script setup lang="ts">
defineProps<{
  viewMode?: 'grid' | 'list'
}>()
</script>

<template>
  <div 
    class="flex gap-4 animate-pulse"
    :class="viewMode === 'list' ? 'flex-row items-center bg-surface border border-border rounded-2xl p-4' : 'flex-col min-w-[200px] md:min-w-[280px]'"
  >
    <!-- Image Skeleton -->
    <div 
      class="bg-gray-200 dark:bg-gray-800 rounded-2xl flex-shrink-0"
      :class="viewMode === 'list' ? 'w-32 h-32 md:w-48 md:h-48' : 'aspect-[3/4] w-full'"
    ></div>

    <!-- Info Skeleton -->
    <div class="flex flex-col gap-3 w-full">
      <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
      <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
      
      <div class="flex gap-1.5 mt-2">
        <div class="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div class="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        <div class="w-3.5 h-3.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      </div>
    </div>
  </div>
</template>
