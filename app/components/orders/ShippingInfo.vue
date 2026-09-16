<script setup lang="ts">
import { MapPin, Truck, ExternalLink } from 'lucide-vue-next'
import type { OrderShippingAddress, TrackingInfo, OrderCustomer } from '~/types/order'

const props = defineProps<{
  shippingAddress: OrderShippingAddress
  customer: OrderCustomer
  tracking?: TrackingInfo
}>()
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden h-full flex flex-col">
    <div class="p-6 flex-1 flex flex-col gap-6 md:flex-row md:divide-x-reverse md:divide-x md:divide-border">
      
      <!-- Address Info -->
      <div class="flex-1 space-y-4">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <MapPin class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-bold text-text-primary">معلومات الشحن</h3>
        </div>
        
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-sm text-text-secondary shrink-0">الاسم</span>
            <span class="font-medium text-text-primary text-left">{{ customer.name }}</span>
          </div>
          
          <div class="flex justify-between items-start">
            <span class="text-sm text-text-secondary shrink-0">رقم الهاتف</span>
            <span class="font-medium text-text-primary text-left" dir="ltr">{{ customer.phone }}</span>
          </div>
          
          <div class="flex justify-between items-start">
            <span class="text-sm text-text-secondary shrink-0">المحافظة</span>
            <span class="font-medium text-text-primary text-left">{{ shippingAddress.governorate }}</span>
          </div>
          
          <div class="flex justify-between items-start">
            <span class="text-sm text-text-secondary shrink-0">المدينة</span>
            <span class="font-medium text-text-primary text-left">{{ shippingAddress.city }}</span>
          </div>
          
          <div class="flex flex-col gap-1 pt-1">
            <span class="text-sm text-text-secondary">العنوان</span>
            <span class="font-medium text-text-primary leading-relaxed">{{ shippingAddress.region }}، {{ shippingAddress.addressDetails }}</span>
          </div>
        </div>
      </div>

      <!-- Tracking Info (if exists) -->
      <div v-if="tracking" class="flex-1 md:pr-6 pt-6 md:pt-0 border-t border-border md:border-t-0 space-y-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Truck class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-text-primary">معلومات التوصيل</h3>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between items-start">
              <span class="text-sm text-text-secondary shrink-0">شركة الشحن</span>
              <span class="font-medium text-text-primary text-left">{{ tracking.carrier }}</span>
            </div>
            
            <div class="flex justify-between items-start">
              <span class="text-sm text-text-secondary shrink-0">رقم التتبع</span>
              <span class="font-medium text-text-primary text-left" dir="ltr">{{ tracking.trackingNumber }}</span>
            </div>
          </div>
        </div>

        <a 
          v-if="tracking.url"
          :href="tracking.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary/5 text-primary hover:bg-primary/10 rounded-xl font-bold transition-colors text-sm"
        >
          <ExternalLink class="w-4 h-4" />
          تتبع الشحنة
        </a>
      </div>

    </div>
  </div>
</template>
