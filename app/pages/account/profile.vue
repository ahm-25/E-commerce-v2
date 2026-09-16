<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { ChevronLeft } from 'lucide-vue-next'
import AccountSidebar from '~/components/account/AccountSidebar.vue'
import ProfileSummary from '~/components/account/ProfileSummary.vue'
import ProfileForm from '~/components/account/ProfileForm.vue'
import AccountInfoCard from '~/components/account/AccountInfoCard.vue'

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
  title: 'البيانات الشخصية | حسابي | Nexora',
  meta: [
    { name: 'description', content: 'حدّث بياناتك الشخصية وتأكد من أن معلومات حسابك محدثة في متجر Nexora.' }
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
          <span class="text-text-primary font-medium">البيانات الشخصية</span>
        </nav>
        
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">البيانات الشخصية</h1>
          <p class="text-lg text-text-secondary">
            حدّث بياناتك الشخصية وتأكد من أن معلومات حسابك محدثة.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-start">
        
        <!-- Sidebar (Right side due to RTL) -->
        <div class="hidden lg:block lg:col-span-1">
          <div class="sticky top-[120px]">
            <AccountSidebar />
          </div>
        </div>

        <!-- Mobile Horizontal Nav (Visible only on mobile/tablet) -->
        <div class="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
          <div class="flex gap-2 w-max">
            <!-- Mobile Navigation Pills -->
            <NuxtLink to="/account" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">لوحة التحكم</NuxtLink>
            <NuxtLink to="/account/orders" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">طلباتي</NuxtLink>
            <NuxtLink to="/account/wishlist" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">المفضلة</NuxtLink>
            <NuxtLink to="/account/addresses" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">العناوين</NuxtLink>
            <!-- Active Pill -->
            <NuxtLink to="/account/profile" class="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-sm whitespace-nowrap">البيانات الشخصية</NuxtLink>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div class="w-full lg:col-span-3 xl:col-span-4 min-w-0">
          
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <!-- Content Column -->
            <div class="xl:col-span-2 flex flex-col gap-8">
              <ProfileSummary />
              <ProfileForm />
            </div>
            
            <!-- Sidebar Info Column -->
            <div class="flex flex-col gap-8">
              <AccountInfoCard />
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
