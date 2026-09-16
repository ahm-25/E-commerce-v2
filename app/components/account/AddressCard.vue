<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Home, Briefcase, Map, Edit, Trash2, CheckCircle2, Star } from 'lucide-vue-next'
import type { Address } from '~/types'

const props = defineProps<{
  address: Address
}>()

const emit = defineEmits<{
  (e: 'edit', address: Address): void
  (e: 'delete', id: string): void
  (e: 'setDefault', id: string): void
}>()

const getAddressIcon = (label: string) => {
  if (label.includes('المنزل')) return Home
  if (label.includes('العمل')) return Briefcase
  return Map
}

const iconComponent = computed(() => getAddressIcon(props.address.label))
</script>

<template>
  <div 
    class="border rounded-2xl p-5 flex flex-col relative transition-all duration-300 hover:shadow-md"
    :class="[
      address.isDefault 
        ? 'border-primary/50 bg-primary/5 shadow-sm' 
        : 'border-border bg-surface hover:border-primary/30'
    ]"
  >
    <!-- Default Badge -->
    <div v-if="address.isDefault" class="absolute top-4 left-4 flex items-center gap-1.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-500/30">
      <CheckCircle2 class="w-3.5 h-3.5" />
      <span>العنوان الافتراضي</span>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-4 mt-1">
      <div class="flex items-center gap-2.5 text-primary">
        <div class="p-2 bg-primary/10 rounded-xl">
          <component :is="iconComponent" class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-text-primary text-lg">{{ address.label }}</h4>
      </div>
    </div>
    
    <!-- Details -->
    <div class="text-sm text-text-secondary space-y-2 mb-6 flex-grow">
      <p class="font-bold text-text-primary text-base flex items-center gap-2">
        <svg class="w-4 h-4 text-text-secondary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        {{ address.recipientName }}
      </p>
      
      <p class="flex items-start gap-2 leading-relaxed">
        <MapPin class="w-4 h-4 text-text-secondary/70 shrink-0 mt-0.5" />
        <span>{{ address.addressLine }}<br>{{ address.city }}، {{ address.governorate }}</span>
      </p>

      <p class="flex items-center gap-2" dir="ltr" style="text-align: right;">
        <span>{{ address.phone }}</span>
        <svg class="w-4 h-4 text-text-secondary/70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </p>
    </div>
    
    <!-- Actions -->
    <div class="flex items-center gap-3 pt-4 border-t border-border/60 mt-auto flex-wrap">
      <button 
        @click="emit('edit', address)"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
      >
        <Edit class="w-4 h-4" />
        تعديل
      </button>
      
      <button 
        @click="emit('delete', address.id)"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
      >
        <Trash2 class="w-4 h-4" />
        حذف
      </button>

      <button 
        v-if="!address.isDefault"
        @click="emit('setDefault', address.id)"
        class="ms-auto flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors border border-primary/20"
      >
        تعيين كافتراضي
      </button>
    </div>
  </div>
</template>
