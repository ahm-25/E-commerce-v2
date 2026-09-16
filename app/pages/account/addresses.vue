<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { useAddressesStore } from '~/stores/addresses'
import type { AddressFormData, Address } from '~/types'
import { ChevronLeft, MapPin } from 'lucide-vue-next'

import AccountSidebar from '~/components/account/AccountSidebar.vue'
import AddressGrid from '~/components/account/AddressGrid.vue'
import AddressModal from '~/components/account/AddressModal.vue'
import DeleteAddressDialog from '~/components/account/DeleteAddressDialog.vue'

const router = useRouter()
const accountStore = useAccountStore()
const addressesStore = useAddressesStore()

// State
const isModalOpen = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const selectedAddress = ref<Address | null>(null)

const isDeleteDialogOpen = ref(false)
const addressToDelete = ref<string | null>(null)

// Auth Check & Fetch
onMounted(async () => {
  if (!accountStore.isLoggedIn) {
    router.push('/auth/login')
    return
  }
  
  await addressesStore.fetchAddresses()
})

// Handlers
const openAddModal = () => {
  modalMode.value = 'add'
  selectedAddress.value = null
  isModalOpen.value = true
}

const openEditModal = (address: Address) => {
  modalMode.value = 'edit'
  selectedAddress.value = address
  isModalOpen.value = true
}

const confirmDelete = (id: string) => {
  addressToDelete.value = id
  isDeleteDialogOpen.value = true
}

const handleModalSubmit = async (formData: AddressFormData) => {
  try {
    if (modalMode.value === 'add') {
      await addressesStore.addAddress(formData)
    } else if (modalMode.value === 'edit' && selectedAddress.value) {
      await addressesStore.updateAddress(selectedAddress.value.id, formData)
    }
    isModalOpen.value = false
    // Here you could add a toast notification
  } catch (err) {
    console.error(err)
    // Error is handled in store and could be shown in UI if needed
  }
}

const handleDeleteConfirm = async () => {
  if (!addressToDelete.value) return
  try {
    await addressesStore.deleteAddress(addressToDelete.value)
    isDeleteDialogOpen.value = false
    addressToDelete.value = null
  } catch (err) {
    console.error(err)
  }
}

const handleSetDefault = async (id: string) => {
  try {
    await addressesStore.setDefaultAddress(id)
  } catch (err) {
    console.error(err)
  }
}

useHead({
  title: 'العناوين المحفوظة | حسابي | Nexora',
  meta: [
    { name: 'description', content: 'إدارة العناوين المحفوظة في متجر Nexora' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Hero & Breadcrumb -->
    <div class="bg-surface border-b border-border relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 dark:opacity-10 mix-blend-luminosity"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-16">
        <nav class="flex items-center text-sm mb-6 text-text-secondary">
          <NuxtLink to="/" class="hover:text-primary transition-colors">الرئيسية</NuxtLink>
          <ChevronLeft class="w-4 h-4 mx-2" />
          <NuxtLink to="/account" class="hover:text-primary transition-colors">حسابي</NuxtLink>
          <ChevronLeft class="w-4 h-4 mx-2" />
          <span class="text-text-primary font-medium">العناوين المحفوظة</span>
        </nav>
        
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">العناوين المحفوظة</h1>
          <p class="text-lg text-text-secondary">
            أدر عناوينك بسهولة واختر ما يناسبك عند إتمام الطلبات.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-start">
        
        <!-- Sidebar -->
        <div class="hidden lg:block lg:col-span-1">
          <div class="sticky top-[120px]">
            <!-- Using existing AccountSidebar -->
            <AccountSidebar />
          </div>
        </div>

        <!-- Mobile Horizontal Nav (Optional reuse from index) -->
        <div class="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
          <div class="flex gap-2 w-max">
            <NuxtLink to="/account" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">لوحة التحكم</NuxtLink>
            <NuxtLink to="/account/orders" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">طلباتي</NuxtLink>
            <NuxtLink to="/account/wishlist" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">المفضلة</NuxtLink>
            <NuxtLink to="/account/addresses" class="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-sm whitespace-nowrap">العناوين</NuxtLink>
            <NuxtLink to="/account/profile" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">البيانات الشخصية</NuxtLink>
          </div>
        </div>

        <!-- Addresses Content -->
        <div class="w-full lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
          
          <!-- Page Header inside content -->
          <div class="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary/10 rounded-xl">
                <MapPin class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
                  عناويني
                  <span v-if="!addressesStore.isLoading" class="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {{ addressesStore.addresses.length }} عناوين محفوظة
                  </span>
                </h2>
              </div>
            </div>
            
            <button 
              @click="openAddModal"
              class="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              إضافة عنوان جديد
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="addressesStore.isLoading && addressesStore.addresses.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="border border-border rounded-2xl p-5 h-64 bg-surface animate-pulse flex flex-col">
              <div class="h-6 bg-border rounded w-1/3 mb-6"></div>
              <div class="h-4 bg-border rounded w-1/2 mb-2"></div>
              <div class="h-4 bg-border rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-border rounded w-2/5 mb-6"></div>
              <div class="mt-auto flex gap-2">
                <div class="h-8 bg-border rounded w-20"></div>
                <div class="h-8 bg-border rounded w-20"></div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="addressesStore.error" class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 class="text-lg font-bold text-red-800 dark:text-red-400 mb-2">حدث خطأ أثناء تحميل العناوين</h3>
            <p class="text-red-600/80 dark:text-red-400/80 mb-6">{{ addressesStore.error }}</p>
            <button @click="addressesStore.fetchAddresses" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
              إعادة المحاولة
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="addressesStore.addresses.length === 0" class="bg-surface border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <MapPin class="w-10 h-10 text-primary opacity-80" />
            </div>
            <h3 class="text-2xl font-bold text-text-primary mb-3">لا توجد عناوين محفوظة</h3>
            <p class="text-text-secondary max-w-md mb-8">
              أضف عنوانك الأول لتسهيل إتمام طلباتك القادمة واستمتع بتجربة تسوق أسرع.
            </p>
            <button 
              @click="openAddModal"
              class="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              إضافة عنوان جديد
            </button>
          </div>

          <!-- Addresses Grid -->
          <div v-else>
            <AddressGrid 
              :addresses="addressesStore.addresses"
              @add="openAddModal"
              @edit="openEditModal"
              @delete="confirmDelete"
              @set-default="handleSetDefault"
            />
          </div>

        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddressModal 
      :is-open="isModalOpen"
      :title="modalMode === 'add' ? 'إضافة عنوان جديد' : 'تعديل العنوان'"
      :initial-data="selectedAddress"
      :is-loading="addressesStore.isLoading"
      @close="isModalOpen = false"
      @submit="handleModalSubmit"
    />

    <DeleteAddressDialog 
      :is-open="isDeleteDialogOpen"
      :is-default="addressesStore.addresses.find(a => a.id === addressToDelete)?.isDefault"
      :is-loading="addressesStore.isLoading"
      @close="isDeleteDialogOpen = false"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
