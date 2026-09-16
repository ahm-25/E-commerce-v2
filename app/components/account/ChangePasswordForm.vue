<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Eye, EyeOff, Save, AlertCircle, CheckCircle } from 'lucide-vue-next'
import { onBeforeRouteLeave } from 'vue-router'
import { useSecurityStore } from '~/stores/security'
import PasswordStrength from './PasswordStrength.vue'

const securityStore = useSecurityStore()

const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const passwordStrengthRef = ref<InstanceType<typeof PasswordStrength> | null>(null)
const confirmError = ref(false)
const showToast = ref(false)
const isDirty = ref(false)

// Check if passwords match
watch(() => [formData.newPassword, formData.confirmPassword], () => {
  if (formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
    confirmError.value = true
  } else {
    confirmError.value = false
  }
  
  isDirty.value = !!(formData.currentPassword || formData.newPassword || formData.confirmPassword)
})

const isFormValid = computed(() => {
  return (
    formData.currentPassword.length > 0 &&
    formData.newPassword.length > 0 &&
    formData.confirmPassword.length > 0 &&
    !confirmError.value &&
    passwordStrengthRef.value?.isValid
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value || securityStore.isSaving) return
  
  try {
    await securityStore.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    })
    
    // Success
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 4000)
    
    handleCancel() // Reset form
  } catch (err) {
    // Handled in store and shown in UI
  }
}

const handleCancel = () => {
  formData.currentPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
  confirmError.value = false
  isDirty.value = false
}

// Warn before leave if unsaved
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (isDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const confirmLeave = window.confirm('لديك تغييرات لم يتم حفظها. هل تريد مغادرة الصفحة؟')
    if (confirmLeave) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border shadow-premium relative">
    <div class="p-6 border-b border-border">
      <h3 class="text-xl font-bold text-text-primary mb-1">تغيير كلمة المرور</h3>
      <p class="text-sm text-text-secondary">استخدم كلمة مرور قوية وفريدة لحماية حسابك.</p>
    </div>

    <!-- Error State -->
    <div v-if="securityStore.saveError" class="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400">
      <AlertCircle class="w-5 h-5 shrink-0 mt-0.5" />
      <p class="font-medium text-sm">{{ securityStore.saveError }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-6">
        
        <!-- Current Password -->
        <div class="space-y-2">
          <label for="currentPassword" class="block text-sm font-semibold text-text-primary">كلمة المرور الحالية</label>
          <div class="relative">
            <input 
              id="currentPassword" 
              v-model="formData.currentPassword" 
              :type="showCurrent ? 'text' : 'password'" 
              autocomplete="current-password"
              dir="ltr"
              class="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12 text-right"
            >
            <button 
              type="button" 
              @click="showCurrent = !showCurrent" 
              class="absolute top-1/2 -translate-y-1/2 right-4 text-text-secondary hover:text-primary transition-colors"
              :aria-label="showCurrent ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
            >
              <EyeOff v-if="showCurrent" class="w-5 h-5" />
              <Eye v-else class="w-5 h-5" />
            </button>
          </div>
          <div class="flex justify-end mt-1">
            <NuxtLink to="/auth/forgot-password" class="text-sm font-semibold text-primary hover:underline">
              هل نسيت كلمة المرور؟
            </NuxtLink>
          </div>
        </div>

        <div class="h-px bg-border my-2"></div>

        <!-- New Password -->
        <div class="space-y-2">
          <label for="newPassword" class="block text-sm font-semibold text-text-primary">كلمة المرور الجديدة</label>
          <div class="relative">
            <input 
              id="newPassword" 
              v-model="formData.newPassword" 
              :type="showNew ? 'text' : 'password'" 
              autocomplete="new-password"
              dir="ltr"
              class="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12 text-right"
            >
            <button 
              type="button" 
              @click="showNew = !showNew" 
              class="absolute top-1/2 -translate-y-1/2 right-4 text-text-secondary hover:text-primary transition-colors"
              :aria-label="showNew ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
            >
              <EyeOff v-if="showNew" class="w-5 h-5" />
              <Eye v-else class="w-5 h-5" />
            </button>
          </div>
          
          <PasswordStrength 
            ref="passwordStrengthRef" 
            :password="formData.newPassword" 
            class="mt-3"
          />
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-semibold text-text-primary">تأكيد كلمة المرور الجديدة</label>
          <div class="relative">
            <input 
              id="confirmPassword" 
              v-model="formData.confirmPassword" 
              :type="showConfirm ? 'text' : 'password'" 
              autocomplete="new-password"
              dir="ltr"
              :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12 text-right', confirmError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary']"
            >
            <button 
              type="button" 
              @click="showConfirm = !showConfirm" 
              class="absolute top-1/2 -translate-y-1/2 right-4 text-text-secondary hover:text-primary transition-colors"
              :aria-label="showConfirm ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
            >
              <EyeOff v-if="showConfirm" class="w-5 h-5" />
              <Eye v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="confirmError" class="text-red-500 text-xs font-medium mt-1">كلمتا المرور غير متطابقتين.</p>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
        <button 
          type="button"
          @click="handleCancel"
          class="w-full sm:w-auto px-6 py-3 bg-surface border border-border hover:bg-background text-text-primary rounded-xl font-bold transition-colors"
        >
          إلغاء
        </button>
        <button 
          type="submit"
          :disabled="!isFormValid || securityStore.isSaving"
          class="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span v-if="securityStore.isSaving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <Save v-else class="w-5 h-5" />
          <span>{{ securityStore.isSaving ? 'جاري الحفظ...' : 'حفظ كلمة المرور' }}</span>
        </button>
      </div>
    </form>

    <!-- Success Toast -->
    <div 
      class="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 z-50 transition-all duration-500 transform"
      :class="showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'"
    >
      <div class="bg-surface border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle class="w-6 h-6" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-text-primary">نجاح</h4>
          <p class="text-sm text-text-secondary">تم تغيير كلمة المرور بنجاح.</p>
        </div>
      </div>
    </div>
  </div>
</template>
