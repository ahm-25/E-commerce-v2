<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  image?: string
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-12" dir="rtl">
    <div class="max-w-7xl w-full flex bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden min-h-[650px] border border-gray-100 dark:border-gray-700/50">
      
      <!-- Form Side -->
      <div class="w-full lg:w-[45%] flex flex-col p-8 sm:p-12 lg:p-16">
        <div class="mb-8">
          <NuxtLink to="/" class="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors">
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            العودة للرئيسية
          </NuxtLink>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-arabic">{{ title }}</h1>
          <p class="text-gray-600 dark:text-gray-400 text-sm font-arabic">{{ subtitle }}</p>
        </div>
        
        <div class="flex-grow flex flex-col justify-center">
          <slot />
        </div>
      </div>

      <!-- Image Side (Hidden on Mobile) -->
      <div class="hidden lg:block lg:w-[55%] relative bg-gray-100 dark:bg-gray-700 overflow-hidden rounded-l-[2rem]">
        <img 
          v-if="image"
          :src="image" 
          alt="Lifestyle Image" 
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 font-arabic">
          صورة ترويجية
        </div>
        <!-- Optional overlay -->
        <div class="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
</style>
