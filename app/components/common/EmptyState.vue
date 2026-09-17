<script setup lang="ts">
import { computed } from 'vue'
import * as lucideIcons from 'lucide-vue-next'

const props = defineProps<{
  title: string
  description?: string
  icon?: string // Must match a lucide icon name like 'PackageSearch'
  primaryAction?: {
    label: string
    action: () => void
  }
  secondaryAction?: {
    label: string
    action?: () => void
    link?: string
  }
}>()

// Dynamically resolve the Lucide icon if provided
const IconComponent = computed(() => {
  if (props.icon && (lucideIcons as any)[props.icon]) {
    return (lucideIcons as any)[props.icon]
  }
  return (lucideIcons as any)['FileX'] // Fallback
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center px-4 bg-surface rounded-3xl border border-border">
    <div class="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
      <component :is="IconComponent" class="w-12 h-12 text-primary" />
    </div>
    
    <h2 class="text-2xl font-bold text-text-primary mb-3">{{ title }}</h2>
    
    <p v-if="description" class="text-text-secondary max-w-md mx-auto mb-8 text-lg">
      {{ description }}
    </p>
    
    <div v-if="primaryAction || secondaryAction" class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
      <button 
        v-if="primaryAction"
        @click="primaryAction.action"
        class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg transition-all flex-1"
      >
        {{ primaryAction.label }}
      </button>
      
      <button 
        v-if="secondaryAction && secondaryAction.action"
        @click="secondaryAction.action"
        class="px-6 py-3 bg-surface border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-all flex-1"
      >
        {{ secondaryAction.label }}
      </button>

      <NuxtLink 
        v-else-if="secondaryAction && secondaryAction.link"
        :to="secondaryAction.link"
        class="px-6 py-3 bg-surface border border-border text-text-primary rounded-xl font-bold hover:bg-background transition-all flex-1 inline-flex items-center justify-center"
      >
        {{ secondaryAction.label }}
      </NuxtLink>
    </div>
  </div>
</template>
