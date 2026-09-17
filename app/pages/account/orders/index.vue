<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { ChevronLeft, ShoppingBag, PackageSearch } from 'lucide-vue-next'
import type { OrderStatus } from '~/types/order'
import AccountSidebar from '~/components/account/AccountSidebar.vue'

const router = useRouter()
const accountStore = useAccountStore()

// Initialize data and check auth
onMounted(() => {
  if (!accountStore.isLoggedIn) {
    router.push('/auth/login')
    return
  }
  
  if (!accountStore.profile) {
    accountStore.fetchDashboardData()
  }
})

// Watch auth state
watch(() => accountStore.isLoggedIn, (newVal) => {
  if (!newVal) {
    router.push('/auth/login')
  }
})

useHead({
  title: 'طلباتي | Nexora',
  meta: [
    { name: 'description', content: 'سجل الطلبات الخاصة بك في متجر Nexora' }
  ]
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })
    .format(amount)
    .replace('EGP', 'ج.م')
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('ar-EG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date(dateString))
}

const getStatusConfig = (status: OrderStatus) => {
  const configs: Record<OrderStatus, { label: string, classes: string }> = {
    pending: { label: 'قيد المراجعة', classes: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
    confirmed: { label: 'تم التأكيد', classes: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
    processing: { label: 'قيد التجهيز', classes: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' },
    shipped: { label: 'تم الشحن', classes: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' },
    delivered: { label: 'تم التوصيل', classes: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
    cancelled: { label: 'ملغي', classes: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' }
  }
  return configs[status] || configs.pending
}
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Account Hero Banner -->
    <div class="bg-surface border-b border-border relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 dark:opacity-10 mix-blend-luminosity"></div>
      
      <div class="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-16">
        <!-- Breadcrumb -->
        <nav class="flex items-center text-sm mb-6 text-text-secondary">
          <NuxtLink to="/" class="hover:text-primary transition-colors">الرئيسية</NuxtLink>
          <ChevronLeft class="w-4 h-4 mx-2" />
          <NuxtLink to="/account" class="hover:text-primary transition-colors">حسابي</NuxtLink>
          <ChevronLeft class="w-4 h-4 mx-2" />
          <span class="text-text-primary font-medium">طلباتي</span>
        </nav>
        
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">طلباتي</h1>
          <p class="text-lg text-text-secondary">
            تابع حالة طلباتك الحالية وتصفح سجل مشترياتك السابقة.
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
            <AccountSidebar />
          </div>
        </div>

        <!-- Mobile Horizontal Nav -->
        <div class="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
          <div class="flex gap-2 w-max">
            <NuxtLink to="/account" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">لوحة التحكم</NuxtLink>
            <NuxtLink to="/account/orders" class="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-sm whitespace-nowrap">طلباتي</NuxtLink>
            <NuxtLink to="/account/wishlist" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">المفضلة</NuxtLink>
            <NuxtLink to="/account/addresses" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">العناوين</NuxtLink>
            <NuxtLink to="/account/profile" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">البيانات الشخصية</NuxtLink>
            <NuxtLink to="/account/settings" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">الإعدادات</NuxtLink>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div class="w-full lg:col-span-3 xl:col-span-4 min-w-0">
          
          <div class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
            <div class="p-6 border-b border-border flex flex-wrap gap-4 items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary/10 rounded-xl">
                  <ShoppingBag class="w-5 h-5 text-primary" />
                </div>
                <h2 class="text-xl font-bold text-text-primary">جميع الطلبات</h2>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="accountStore.isLoading" class="p-6 space-y-4">
              <div v-for="i in 5" :key="`skel-ord-${i}`" class="h-20 bg-border rounded-xl animate-pulse"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="accountStore.recentOrders.length === 0" class="p-16 flex flex-col items-center justify-center text-center">
              <div class="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-6">
                <PackageSearch class="w-12 h-12 text-text-secondary opacity-50" />
              </div>
              <h3 class="text-xl font-bold text-text-primary mb-3">لا توجد طلبات حتى الآن</h3>
              <p class="text-text-secondary mb-8 max-w-sm text-lg">يبدو أنك لم تقم بأي طلبات بعد. تصفح منتجاتنا واكتشف العروض المميزة المتوفرة حالياً.</p>
              <NuxtLink to="/products" class="btn btn-primary px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 hover:shadow-lg">
                ابدأ التسوق
              </NuxtLink>
            </div>

            <!-- Orders List -->
            <div v-else class="p-0">
              <!-- Desktop Table View -->
              <div class="hidden md:block w-full overflow-x-auto">
                <table class="w-full text-right">
                  <thead class="bg-background/50 text-text-secondary text-sm">
                    <tr>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">رقم الطلب</th>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">التاريخ</th>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">المنتجات</th>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">المبلغ الإجمالي</th>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">الحالة</th>
                      <th class="px-6 py-4 font-semibold whitespace-nowrap">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border">
                    <tr v-for="order in accountStore.recentOrders" :key="order.id" class="hover:bg-background/50 transition-colors">
                      <td class="px-6 py-4">
                        <span class="font-bold text-text-primary">{{ order.orderNumber }}</span>
                      </td>
                      <td class="px-6 py-4 text-text-secondary text-sm">
                        {{ formatDate(order.createdAt) }}
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex -space-x-2 rtl:space-x-reverse">
                          <div v-for="(item, idx) in order.items.slice(0, 3)" :key="item.id" class="w-10 h-10 rounded-lg border-2 border-surface overflow-hidden bg-background">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                          </div>
                          <div v-if="order.items.length > 3" class="w-10 h-10 rounded-lg border-2 border-surface bg-background flex items-center justify-center text-xs font-bold text-text-secondary">
                            +{{ order.items.length - 3 }}
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span class="font-bold text-text-primary">{{ formatCurrency(order.total) }}</span>
                      </td>
                      <td class="px-6 py-4">
                        <span :class="['px-3 py-1 text-xs font-semibold rounded-full', getStatusConfig(order.status).classes]">
                          {{ getStatusConfig(order.status).label }}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <NuxtLink :to="`/account/orders/${order.id}`" class="px-4 py-2 border border-border rounded-lg text-sm font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors inline-block">
                          تفاصيل الطلب
                        </NuxtLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Mobile Cards View -->
              <div class="md:hidden divide-y divide-border">
                <div v-for="order in accountStore.recentOrders" :key="order.id" class="p-4 space-y-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-bold text-text-primary mb-1">{{ order.orderNumber }}</div>
                      <div class="text-sm text-text-secondary">{{ formatDate(order.createdAt) }}</div>
                    </div>
                    <span :class="['px-3 py-1 text-xs font-semibold rounded-full', getStatusConfig(order.status).classes]">
                      {{ getStatusConfig(order.status).label }}
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                      <img v-if="order.items.length > 0" :src="order.items[0].image" :alt="order.items[0].name" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                      <div class="text-sm font-semibold text-text-primary line-clamp-1 mb-1">{{ order.items[0]?.name }}</div>
                      <div class="text-sm text-text-secondary" v-if="order.items.length > 1">+ {{ order.items.length - 1 }} منتج آخر</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between pt-2">
                    <div class="font-bold text-text-primary">{{ formatCurrency(order.total) }}</div>
                    <NuxtLink :to="`/account/orders/${order.id}`" class="px-4 py-2 border border-border rounded-lg text-sm font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors">
                      تفاصيل
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility to hide scrollbar for mobile horizontal scroll */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
