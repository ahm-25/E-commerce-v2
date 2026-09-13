<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { useCheckout } from '~/composables/useCheckout'
import { MapPin } from 'lucide-vue-next'

const store = useCheckoutStore()
const { governorates, cities, isLoadingGovernorates, isLoadingCities } = useCheckout()
</script>

<template>
  <section class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm mt-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <MapPin class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">عنوان الشحن</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Governorate -->
      <div class="space-y-2">
        <label for="governorate" class="block text-sm font-bold text-gray-700">المحافظة <span class="text-rose-500">*</span></label>
        <div class="relative">
          <select 
            id="governorate" 
            v-model="store.shippingAddress.governorate"
            class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent appearance-none disabled:opacity-50"
            :class="store.validationErrors.governorate ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
            :disabled="isLoadingGovernorates"
          >
            <option value="" disabled selected>اختر المحافظة</option>
            <option v-for="gov in governorates" :key="gov" :value="gov">{{ gov }}</option>
          </select>
          <div class="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-text-secondary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          <div v-if="isLoadingGovernorates" class="absolute inset-y-0 right-0 flex items-center px-4">
             <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p v-if="store.validationErrors.governorate" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.governorate }}</p>
      </div>

      <!-- City -->
      <div class="space-y-2">
        <label for="city" class="block text-sm font-bold text-gray-700">المدينة <span class="text-rose-500">*</span></label>
        <div class="relative">
          <select 
            id="city" 
            v-model="store.shippingAddress.city"
            class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent appearance-none disabled:opacity-50"
            :class="store.validationErrors.city ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
            :disabled="!store.shippingAddress.governorate || isLoadingCities"
          >
            <option value="" disabled selected>اختر المدينة</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          <div class="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none text-text-secondary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          <div v-if="isLoadingCities" class="absolute inset-y-0 right-0 flex items-center px-4">
             <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p v-if="store.validationErrors.city" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.city }}</p>
      </div>

      <!-- Region -->
      <div class="space-y-2">
        <label for="region" class="block text-sm font-bold text-gray-700">المنطقة <span class="text-rose-500">*</span></label>
        <input 
          id="region"
          type="text" 
          v-model="store.shippingAddress.region"
          placeholder="شارع الجمهورية"
          class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent"
          :class="store.validationErrors.region ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
        >
        <p v-if="store.validationErrors.region" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.region }}</p>
      </div>

      <!-- Building Number -->
      <div class="space-y-2">
        <label for="building" class="block text-sm font-bold text-gray-700">رقم المبنى / العمارة <span class="text-rose-500">*</span></label>
        <input 
          id="building"
          type="text" 
          v-model="store.shippingAddress.buildingNumber"
          placeholder="مثال: 12"
          class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent"
          :class="store.validationErrors.buildingNumber ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
        >
        <p v-if="store.validationErrors.buildingNumber" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.buildingNumber }}</p>
      </div>

      <!-- Detailed Address -->
      <div class="space-y-2 md:col-span-2">
        <label for="addressDetails" class="block text-sm font-bold text-gray-700">العنوان بالتفصيل <span class="text-rose-500">*</span></label>
        <textarea 
          id="addressDetails"
          v-model="store.shippingAddress.addressDetails"
          placeholder="تفاصيل العنوان (اسم الشارع، أقرب معلم...)"
          rows="2"
          class="w-full px-4 py-3.5 bg-background border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-transparent resize-none"
          :class="store.validationErrors.addressDetails ? 'border-rose-500 ring-rose-100 focus:ring-rose-500/20' : 'border-border focus:ring-primary/20 focus:border-primary'"
        ></textarea>
        <p v-if="store.validationErrors.addressDetails" class="text-xs font-bold text-rose-500 mt-1">{{ store.validationErrors.addressDetails }}</p>
      </div>
      
      <!-- Floor / Apt (Optional) -->
      <div class="space-y-2">
        <label for="floorApt" class="block text-sm font-bold text-gray-700">الدور / الشقة <span class="text-text-secondary/60 text-xs font-normal">(اختياري)</span></label>
        <input 
          id="floorApt"
          type="text" 
          v-model="store.shippingAddress.floorApt"
          placeholder="مثال: الدور الثالث - شقة 5"
          class="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20"
        >
      </div>

      <!-- Landmark (Optional) -->
      <div class="space-y-2">
        <label for="landmark" class="block text-sm font-bold text-gray-700">علامة مميزة <span class="text-text-secondary/60 text-xs font-normal">(اختياري)</span></label>
        <input 
          id="landmark"
          type="text" 
          v-model="store.shippingAddress.landmark"
          placeholder="بجوار كذا..."
          class="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20"
        >
      </div>
    </div>
  </section>
</template>
