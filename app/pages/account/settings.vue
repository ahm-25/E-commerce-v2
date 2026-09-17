<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { useSettingsStore } from '~/stores/settings'
import type { AccountSettings } from '~/stores/settings'
import { 
  ChevronLeft, 
  Globe, 
  DollarSign, 
  MapPin, 
  Moon, 
  Sun, 
  Monitor, 
  Accessibility,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Download,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  X,
  Package,
  Truck,
  Tag
} from 'lucide-vue-next'
import AccountSidebar from '~/components/account/AccountSidebar.vue'

const router = useRouter()
const accountStore = useAccountStore()
const settingsStore = useSettingsStore()

// Local state for the form to handle v-model and "isDirty" tracking
const localSettings = reactive<Partial<AccountSettings>>({})
const isDirty = ref(false)

// Dialog states
const isDeleteDialogOpen = ref(false)
const deleteConfirmationText = ref('')
const isDeleting = ref(false)
const deleteError = ref('')

const isDeactivateDialogOpen = ref(false)
const isDeactivating = ref(false)
const deactivateError = ref('')

// Initialize data and check auth
onMounted(async () => {
  if (!accountStore.isLoggedIn) {
    router.push('/auth/login')
    return
  }
  
  await settingsStore.fetchSettings()
  
  if (settingsStore.settings) {
    Object.assign(localSettings, settingsStore.settings)
  }
})

// Watch auth state
watch(() => accountStore.isLoggedIn, (newVal) => {
  if (!newVal) {
    router.push('/auth/login')
  }
})

// Check if form is dirty
watch(localSettings, () => {
  if (settingsStore.settings) {
    const keys = Object.keys(settingsStore.settings) as (keyof AccountSettings)[]
    isDirty.value = keys.some(key => localSettings[key] !== settingsStore.settings![key])
  }
}, { deep: true })

const handleSave = async () => {
  if (!isDirty.value) return
  
  try {
    await settingsStore.updateSettings(localSettings)
    isDirty.value = false
    // Update theme if it was changed
    if (localSettings.theme) {
      applyTheme(localSettings.theme)
    }
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

const handleCancel = () => {
  if (settingsStore.settings) {
    Object.assign(localSettings, settingsStore.settings)
  }
  isDirty.value = false
}

const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  // In a real Nuxt app with color-mode, this would use the color-mode module
  // e.g. const colorMode = useColorMode(); colorMode.preference = theme;
  // Fallback for manual class manipulation if not present
  if (import.meta.client) {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

const requestDataExport = async () => {
  // TODO: Implement actual API call
  console.log('Requesting data export...')
  // Mock success toast logic or state can go here
}

const deactivateAccount = async () => {
  isDeactivating.value = true
  deactivateError.value = ''
  try {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    isDeactivateDialogOpen.value = false
    accountStore.logout()
    router.push('/')
  } catch (err: any) {
    deactivateError.value = err.message || 'حدث خطأ أثناء تعطيل الحساب'
  } finally {
    isDeactivating.value = false
  }
}

const deleteAccount = async () => {
  if (deleteConfirmationText.value !== 'حذف') {
    deleteError.value = 'الرجاء كتابة كلمة "حذف" للتأكيد.'
    return
  }
  
  isDeleting.value = true
  deleteError.value = ''
  try {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    isDeleteDialogOpen.value = false
    accountStore.logout()
    router.push('/')
  } catch (err: any) {
    deleteError.value = err.message || 'حدث خطأ أثناء حذف الحساب'
  } finally {
    isDeleting.value = false
  }
}

useHead({
  title: 'الإعدادات | حسابي | Nexora',
  meta: [
    { name: 'description', content: 'تحكم في تفضيلات حسابك وطريقة استخدامك للمتجر.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background pb-32">
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
          <span class="text-text-primary font-medium">الإعدادات</span>
        </nav>
        
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">إعدادات الحساب</h1>
          <p class="text-lg text-text-secondary">
            تحكم في تفضيلات حسابك وطريقة استخدامك للمتجر.
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
            <NuxtLink to="/account/profile" class="px-5 py-2.5 bg-surface border border-border text-text-primary rounded-full text-sm font-semibold whitespace-nowrap">البيانات الشخصية</NuxtLink>
            <!-- Active Pill -->
            <NuxtLink to="/account/settings" class="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-sm whitespace-nowrap">الإعدادات</NuxtLink>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div class="w-full lg:col-span-3 xl:col-span-4 min-w-0">
          
          <div v-if="settingsStore.isLoading && !settingsStore.settings" class="flex justify-center items-center py-20">
            <Loader2 class="w-10 h-10 animate-spin text-primary" />
          </div>

          <div v-else class="flex flex-col gap-8">
            <!-- 5. التفضيلات العامة -->
            <section class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
              <div class="p-6 border-b border-border">
                <h2 class="text-xl font-bold text-text-primary">التفضيلات العامة</h2>
                <p class="text-sm text-text-secondary mt-1">تحديد تفضيلات اللغة، العملة، والدولة.</p>
              </div>
              <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- اللغة -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-text-primary flex items-center gap-2">
                    <Globe class="w-4 h-4 text-text-secondary" />
                    اللغة
                  </label>
                  <div class="relative">
                    <select v-model="localSettings.language" class="block w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none pr-10">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-text-secondary">
                      <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <!-- العملة -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-text-primary flex items-center gap-2">
                    <DollarSign class="w-4 h-4 text-text-secondary" />
                    العملة
                  </label>
                  <div class="relative">
                    <select v-model="localSettings.currency" class="block w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none pr-10">
                      <option value="EGP">جنيه مصري (EGP)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-text-secondary">
                      <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <!-- الدولة -->
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-text-primary flex items-center gap-2">
                    <MapPin class="w-4 h-4 text-text-secondary" />
                    الدولة أو المنطقة
                  </label>
                  <div class="relative">
                    <select v-model="localSettings.region" class="block w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none pr-10">
                      <option value="مصر">مصر</option>
                      <option value="السعودية">السعودية</option>
                      <option value="الإمارات">الإمارات</option>
                      <option value="دول أخرى">دول أخرى</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-text-secondary">
                      <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 6. المظهر -->
            <section class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
              <div class="p-6 border-b border-border">
                <h2 class="text-xl font-bold text-text-primary">المظهر</h2>
                <p class="text-sm text-text-secondary mt-1">تخصيص مظهر واجهة المتجر.</p>
              </div>
              <div class="p-6 space-y-6">
                <!-- Theme Radio Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label 
                    class="relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-200"
                    :class="localSettings.theme === 'light' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/50 bg-background'"
                  >
                    <input type="radio" v-model="localSettings.theme" value="light" class="sr-only">
                    <Sun class="w-8 h-8 mb-3" :class="localSettings.theme === 'light' ? 'text-primary' : 'text-text-secondary'" />
                    <span class="font-bold text-text-primary">فاتح</span>
                    <span class="text-xs text-text-secondary mt-1 text-center">مظهر ناصع ومشرق</span>
                    <div v-if="localSettings.theme === 'light'" class="absolute top-3 left-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 class="w-3 h-3 text-white" />
                    </div>
                  </label>

                  <label 
                    class="relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-200"
                    :class="localSettings.theme === 'dark' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/50 bg-background'"
                  >
                    <input type="radio" v-model="localSettings.theme" value="dark" class="sr-only">
                    <Moon class="w-8 h-8 mb-3" :class="localSettings.theme === 'dark' ? 'text-primary' : 'text-text-secondary'" />
                    <span class="font-bold text-text-primary">داكن</span>
                    <span class="text-xs text-text-secondary mt-1 text-center">مريح للعين في الظلام</span>
                    <div v-if="localSettings.theme === 'dark'" class="absolute top-3 left-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 class="w-3 h-3 text-white" />
                    </div>
                  </label>

                  <label 
                    class="relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-200"
                    :class="localSettings.theme === 'system' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-primary/50 bg-background'"
                  >
                    <input type="radio" v-model="localSettings.theme" value="system" class="sr-only">
                    <Monitor class="w-8 h-8 mb-3" :class="localSettings.theme === 'system' ? 'text-primary' : 'text-text-secondary'" />
                    <span class="font-bold text-text-primary">حسب الجهاز</span>
                    <span class="text-xs text-text-secondary mt-1 text-center">يتكيف مع إعدادات نظامك</span>
                    <div v-if="localSettings.theme === 'system'" class="absolute top-3 left-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 class="w-3 h-3 text-white" />
                    </div>
                  </label>
                </div>

                <!-- Accessibility -->
                <div class="pt-4 border-t border-border">
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex gap-3">
                      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Accessibility class="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 class="font-bold text-text-primary text-sm sm:text-base">تقليل الحركة والمؤثرات</h3>
                        <p class="text-xs sm:text-sm text-text-secondary">تعطيل الحركات التفاعلية لتحسين إمكانية الوصول والتصفح.</p>
                      </div>
                    </div>
                    
                    <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" v-model="localSettings.reducedMotion" class="sr-only peer">
                      <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <!-- 7. الإشعارات -->
            <section class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
              <div class="p-6 border-b border-border">
                <h2 class="text-xl font-bold text-text-primary">الإشعارات</h2>
                <p class="text-sm text-text-secondary mt-1">تحديد أنواع الإشعارات التي ترغب في استقبالها.</p>
              </div>
              <div class="p-0 divide-y divide-border">
                
                <!-- Order Updates -->
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Package class="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">تحديثات الطلبات</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">استقبل إشعارات عند إنشاء الطلب أو تحديث حالته.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.orderUpdates" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <!-- Shipping Updates -->
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Truck class="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">تحديثات الشحن والتوصيل</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">اعرف آخر تحديثات شحن طلباتك.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.shippingUpdates" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <!-- Offers and Promotions -->
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <Tag class="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">العروض والخصومات</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">استقبل أحدث العروض والخصومات الحصرية.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.promotions" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <!-- Newsletter -->
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail class="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">النشرة البريدية</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">احصل على أخبار المتجر والمنتجات الجديدة عبر البريد الإلكتروني.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.newsletter" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <!-- Push Notifications -->
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone class="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">الإشعارات الفورية</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">استقبل تنبيهات فورية على جهازك (إذا كانت الخدمة متاحة).</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.pushNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

              </div>
            </section>

            <!-- 8. الخصوصية والتخصيص -->
            <section class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden">
              <div class="p-6 border-b border-border">
                <h2 class="text-xl font-bold text-text-primary">الخصوصية والتخصيص</h2>
                <p class="text-sm text-text-secondary mt-1">إدارة بياناتك وطريقة استخدامنا لها لتحسين تجربتك.</p>
              </div>
              <div class="p-0 divide-y divide-border">
                
                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">التوصيات المخصصة</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">السماح بعرض منتجات تناسب اهتماماتك بناءً على مشترياتك السابقة.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.personalizedRecommendations" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">تخصيص تجربة التصفح</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">السماح باستخدام تفضيلات التصفح لتحسين تجربتك في المتجر.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.browsingPersonalization" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div class="p-6 flex items-center justify-between gap-4 hover:bg-background/50 transition-colors">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Tag class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 class="font-bold text-text-primary text-sm sm:text-base">الرسائل التسويقية</h3>
                      <p class="text-xs sm:text-sm text-text-secondary">الموافقة على استخدام بياناتك لإرسال عروض ترويجية مخصصة.</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" v-model="localSettings.marketingConsent" class="sr-only peer">
                    <div class="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-[-100%] peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div class="p-6 bg-background/30">
                  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <h3 class="font-bold text-text-primary">تصدير بياناتي</h3>
                      <p class="text-sm text-text-secondary mt-1">احصل على نسخة من جميع بياناتك المحفوظة لدينا.</p>
                    </div>
                    <button 
                      @click="requestDataExport"
                      class="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-background transition-colors text-text-primary whitespace-nowrap"
                    >
                      <Download class="w-4 h-4" />
                      طلب نسخة من بياناتي
                    </button>
                  </div>
                </div>

              </div>
            </section>

            <!-- 10. المنطقة الخطرة -->
            <section class="border border-red-500/20 bg-red-50 dark:bg-red-950/10 rounded-2xl overflow-hidden mt-8">
              <div class="p-6 border-b border-red-500/20">
                <div class="flex items-center gap-2 text-red-600 dark:text-red-500 mb-1">
                  <AlertTriangle class="w-5 h-5" />
                  <h2 class="text-xl font-bold">المنطقة الخطرة</h2>
                </div>
                <p class="text-sm text-red-700/70 dark:text-red-400/70">إجراءات حساسة لا يمكن التراجع عنها بسهولة.</p>
              </div>
              <div class="p-6 space-y-6">
                <!-- تعطيل الحساب -->
                <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 class="font-bold text-text-primary">تعطيل الحساب</h3>
                    <p class="text-sm text-text-secondary mt-1">إيقاف حسابك مؤقتًا مع إمكانية استعادته لاحقًا.</p>
                  </div>
                  <button 
                    @click="isDeactivateDialogOpen = true"
                    class="px-4 py-2 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    تعطيل الحساب
                  </button>
                </div>
                
                <hr class="border-red-500/10">

                <!-- حذف الحساب -->
                <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 class="font-bold text-text-primary">حذف الحساب نهائياً</h3>
                    <p class="text-sm text-text-secondary mt-1">حذف الحساب قد يؤدي إلى فقدان بياناتك ولا يمكن التراجع عنه بعد التأكيد.</p>
                  </div>
                  <button 
                    @click="isDeleteDialogOpen = true"
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
                  >
                    حذف الحساب
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>

    <!-- 9. Sticky Footer for Save/Cancel -->
    <div 
      class="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-surface/80 backdrop-blur-md z-40 transform transition-transform duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      :class="isDirty ? 'translate-y-0' : 'translate-y-full'"
    >
      <div class="container mx-auto max-w-5xl flex items-center justify-between lg:justify-end gap-3 px-4 lg:px-8">
        
        <!-- Error/Success Messages Desktop (optional visual feedback) -->
        <div class="hidden md:flex items-center gap-2 mr-auto" v-if="settingsStore.error">
          <AlertTriangle class="w-5 h-5 text-red-500" />
          <span class="text-sm text-red-500 font-medium">{{ settingsStore.error }}</span>
        </div>
        
        <button 
          @click="handleCancel"
          :disabled="settingsStore.isSaving"
          class="flex-1 lg:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all border border-border text-text-secondary hover:bg-background hover:text-text-primary disabled:opacity-50"
        >
          إلغاء
        </button>
        <button 
          @click="handleSave"
          :disabled="settingsStore.isSaving || !isDirty"
          class="flex-1 lg:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-primary text-white shadow-[0_4px_12px_rgba(var(--color-primary),0.25)] hover:shadow-[0_6px_16px_rgba(var(--color-primary),0.35)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
        >
          <Loader2 v-if="settingsStore.isSaving" class="w-4 h-4 animate-spin" />
          <CheckCircle2 v-else-if="settingsStore.success" class="w-4 h-4" />
          <span>{{ settingsStore.isSaving ? 'جاري الحفظ...' : (settingsStore.success ? 'تم الحفظ' : 'حفظ التغييرات') }}</span>
        </button>
      </div>
    </div>
    
    <!-- Success Toast Notification (Floating) -->
    <div 
      class="fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
      :class="settingsStore.success ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'"
    >
      <div class="bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
        <CheckCircle2 class="w-5 h-5" />
        <span class="font-medium text-sm">تم حفظ إعداداتك بنجاح.</span>
      </div>
    </div>

    <!-- Modals / Dialogs -->

    <!-- Deactivate Account Dialog -->
    <div v-if="isDeactivateDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="!isDeactivating && (isDeactivateDialogOpen = false)"></div>
      <div class="bg-surface w-full max-w-md rounded-2xl shadow-xl relative z-10 overflow-hidden" role="dialog" aria-modal="true">
        <div class="p-6 border-b border-border flex justify-between items-center">
          <h3 class="text-xl font-bold text-text-primary">تعطيل الحساب</h3>
          <button @click="!isDeactivating && (isDeactivateDialogOpen = false)" class="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-full hover:bg-background">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6">
          <p class="text-text-secondary text-sm leading-relaxed mb-4">
            هل أنت متأكد من رغبتك في تعطيل حسابك مؤقتاً؟ لن يظهر ملفك الشخصي للعامة ولكن سيتم الاحتفاظ ببياناتك لتتمكن من استعادتها عند تسجيل الدخول مجدداً.
          </p>
          
          <div v-if="deactivateError" class="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle class="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>{{ deactivateError }}</p>
          </div>
        </div>
        <div class="p-4 border-t border-border bg-background/50 flex justify-end gap-3">
          <button 
            @click="isDeactivateDialogOpen = false"
            :disabled="isDeactivating"
            class="px-4 py-2 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-50"
          >
            إلغاء
          </button>
          <button 
            @click="deactivateAccount"
            :disabled="isDeactivating"
            class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Loader2 v-if="isDeactivating" class="w-4 h-4 animate-spin" />
            تعطيل حسابي
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Dialog -->
    <div v-if="isDeleteDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="!isDeleting && (isDeleteDialogOpen = false)"></div>
      <div class="bg-surface w-full max-w-md rounded-2xl shadow-xl relative z-10 overflow-hidden border border-red-500/20" role="dialog" aria-modal="true">
        <div class="p-6 border-b border-border flex justify-between items-center bg-red-50/50 dark:bg-red-950/20">
          <div class="flex items-center gap-2 text-red-600 dark:text-red-500">
            <AlertTriangle class="w-5 h-5" />
            <h3 class="text-xl font-bold">حذف الحساب نهائياً</h3>
          </div>
          <button @click="!isDeleting && (isDeleteDialogOpen = false)" class="text-text-secondary hover:text-text-primary transition-colors p-1 rounded-full hover:bg-background">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6">
          <p class="text-text-secondary text-sm leading-relaxed mb-6">
            هذا الإجراء <strong class="text-red-500 font-bold">نهائي ولا يمكن التراجع عنه</strong>. سيتم حذف جميع بياناتك، سجل طلباتك، وعناوينك المحفوظة بشكل دائم.
          </p>
          
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-text-primary">
              للتأكيد، يرجى كتابة كلمة "حذف" في الحقل أدناه:
            </label>
            <input 
              v-model="deleteConfirmationText" 
              type="text" 
              placeholder="حذف"
              class="block w-full px-4 py-2 bg-background border border-border rounded-xl text-text-primary focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
            >
          </div>
          
          <div v-if="deleteError" class="mt-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle class="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>{{ deleteError }}</p>
          </div>
        </div>
        <div class="p-4 border-t border-border bg-background/50 flex justify-end gap-3">
          <button 
            @click="isDeleteDialogOpen = false"
            :disabled="isDeleting"
            class="px-4 py-2 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-50"
          >
            إلغاء
          </button>
          <button 
            @click="deleteAccount"
            :disabled="isDeleting || deleteConfirmationText !== 'حذف'"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Loader2 v-if="isDeleting" class="w-4 h-4 animate-spin" />
            حذف حسابي بشكل دائم
          </button>
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
