<script setup lang="ts">
import { useAccountStore } from '~/stores/account'
import { Mail, Phone, Calendar, Lock, CheckCircle, AlertCircle } from 'lucide-vue-next'

const accountStore = useAccountStore()

const formatDate = (dateString?: string) => {
  if (!dateString) return 'غير متوفر'
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
    <div class="p-6 border-b border-border">
      <h3 class="text-xl font-bold text-text-primary">معلومات الحساب</h3>
    </div>
    
    <div v-if="accountStore.profile" class="p-6 space-y-6">
      
      <!-- Email Status -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center text-text-secondary gap-2 text-sm font-semibold">
          <Mail class="w-4 h-4" />
          البريد الإلكتروني
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-text-primary font-medium" dir="ltr">{{ accountStore.profile.email }}</span>
          
          <div 
            v-if="accountStore.profile.emailVerified" 
            class="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            تم التحقق
          </div>
          <div 
            v-else 
            class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
          >
            <AlertCircle class="w-3.5 h-3.5" />
            لم يتم التحقق
          </div>
        </div>
      </div>
      
      <div class="h-px bg-border"></div>
      
      <!-- Phone Status -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center text-text-secondary gap-2 text-sm font-semibold">
          <Phone class="w-4 h-4" />
          رقم الهاتف
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span v-if="accountStore.profile.phone" class="text-text-primary font-medium" dir="ltr">{{ accountStore.profile.phone }}</span>
          <span v-else class="text-text-secondary italic text-sm">لم يتم الإضافة</span>
          
          <template v-if="accountStore.profile.phone">
            <div 
              v-if="accountStore.profile.phoneVerified" 
              class="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
            >
              <CheckCircle class="w-3.5 h-3.5" />
              تم التحقق
            </div>
            <div 
              v-else 
              class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
            >
              <AlertCircle class="w-3.5 h-3.5" />
              لم يتم التحقق
            </div>
          </template>
        </div>
      </div>
      
      <div class="h-px bg-border"></div>
      
      <!-- Account Created -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center text-text-secondary gap-2 text-sm font-semibold">
          <Calendar class="w-4 h-4" />
          تاريخ إنشاء الحساب
        </div>
        <div class="text-text-primary font-medium">
          {{ formatDate(accountStore.profile.createdAt) }}
        </div>
      </div>
      
    </div>
    
    <!-- Loading State -->
    <div v-else class="p-6 space-y-6 animate-pulse">
      <div class="space-y-3">
        <div class="h-4 w-24 bg-border rounded"></div>
        <div class="h-5 w-48 bg-border rounded"></div>
      </div>
      <div class="h-px bg-border"></div>
      <div class="space-y-3">
        <div class="h-4 w-24 bg-border rounded"></div>
        <div class="h-5 w-32 bg-border rounded"></div>
      </div>
    </div>
    
    <div class="p-6 bg-background/50 border-t border-border">
      <NuxtLink 
        to="/account/security" 
        class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-surface border border-border hover:bg-border/50 hover:text-primary transition-all rounded-xl text-text-primary font-bold text-sm shadow-sm"
      >
        <Lock class="w-4 h-4" />
        تغيير كلمة المرور
      </NuxtLink>
    </div>
  </div>
</template>
