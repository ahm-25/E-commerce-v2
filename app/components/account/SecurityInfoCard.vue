<script setup lang="ts">
import { useAccountStore } from '~/stores/account'
import { ShieldCheck, Mail, Phone, Key, PenLine, MonitorSmartphone, CheckCircle, AlertCircle } from 'lucide-vue-next'

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
    <div class="p-6 border-b border-border flex items-center gap-3">
      <div class="p-2 bg-primary/10 rounded-xl">
        <ShieldCheck class="w-5 h-5 text-primary" />
      </div>
      <h3 class="text-xl font-bold text-text-primary">حماية الحساب</h3>
    </div>
    
    <div v-if="accountStore.profile" class="p-6 space-y-6">
      
      <!-- Email Status -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center text-text-secondary gap-2 text-sm font-semibold">
          <Mail class="w-4 h-4" />
          حالة البريد الإلكتروني
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-text-primary font-medium text-sm" dir="ltr">{{ accountStore.profile.email }}</span>
          
          <div 
            v-if="accountStore.profile.emailVerified" 
            class="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
          >
            <CheckCircle class="w-3.5 h-3.5" />
            تم التحقق منه
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
          حالة رقم الهاتف
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span v-if="accountStore.profile.phone" class="text-text-primary font-medium text-sm" dir="ltr">{{ accountStore.profile.phone }}</span>
          <span v-else class="text-text-secondary italic text-sm">لم يتم الإضافة</span>
          
          <template v-if="accountStore.profile.phone">
            <div 
              v-if="accountStore.profile.phoneVerified" 
              class="flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-md text-xs font-bold"
            >
              <CheckCircle class="w-3.5 h-3.5" />
              تم التحقق منه
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
      
      <!-- Last Password Change -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center text-text-secondary gap-2 text-sm font-semibold">
          <Key class="w-4 h-4" />
          آخر تغيير لكلمة المرور
        </div>
        <div class="text-text-primary font-medium text-sm">
          منذ 3 أشهر ({{ formatDate('2026-06-15T10:00:00Z') }})
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
    
    <div class="p-4 bg-background/50 border-t border-border flex flex-col gap-2">
      <NuxtLink 
        to="/account/profile" 
        class="flex items-center justify-between w-full py-3 px-4 bg-surface border border-border hover:bg-border/50 hover:text-primary transition-all rounded-xl text-text-primary font-semibold text-sm shadow-sm"
      >
        <span class="flex items-center gap-2">
          <PenLine class="w-4 h-4" />
          تعديل البيانات الشخصية
        </span>
      </NuxtLink>
      <a 
        href="#sessions" 
        class="flex items-center justify-between w-full py-3 px-4 bg-surface border border-border hover:bg-border/50 hover:text-primary transition-all rounded-xl text-text-primary font-semibold text-sm shadow-sm"
      >
        <span class="flex items-center gap-2">
          <MonitorSmartphone class="w-4 h-4" />
          إدارة الأجهزة والجلسات
        </span>
      </a>
    </div>
  </div>
</template>
