<script setup lang="ts">
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
  contact: {
    phone?: string
    email?: string
    address?: string
  }
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 font-arabic">
    <!-- Phone -->
    <a 
      v-if="contact.phone" 
      :href="`tel:${contact.phone.replace(/[^0-9+]/g, '')}`"
      class="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 transition-colors">
        <Phone class="w-5 h-5" stroke-width="2" />
      </div>
      <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">رقم الهاتف</h3>
      <p class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" dir="ltr">
        {{ contact.phone }}
      </p>
    </a>

    <!-- Email -->
    <a 
      v-if="contact.email" 
      :href="`mailto:${contact.email}`"
      class="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div class="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4 transition-colors">
        <Mail class="w-5 h-5" stroke-width="2" />
      </div>
      <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">البريد الإلكتروني</h3>
      <p class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
        {{ contact.email }}
      </p>
    </a>

    <!-- Address -->
    <div 
      v-if="contact.address" 
      class="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm sm:col-span-2 transition-all duration-300"
    >
      <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 transition-colors">
        <MapPin class="w-5 h-5" stroke-width="2" />
      </div>
      <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">العنوان</h3>
      <p class="text-lg font-bold text-gray-900 dark:text-white transition-colors">
        {{ contact.address }}
      </p>
    </div>

    <!-- WhatsApp CTA -->
    <a 
      v-if="contact.phone"
      :href="`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center gap-3 p-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-2 mt-2"
    >
      <MessageCircle class="w-6 h-6" />
      <span class="text-lg font-bold">تواصل معنا عبر واتساب</span>
    </a>
  </div>
</template>
