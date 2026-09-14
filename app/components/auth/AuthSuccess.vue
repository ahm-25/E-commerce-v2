<script setup lang="ts">
defineProps<{
  message?: string | null
}>()
</script>

<template>
  <div v-if="message" class="rounded-lg bg-green-50 dark:bg-green-900/30 p-4 border border-green-200 dark:border-green-800/50 flex items-start gap-3 font-arabic text-right mb-4">
    <svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p class="text-sm text-green-800 dark:text-green-300">{{ message }}</p>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
</style>
