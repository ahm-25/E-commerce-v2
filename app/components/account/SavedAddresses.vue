<script setup lang="ts">
import { onMounted } from 'vue'
import { useAddressesStore } from '~/stores/addresses'
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, Map } from 'lucide-vue-next'

const addressesStore = useAddressesStore()

onMounted(() => {
  if (addressesStore.addresses.length === 0) {
    addressesStore.fetchAddresses()
  }
})

const getAddressIcon = (label: string) => {
  if (label.includes('المنزل')) return Home
  if (label.includes('العمل')) return Briefcase
  return Map
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
    <div class="p-6 border-b border-border flex flex-wrap gap-4 items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-xl">
          <MapPin class="w-5 h-5 text-primary" />
        </div>
        <h3 class="text-xl font-bold text-text-primary">العناوين المحفوظة</h3>
      </div>
      <NuxtLink to="/account/addresses" class="text-sm font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-primary/5 border border-primary/20">
        <Plus class="w-4 h-4" />
        إضافة عنوان
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="addressesStore.isLoading" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 2" :key="`skel-addr-${i}`" class="h-32 bg-border rounded-xl animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="addressesStore.addresses.length === 0" class="p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
        <MapPin class="w-8 h-8 text-text-secondary opacity-50" />
      </div>
      <h4 class="text-base font-bold text-text-primary mb-2">لا توجد عناوين محفوظة</h4>
      <p class="text-sm text-text-secondary mb-4 max-w-sm">أضف عناوينك لتسريع عملية الدفع في المرات القادمة.</p>
    </div>

    <!-- Addresses List -->
    <div v-else class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="address in addressesStore.addresses.slice(0, 2)" 
        :key="address.id"
        class="border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all duration-200 flex flex-col relative"
        :class="{ 'ring-2 ring-primary bg-primary/5': address.isDefault }"
      >
        <span v-if="address.isDefault" class="absolute top-4 left-4 text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full">الافتراضي</span>
        
        <div class="flex items-center gap-2 mb-3 text-primary">
          <component :is="getAddressIcon(address.label)" class="w-5 h-5" />
          <h4 class="font-bold text-text-primary">{{ address.label }}</h4>
        </div>
        
        <div class="text-sm text-text-secondary space-y-1 mb-4 flex-grow">
          <p class="font-medium text-text-primary">{{ address.recipientName }}</p>
          <p>{{ address.addressLine }}</p>
          <p>{{ address.city }}، {{ address.governorate }}</p>
          <p class="mt-2" dir="ltr" style="text-align: right;">{{ address.phone }}</p>
        </div>
        
        <div class="flex items-center justify-between pt-3 border-t border-border/50">
          <div class="flex gap-2">
            <NuxtLink to="/account/addresses" class="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="تعديل">
              <Edit class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink to="/account/addresses" class="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="حذف">
              <Trash2 class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
