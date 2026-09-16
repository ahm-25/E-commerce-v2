<script setup lang="ts">
import { useAccountStore } from '~/stores/account'
import { User, Mail, Phone, ShieldCheck, PenLine } from 'lucide-vue-next'

const accountStore = useAccountStore()
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
    <div class="p-6 border-b border-border flex flex-wrap gap-4 items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-xl">
          <User class="w-5 h-5 text-primary" />
        </div>
        <h3 class="text-xl font-bold text-text-primary">معلومات الحساب</h3>
      </div>
      <NuxtLink to="/account/profile" class="text-sm font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-primary/5">
        <PenLine class="w-4 h-4" />
        تعديل البيانات
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="accountStore.isLoading" class="p-6 animate-pulse space-y-4">
      <div class="h-10 bg-border rounded-lg"></div>
      <div class="h-10 bg-border rounded-lg"></div>
      <div class="h-10 bg-border rounded-lg"></div>
    </div>

    <!-- Data State -->
    <div v-else-if="accountStore.profile" class="p-6">
      <div class="space-y-6">
        <!-- Info Item -->
        <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/50 gap-2">
          <div class="flex items-center gap-2 text-text-secondary sm:w-1/3">
            <User class="w-4 h-4" />
            <span class="text-sm">الاسم الكامل</span>
          </div>
          <div class="font-semibold text-text-primary flex-grow">
            {{ accountStore.profile.name }}
          </div>
        </div>
        
        <!-- Info Item -->
        <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/50 gap-2">
          <div class="flex items-center gap-2 text-text-secondary sm:w-1/3">
            <Mail class="w-4 h-4" />
            <span class="text-sm">البريد الإلكتروني</span>
          </div>
          <div class="font-semibold text-text-primary flex-grow" dir="ltr" style="text-align: right;">
            {{ accountStore.profile.email }}
          </div>
        </div>
        
        <!-- Info Item -->
        <div class="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/50 gap-2">
          <div class="flex items-center gap-2 text-text-secondary sm:w-1/3">
            <Phone class="w-4 h-4" />
            <span class="text-sm">رقم الهاتف</span>
          </div>
          <div class="font-semibold text-text-primary flex-grow" dir="ltr" style="text-align: right;">
            {{ accountStore.profile.phone }}
          </div>
        </div>

        <!-- Info Item -->
        <div class="flex flex-col sm:flex-row sm:items-center py-3 gap-2">
          <div class="flex items-center gap-2 text-text-secondary sm:w-1/3">
            <ShieldCheck class="w-4 h-4" />
            <span class="text-sm">حالة الحساب</span>
          </div>
          <div class="flex-grow">
            <span v-if="accountStore.profile.status === 'active'" class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">
              نشط
            </span>
            <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-xs font-bold">
              غير نشط
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
