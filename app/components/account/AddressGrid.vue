<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { Address } from '~/types'
import AddressCard from './AddressCard.vue'

const props = defineProps<{
  addresses: Address[]
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', address: Address): void
  (e: 'delete', id: string): void
  (e: 'setDefault', id: string): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    <!-- Existing Addresses -->
    <AddressCard 
      v-for="address in addresses" 
      :key="address.id"
      :address="address"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
      @set-default="emit('setDefault', $event)"
    />

    <!-- Add New Address Card -->
    <button 
      @click="emit('add')"
      class="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 min-h-[280px] group"
    >
      <div class="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
        <Plus class="w-8 h-8 text-text-secondary group-hover:text-white transition-colors" />
      </div>
      <h4 class="text-lg font-bold text-text-primary mb-2">إضافة عنوان جديد</h4>
      <p class="text-sm text-text-secondary max-w-[200px] mb-4">
        أضف عنوانًا جديدًا لاستخدامه في طلباتك القادمة.
      </p>
      <span class="inline-flex items-center justify-center px-4 py-2 bg-surface border border-border text-text-primary text-sm font-semibold rounded-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
        <Plus class="w-4 h-4 ml-1.5" />
        إضافة عنوان
      </span>
    </button>
  </div>
</template>
