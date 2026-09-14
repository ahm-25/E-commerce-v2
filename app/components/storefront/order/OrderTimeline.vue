<script setup lang="ts">
import { Check, Truck } from 'lucide-vue-next'

defineProps<{
  timeline: { status: string, stages: any[] } | null
}>()
</script>

<template>
  <div v-if="timeline" class="py-10 border-b border-gray-100 dark:border-gray-800">
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-8">
      متابعة حالة الطلب
    </h3>
    
    <div class="relative">
      <!-- Desktop Horizontal Line -->
      <div class="hidden md:block absolute top-4 left-10 right-10 h-0.5 bg-gray-200 dark:bg-gray-700">
        <!-- Progress Bar (Calculate based on completed stages) -->
        <div 
          class="absolute top-0 right-0 h-full bg-primary-600 transition-all duration-1000"
          :style="{ width: `${(timeline.stages.filter(s => s.status === 'completed').length / (timeline.stages.length - 1)) * 100}%` }"
        ></div>
      </div>
      
      <!-- Stages Grid -->
      <div class="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
        <div 
          v-for="(stage, index) in timeline.stages" 
          :key="stage.id"
          class="flex md:flex-col items-center md:items-center text-right md:text-center relative gap-4 md:gap-3"
          :class="[
            stage.status === 'completed' ? 'text-primary-600 dark:text-primary-400' :
            stage.status === 'current' ? 'text-gray-900 dark:text-white' :
            'text-gray-400 dark:text-gray-500'
          ]"
        >
          <!-- Mobile Vertical Line inside Loop (connects to next) -->
          <div v-if="index !== timeline.stages.length - 1" class="md:hidden absolute top-8 bottom-[-24px] right-4 w-px bg-gray-200 dark:bg-gray-700 -z-10">
            <div 
              class="absolute top-0 right-0 w-full bg-primary-600 transition-all duration-1000"
              :style="{ height: stage.status === 'completed' ? '100%' : '0%' }"
            ></div>
          </div>
          
          <!-- Circle Indicator -->
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 border-2 shrink-0 z-10"
            :class="[
              stage.status === 'completed' ? 'border-primary-600 bg-primary-600 text-white' :
              stage.status === 'current' ? 'border-primary-600 ring-4 ring-primary-50 dark:ring-primary-900/20' :
              'border-gray-200 dark:border-gray-700'
            ]"
          >
            <Check v-if="stage.status === 'completed'" class="w-4 h-4" />
            <div v-else-if="stage.status === 'current'" class="w-2.5 h-2.5 bg-primary-600 rounded-full"></div>
          </div>
          
          <!-- Text details -->
          <div class="flex-grow">
            <p class="font-medium text-sm md:text-base">{{ stage.title }}</p>
            <p v-if="stage.date" class="text-xs mt-1" :class="[stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400']">
              {{ stage.date }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Info Banner -->
    <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex items-start gap-4">
      <div class="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
        <Truck class="w-5 h-5" />
      </div>
      <div>
        <p class="font-medium text-blue-900 dark:text-blue-200 text-sm mb-1">
          سنقوم بإرسال إشعار عند شحن طلبك
        </p>
        <p class="text-xs text-blue-700 dark:text-blue-300">
          يمكنك متابعة حالة طلبك في أي وقت من خلال رقم الطلب.
        </p>
      </div>
    </div>
  </div>
</template>
