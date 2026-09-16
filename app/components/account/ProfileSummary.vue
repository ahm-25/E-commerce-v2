<script setup lang="ts">
import { ref, computed } from 'vue'
import { Camera, Calendar, Phone, Mail, ShieldCheck } from 'lucide-vue-next'
import { useAccountStore } from '~/stores/account'
import AvatarUploader from './AvatarUploader.vue'

const accountStore = useAccountStore()

const isUploaderOpen = ref(false)

const fullName = computed(() => {
  if (!accountStore.profile) return ''
  return `${accountStore.profile.firstName} ${accountStore.profile.lastName}`
})

const getInitials = computed(() => {
  if (!accountStore.profile) return ''
  const first = accountStore.profile.firstName.charAt(0) || ''
  const last = accountStore.profile.lastName.charAt(0) || ''
  return (first + last).toUpperCase()
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
    <div class="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
      <!-- Background Graphic element -->
      <div class="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <!-- Avatar Section -->
      <div class="relative z-10 flex flex-col items-center gap-4">
        <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-surface shadow-md overflow-hidden bg-primary/10 flex items-center justify-center text-primary shrink-0 group">
          <img 
            v-if="accountStore.profile?.avatarUrl" 
            :src="accountStore.profile.avatarUrl" 
            :alt="fullName" 
            class="w-full h-full object-cover"
          >
          <span v-else class="text-3xl md:text-4xl font-extrabold">{{ getInitials }}</span>
          
          <!-- Hover Overlay -->
          <button 
            @click="isUploaderOpen = true"
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
          >
            <Camera class="w-6 h-6 mb-1" />
            <span class="text-xs font-semibold">تغيير الصورة</span>
          </button>
        </div>
        
        <button 
          @click="isUploaderOpen = true"
          class="md:hidden text-primary font-bold text-sm px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
        >
          تغيير الصورة
        </button>
      </div>

      <!-- Info Section -->
      <div class="relative z-10 flex-grow text-center md:text-right flex flex-col items-center md:items-start pt-2">
        <h2 class="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">{{ fullName }}</h2>
        
        <div class="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-4 text-sm text-text-secondary">
          <div class="flex items-center gap-1.5" dir="ltr">
            <Mail class="w-4 h-4" />
            <span>{{ accountStore.profile?.email }}</span>
          </div>
          
          <div v-if="accountStore.profile?.phone" class="flex items-center gap-1.5" dir="ltr">
            <Phone class="w-4 h-4" />
            <span>{{ accountStore.profile.phone }}</span>
          </div>
        </div>
        
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div 
            v-if="accountStore.profile?.status === 'active'" 
            class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-bold"
          >
            <ShieldCheck class="w-4 h-4" />
            حساب مفعل
          </div>
          
          <div v-if="accountStore.profile?.createdAt" class="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border text-text-secondary rounded-full text-xs font-medium">
            <Calendar class="w-4 h-4" />
            عضو منذ {{ formatDate(accountStore.profile.createdAt) }}
          </div>
        </div>
      </div>
      
      <!-- Desktop Change Button -->
      <div class="hidden md:block relative z-10 mt-2">
        <button 
          @click="isUploaderOpen = true"
          class="px-5 py-2.5 bg-surface border border-border hover:bg-background text-text-primary rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Camera class="w-4 h-4" />
          تغيير الصورة
        </button>
      </div>
    </div>
    
    <AvatarUploader 
      :is-open="isUploaderOpen" 
      @close="isUploaderOpen = false" 
    />
  </div>
</template>
