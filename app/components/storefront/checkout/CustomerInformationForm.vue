<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { User, Phone, Mail } from 'lucide-vue-next'

const store = useCheckoutStore()
</script>

<template>
  <section class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm relative overflow-hidden group">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <User class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">البيانات الشخصية</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Full Name -->
      <div class="space-y-2">
        <label for="fullName" class="block text-sm font-bold text-gray-700">الاسم بالكامل <span class="text-rose-500">*</span></label>
        <input 
          id="fullName"
          type="text" 
          v-model="store.customerInfo.fullName"
          placeholder="أحمد محمد علي"
          class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent"
          :class="store.validationErrors.fullName ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
        >
        <p v-if="store.validationErrors.fullName" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.fullName }}</p>
      </div>

      <!-- Phone -->
      <div class="space-y-2">
        <label for="phone" class="block text-sm font-bold text-gray-700">رقم الهاتف <span class="text-rose-500">*</span></label>
        <div class="relative">
          <input 
            id="phone"
            type="tel" 
            v-model="store.customerInfo.phone"
            placeholder="01012345678"
            dir="ltr"
            class="w-full pl-10 pr-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent text-right"
            :class="store.validationErrors.phone ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
          >
          <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>
        <p v-if="store.validationErrors.phone" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.phone }}</p>
      </div>

      <!-- Email -->
      <div class="space-y-2 md:col-span-2">
        <label for="email" class="block text-sm font-bold text-gray-700">البريد الإلكتروني <span class="text-text-secondary/60 text-xs font-normal">(اختياري)</span></label>
        <div class="relative">
          <input 
            id="email"
            type="email" 
            v-model="store.customerInfo.email"
            placeholder="ahmed@example.com"
            dir="ltr"
            class="w-full pl-10 pr-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent text-right"
            :class="store.validationErrors.email ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
          >
          <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>
        <p v-if="store.validationErrors.email" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.email }}</p>
      </div>
    </div>
  </section>
</template>
