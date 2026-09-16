<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { Save, AlertCircle, CheckCircle } from 'lucide-vue-next'
import { useAccountStore } from '~/stores/account'
import { egyptianGovernorates, getCitiesForGovernorate } from '~/data/mock-profile'

const accountStore = useAccountStore()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  governorate: '',
  city: '',
  birthDate: ''
})

const errors = reactive<Record<string, string>>({})
const isDirty = ref(false)
const showToast = ref(false)

// Initialize form from store
onMounted(() => {
  if (accountStore.profile) {
    formData.firstName = accountStore.profile.firstName || ''
    formData.lastName = accountStore.profile.lastName || ''
    formData.email = accountStore.profile.email || ''
    formData.phone = accountStore.profile.phone || ''
    formData.governorate = accountStore.profile.governorate || ''
    formData.city = accountStore.profile.city || ''
    formData.birthDate = accountStore.profile.birthDate || ''
  }
})

// Cities logic
const availableCities = ref<string[]>([])
watch(() => formData.governorate, (newGov) => {
  if (newGov) {
    availableCities.value = getCitiesForGovernorate(newGov)
    // Only reset city if the current city is not in the new list (to prevent wiping out on load)
    if (formData.city && !availableCities.value.includes(formData.city)) {
      formData.city = ''
    }
  } else {
    availableCities.value = []
    formData.city = ''
  }
})

// Track changes to enable/disable save button and warn on leave
watch(formData, () => {
  if (accountStore.profile) {
    isDirty.value = 
      formData.firstName !== accountStore.profile.firstName ||
      formData.lastName !== accountStore.profile.lastName ||
      formData.email !== accountStore.profile.email ||
      formData.phone !== (accountStore.profile.phone || '') ||
      formData.governorate !== (accountStore.profile.governorate || '') ||
      formData.city !== (accountStore.profile.city || '') ||
      formData.birthDate !== (accountStore.profile.birthDate || '')
  }
}, { deep: true })

const validate = (): boolean => {
  let isValid = true
  // Reset errors
  Object.keys(formData).forEach(key => errors[key] = '')

  if (!formData.firstName.trim()) {
    errors.firstName = 'يرجى إدخال الاسم الأول.'
    isValid = false
  }
  if (!formData.lastName.trim()) {
    errors.lastName = 'يرجى إدخال اسم العائلة.'
    isValid = false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = 'يرجى إدخال البريد الإلكتروني.'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح.'
    isValid = false
  }
  
  const phoneRegex = /^01[0125][0-9]{8}$/
  if (formData.phone && !phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01).'
    isValid = false
  }
  
  if (!formData.governorate) {
    errors.governorate = 'يرجى اختيار المحافظة.'
    isValid = false
  }
  if (!formData.city) {
    errors.city = 'يرجى إدخال المدينة أو اختيارها.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return
  if (!isDirty.value) return

  try {
    await accountStore.updateProfile({ ...formData })
    isDirty.value = false
    
    // Show toast
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 4000)
    
  } catch (err) {
    // Error is handled in store and displayed in UI via accountStore.saveError
  }
}

const handleCancel = () => {
  if (accountStore.profile) {
    formData.firstName = accountStore.profile.firstName || ''
    formData.lastName = accountStore.profile.lastName || ''
    formData.email = accountStore.profile.email || ''
    formData.phone = accountStore.profile.phone || ''
    formData.governorate = accountStore.profile.governorate || ''
    formData.city = accountStore.profile.city || ''
    formData.birthDate = accountStore.profile.birthDate || ''
    
    Object.keys(formData).forEach(key => errors[key] = '')
    isDirty.value = false
  }
}

// Warn before leave if unsaved
onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (isDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

import { onBeforeRouteLeave } from 'vue-router'
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
      <h3 class="text-xl font-bold text-text-primary">تعديل البيانات الشخصية</h3>
    </div>

    <!-- Error State from API -->
    <div v-if="accountStore.saveError" class="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400">
      <AlertCircle class="w-5 h-5 shrink-0 mt-0.5" />
      <p class="font-medium text-sm">{{ accountStore.saveError }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- First Name -->
        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-semibold text-text-primary">الاسم الأول</label>
          <input 
            id="firstName" 
            v-model="formData.firstName" 
            type="text" 
            @blur="validate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all', errors.firstName ? 'border-red-500' : 'border-border focus:border-primary']"
          >
          <p v-if="errors.firstName" class="text-red-500 text-xs font-medium">{{ errors.firstName }}</p>
        </div>

        <!-- Last Name -->
        <div class="space-y-2">
          <label for="lastName" class="block text-sm font-semibold text-text-primary">اسم العائلة</label>
          <input 
            id="lastName" 
            v-model="formData.lastName" 
            type="text" 
            @blur="validate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all', errors.lastName ? 'border-red-500' : 'border-border focus:border-primary']"
          >
          <p v-if="errors.lastName" class="text-red-500 text-xs font-medium">{{ errors.lastName }}</p>
        </div>

        <!-- Email -->
        <div class="space-y-2 md:col-span-2 lg:col-span-1">
          <label for="email" class="block text-sm font-semibold text-text-primary">البريد الإلكتروني</label>
          <input 
            id="email" 
            v-model="formData.email" 
            type="email" 
            dir="ltr"
            @blur="validate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary text-right focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all', errors.email ? 'border-red-500' : 'border-border focus:border-primary']"
          >
          <p class="text-xs text-text-secondary mt-1">تغيير البريد الإلكتروني قد يتطلب تأكيداً جديداً.</p>
          <p v-if="errors.email" class="text-red-500 text-xs font-medium">{{ errors.email }}</p>
        </div>

        <!-- Phone -->
        <div class="space-y-2 md:col-span-2 lg:col-span-1">
          <label for="phone" class="block text-sm font-semibold text-text-primary">رقم الهاتف</label>
          <input 
            id="phone" 
            v-model="formData.phone" 
            type="tel" 
            dir="ltr"
            @blur="validate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary text-right focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all', errors.phone ? 'border-red-500' : 'border-border focus:border-primary']"
          >
          <p v-if="errors.phone" class="text-red-500 text-xs font-medium">{{ errors.phone }}</p>
        </div>

        <!-- Governorate -->
        <div class="space-y-2">
          <label for="governorate" class="block text-sm font-semibold text-text-primary">المحافظة</label>
          <select 
            id="governorate" 
            v-model="formData.governorate"
            @change="validate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer', errors.governorate ? 'border-red-500' : 'border-border focus:border-primary']"
          >
            <option value="" disabled>اختر المحافظة</option>
            <option v-for="gov in egyptianGovernorates" :key="gov" :value="gov">{{ gov }}</option>
          </select>
          <p v-if="errors.governorate" class="text-red-500 text-xs font-medium">{{ errors.governorate }}</p>
        </div>

        <!-- City -->
        <div class="space-y-2">
          <label for="city" class="block text-sm font-semibold text-text-primary">المدينة</label>
          <select 
            id="city" 
            v-model="formData.city"
            @change="validate"
            :disabled="!formData.governorate"
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none', errors.city ? 'border-red-500' : 'border-border focus:border-primary', !formData.governorate ? 'opacity-50 cursor-not-allowed bg-border/30' : 'cursor-pointer']"
          >
            <option value="" disabled>اختر المدينة</option>
            <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
          </select>
          <p v-if="errors.city" class="text-red-500 text-xs font-medium">{{ errors.city }}</p>
        </div>

        <!-- Birth Date -->
        <div class="space-y-2">
          <label for="birthDate" class="block text-sm font-semibold text-text-primary">تاريخ الميلاد <span class="text-text-secondary font-normal text-xs">(اختياري)</span></label>
          <input 
            id="birthDate" 
            v-model="formData.birthDate" 
            type="date" 
            :class="['w-full bg-background border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-border focus:border-primary']"
          >
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
          :disabled="!isDirty || accountStore.isSaving"
          class="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span v-if="accountStore.isSaving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <Save v-else class="w-5 h-5" />
          <span>{{ accountStore.isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات' }}</span>
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
          <p class="text-sm text-text-secondary">تم تحديث بياناتك الشخصية بنجاح.</p>
        </div>
      </div>
    </div>
  </div>
</template>
