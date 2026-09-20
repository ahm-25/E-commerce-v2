<script setup lang="ts">
import { Clock } from 'lucide-vue-next'

// TODO: Replace with actual backend data once available in tenant configuration
const workingHours = [
  { days: 'السبت — الخميس', hours: '10:00 ص — 10:00 م' },
  { days: 'الجمعة', hours: 'مغلق' }
]
</script>

<template>
  <div class="p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 font-arabic">
    <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div class="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center transition-colors">
        <Clock class="w-5 h-5" stroke-width="2" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 dark:text-white transition-colors">ساعات العمل</h3>
    </div>
    
    <div class="space-y-4">
      <div 
        v-for="schedule in workingHours" 
        :key="schedule.days"
        class="flex items-center justify-between"
      >
        <span class="text-gray-500 dark:text-gray-400 font-medium transition-colors">{{ schedule.days }}</span>
        <span class="text-gray-900 dark:text-white font-bold transition-colors">{{ schedule.hours }}</span>
      </div>
    </div>
  </div>
</template>
