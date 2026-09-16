<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSecurityStore } from '~/stores/security'
import { MonitorSmartphone, Globe, Clock, ShieldAlert, LogOut, CheckCircle, AlertCircle } from 'lucide-vue-next'
import LogoutAllDevicesDialog from './LogoutAllDevicesDialog.vue'

const securityStore = useSecurityStore()

const isLogoutAllDialogOpen = ref(false)
const revokingSessionId = ref<string | null>(null)
const globalError = ref<string | null>(null)
const globalSuccess = ref<string | null>(null)

onMounted(() => {
  if (securityStore.sessions.length === 0) {
    securityStore.fetchSessions()
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const handleRevokeSession = async (sessionId: string) => {
  if (securityStore.isSaving) return
  
  revokingSessionId.value = sessionId
  globalError.value = null
  globalSuccess.value = null
  
  try {
    await securityStore.revokeSession(sessionId)
    globalSuccess.value = 'تم تسجيل الخروج من الجلسة بنجاح'
    setTimeout(() => { globalSuccess.value = null }, 3000)
  } catch (err: any) {
    globalError.value = securityStore.saveError || 'حدث خطأ غير متوقع'
  } finally {
    revokingSessionId.value = null
  }
}

const handleRevokeAllConfirm = async () => {
  globalError.value = null
  globalSuccess.value = null
  
  try {
    await securityStore.revokeAllSessions()
    isLogoutAllDialogOpen.value = false
    globalSuccess.value = 'تم تسجيل الخروج من جميع الأجهزة الأخرى بنجاح'
    setTimeout(() => { globalSuccess.value = null }, 3000)
  } catch (err: any) {
    globalError.value = securityStore.saveError || 'حدث خطأ غير متوقع'
  }
}
</script>

<template>
  <div id="sessions" class="bg-surface rounded-2xl border border-border shadow-premium overflow-hidden scroll-mt-24">
    <div class="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-xl font-bold text-text-primary mb-1">الجلسات النشطة</h3>
        <p class="text-sm text-text-secondary">الأجهزة التي قمت بتسجيل الدخول منها إلى حسابك.</p>
      </div>
      
      <button 
        v-if="securityStore.sessions.length > 1"
        @click="isLogoutAllDialogOpen = true"
        class="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
      >
        <LogOut class="w-4 h-4" />
        تسجيل الخروج من جميع الأجهزة
      </button>
    </div>

    <!-- Error/Success States -->
    <div v-if="globalError" class="m-6 mb-0 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400">
      <AlertCircle class="w-5 h-5 shrink-0 mt-0.5" />
      <p class="font-medium text-sm">{{ globalError }}</p>
    </div>
    
    <div v-if="globalSuccess" class="m-6 mb-0 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl flex items-start gap-3 text-green-600 dark:text-green-400">
      <CheckCircle class="w-5 h-5 shrink-0 mt-0.5" />
      <p class="font-medium text-sm">{{ globalSuccess }}</p>
    </div>

    <div class="p-6">
      
      <!-- Loading State -->
      <div v-if="securityStore.isLoading" class="space-y-4">
        <div v-for="i in 2" :key="i" class="border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 animate-pulse">
          <div class="w-12 h-12 bg-border rounded-xl shrink-0"></div>
          <div class="flex-grow space-y-2">
            <div class="h-5 w-1/3 bg-border rounded"></div>
            <div class="h-4 w-1/4 bg-border rounded"></div>
            <div class="h-4 w-1/2 bg-border rounded"></div>
          </div>
          <div class="h-9 w-24 bg-border rounded-lg shrink-0 mt-4 md:mt-0"></div>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="securityStore.error" class="flex flex-col items-center justify-center py-8 text-center">
        <ShieldAlert class="w-12 h-12 text-red-500 mb-4 opacity-80" />
        <h4 class="text-lg font-bold text-text-primary mb-2">حدث خطأ أثناء تحميل الجلسات</h4>
        <p class="text-text-secondary mb-4">{{ securityStore.error }}</p>
        <button 
          @click="securityStore.fetchSessions()"
          class="px-5 py-2.5 bg-surface border border-border hover:bg-background text-text-primary rounded-xl font-bold transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="securityStore.sessions.length === 0" class="flex flex-col items-center justify-center py-8 text-center text-text-secondary">
        <MonitorSmartphone class="w-12 h-12 mb-3 opacity-50" />
        <p>لا توجد جلسات نشطة لعرضها.</p>
      </div>

      <!-- Sessions List -->
      <div v-else class="space-y-4">
        <div 
          v-for="session in securityStore.sessions" 
          :key="session.id"
          class="border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 transition-colors hover:border-border/80 hover:bg-background/50 relative overflow-hidden"
          :class="session.isCurrentSession ? 'bg-primary/5 border-primary/20 hover:border-primary/30 hover:bg-primary/5' : ''"
        >
          <!-- Current Session Badge for Mobile (Visual only) -->
          <div v-if="session.isCurrentSession" class="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-bl-full flex justify-end items-start p-2 pointer-events-none md:hidden">
            <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
          
          <!-- Device Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="session.isCurrentSession ? 'bg-primary/20 text-primary' : 'bg-surface border border-border text-text-secondary'">
            <MonitorSmartphone class="w-6 h-6" />
          </div>
          
          <!-- Session Info -->
          <div class="flex-grow">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-bold text-text-primary text-base">{{ session.deviceName }}</h4>
              <span v-if="session.isCurrentSession" class="hidden md:inline-flex px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-md">الجلسة الحالية</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
              <div class="flex items-center gap-1.5 text-sm text-text-secondary">
                <Globe class="w-3.5 h-3.5" />
                <span>{{ session.browser }} على {{ session.os }}</span>
              </div>
              
              <div v-if="session.location" class="flex items-center gap-1.5 text-sm text-text-secondary">
                <ShieldAlert class="w-3.5 h-3.5 opacity-0 hidden sm:block" /> <!-- Alignment spacer if needed, or use MapPin -->
                <span>{{ session.location }}</span>
              </div>
              
              <div class="flex items-center gap-1.5 text-sm text-text-secondary sm:col-span-2">
                <Clock class="w-3.5 h-3.5" />
                <span dir="ltr">{{ formatDate(session.lastActive) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="mt-4 md:mt-0 flex justify-end shrink-0">
            <button
              v-if="!session.isCurrentSession"
              @click="handleRevokeSession(session.id)"
              :disabled="revokingSessionId !== null"
              class="px-4 py-2 bg-surface border border-border hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 hover:border-red-200 dark:hover:border-red-500/30 text-text-primary rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <span v-if="revokingSessionId === session.id" class="w-4 h-4 border-2 border-text-secondary/30 border-t-text-secondary rounded-full animate-spin"></span>
              <span v-else>تسجيل الخروج</span>
            </button>
            <span v-else class="text-sm font-semibold text-primary px-4 py-2 md:hidden">هذا الجهاز</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <LogoutAllDevicesDialog 
      :is-open="isLogoutAllDialogOpen" 
      :is-loading="securityStore.isSaving"
      @close="isLogoutAllDialogOpen = false" 
      @confirm="handleRevokeAllConfirm"
    />
  </div>
</template>
