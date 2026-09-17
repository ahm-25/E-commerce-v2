<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { useOrdersStore } from '~/stores/orders'
import { 
  ChevronLeft, 
  Search, 
  Package, 
  CheckCircle2, 
  XCircle, 
  ListFilter,
  Loader2,
  ShoppingBag
} from 'lucide-vue-next'
import AccountSidebar from '~/components/account/AccountSidebar.vue'
import OrderListCard from '~/components/orders/OrderListCard.vue'

const router = useRouter()
const route = useRoute()
const accountStore = useAccountStore()
const ordersStore = useOrdersStore()

// Sync URL to Store
const syncUrlToStore = () => {
  if (route.query.search) ordersStore.search = route.query.search as string
  if (route.query.status) ordersStore.filters.status = route.query.status as any
  if (route.query.sort) ordersStore.sort = route.query.sort as string
}

// Sync Store to URL
watch([() => ordersStore.search, () => ordersStore.filters.status, () => ordersStore.sort], () => {
  router.replace({
    query: {
      ...route.query,
      search: ordersStore.search || undefined,
      status: ordersStore.filters.status !== 'all' ? ordersStore.filters.status : undefined,
      sort: ordersStore.sort !== 'newest' ? ordersStore.sort : undefined
    }
  })
  
  // Refetch when filters change
  ordersStore.fetchOrders(true)
}, { deep: true })

onMounted(async () => {
  if (!accountStore.isLoggedIn) {
    router.push('/auth/login')
    return
  }
  
  syncUrlToStore()
  await Promise.all([
    ordersStore.fetchOrderSummary(),
    ordersStore.fetchOrders(true)
  ])
})

watch(() => accountStore.isLoggedIn, (newVal) => {
  if (!newVal) {
    router.push('/auth/login')
  }
})

const handleReorder = async (id: string) => {
  await ordersStore.reorder(id)
  // In a real app, show toast notification here
}

const handleCancel = async (id: string) => {
  if (confirm('هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟')) {
    await ordersStore.cancelOrder(id)
  }
}

useHead({
  title: 'طلباتي | Nexora',
  meta: [
    { name: 'description', content: 'تابع طلباتك السابقة والحالية واعرف آخر تحديثاتها.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Account Hero Banner -->
    <div class="bg-surface border-b border-border relative overflow-hidden">
      <!-- Minimal background pattern/overlay -->
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
            تابع طلباتك السابقة والحالية واعرف آخر تحديثاتها. 
            <span v-if="ordersStore.summary.total > 0" class="text-primary font-semibold">لديك {{ ordersStore.summary.total }} طلب</span>
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
          </div>
        </div>

        <!-- Orders Content -->
        <div class="w-full lg:col-span-3 xl:col-span-4 flex flex-col gap-8 min-w-0">
          
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Package class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-secondary font-medium">إجمالي الطلبات</p>
                <p class="text-2xl font-bold text-text-primary mt-1">{{ ordersStore.summary.total }}</p>
              </div>
            </div>
            
            <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-3">
              <div class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Loader2 class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-secondary font-medium">قيد التنفيذ</p>
                <p class="text-2xl font-bold text-text-primary mt-1">{{ ordersStore.summary.processing }}</p>
              </div>
            </div>

            <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-secondary font-medium">مكتملة</p>
                <p class="text-2xl font-bold text-text-primary mt-1">{{ ordersStore.summary.delivered }}</p>
              </div>
            </div>

            <div class="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-3">
              <div class="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                <XCircle class="w-5 h-5" />
              </div>
              <div>
                <p class="text-sm text-text-secondary font-medium">ملغاة</p>
                <p class="text-2xl font-bold text-text-primary mt-1">{{ ordersStore.summary.cancelled }}</p>
              </div>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="bg-surface p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            
            <div class="relative w-full md:w-96">
              <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input 
                v-model="ordersStore.search"
                type="text" 
                placeholder="ابحث برقم الطلب أو اسم المنتج..." 
                class="w-full pr-10 pl-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="relative flex-1 md:w-48">
                <ListFilter class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <select 
                  v-model="ordersStore.filters.status"
                  class="w-full appearance-none pr-9 pl-8 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                  <option value="all">كل الحالات</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="processing">قيد التجهيز</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
                <ChevronLeft class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none -rotate-90" />
              </div>

              <div class="relative flex-1 md:w-48">
                <select 
                  v-model="ordersStore.sort"
                  class="w-full appearance-none px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                  <option value="newest">الأحدث أولاً</option>
                  <option value="oldest">الأقدم أولاً</option>
                  <option value="highest_price">الأعلى سعراً</option>
                  <option value="lowest_price">الأقل سعراً</option>
                </select>
                <ChevronLeft class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none -rotate-90" />
              </div>
            </div>

          </div>

          <!-- Error State -->
          <div v-if="ordersStore.error" class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center">
              <XCircle class="w-8 h-8" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-2">تعذر تحميل طلباتك</h3>
              <p class="text-red-500/80">{{ ordersStore.error }}</p>
            </div>
            <button 
              @click="ordersStore.retryFetch"
              class="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors mt-2"
            >
              إعادة المحاولة
            </button>
          </div>

          <!-- Loading State (Initial) -->
          <div v-else-if="ordersStore.isLoading" class="flex flex-col gap-6">
            <div v-for="i in 3" :key="i" class="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row gap-6 animate-pulse">
              <div class="flex-1 flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  <div class="h-6 w-32 bg-border rounded"></div>
                  <div class="h-6 w-20 bg-border rounded-full"></div>
                </div>
                <div class="h-4 w-48 bg-border rounded"></div>
              </div>
              <div class="flex gap-2">
                <div class="w-14 h-14 bg-border rounded-xl"></div>
                <div class="w-14 h-14 bg-border rounded-xl"></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="ordersStore.orders.length === 0" class="bg-surface border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-5">
            <div class="w-24 h-24 bg-background border-2 border-border rounded-full flex items-center justify-center text-text-secondary/50">
              <ShoppingBag class="w-10 h-10" />
            </div>
            <div class="max-w-md">
              <h3 class="text-xl font-bold text-text-primary mb-2">لا توجد طلبات هنا</h3>
              <p class="text-text-secondary leading-relaxed">
                لم نتمكن من العثور على أي طلبات تطابق بحثك. تأكد من الكلمات المفتاحية أو جرب تغيير الفلاتر.
              </p>
            </div>
            <button 
              v-if="ordersStore.search || ordersStore.filters.status !== 'all'"
              @click="() => { ordersStore.search = ''; ordersStore.filters.status = 'all' }"
              class="px-6 py-2.5 bg-background border border-border text-text-primary rounded-xl font-semibold hover:bg-surface hover:text-primary transition-colors"
            >
              مسح الفلاتر
            </button>
            <NuxtLink 
              v-else
              to="/products"
              class="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
            >
              ابدأ التسوق
            </NuxtLink>
          </div>

          <!-- Orders List -->
          <div v-else class="flex flex-col gap-6">
            <OrderListCard 
              v-for="order in ordersStore.orders" 
              :key="order.id" 
              :order="order"
              @reorder="handleReorder"
              @cancel="handleCancel"
            />

            <!-- Load More -->
            <div v-if="ordersStore.orders.length < ordersStore.total" class="flex justify-center mt-4">
              <button 
                @click="ordersStore.loadMore"
                :disabled="ordersStore.isLoadingMore"
                class="px-8 py-3 bg-surface border border-border text-text-primary rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Loader2 v-if="ordersStore.isLoadingMore" class="w-5 h-5 animate-spin" />
                <span v-else>تحميل المزيد</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
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
