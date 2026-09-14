<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { usePasswordValidation } from '~/composables/usePasswordValidation'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { resetPassword, loading, error, clearError } = useAuth()

const password = ref('')
const passwordConfirmation = ref('')
const successMessage = ref('')
const localError = ref('')

const { strengthScore } = usePasswordValidation(password)

const handleResetPassword = async () => {
  localError.value = ''
  clearError()
  
  if (password.value !== passwordConfirmation.value) {
    localError.value = 'كلمتا المرور غير متطابقتين'
    return
  }

  if (strengthScore.value < 2) {
    localError.value = 'الرجاء إدخال كلمة مرور أقوى'
    return
  }

  const success = await resetPassword(password.value)

  if (success) {
    successMessage.value = 'تم تغيير كلمة المرور بنجاح. سيتم توجيهك لصفحة تسجيل الدخول...'
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
  }
}
</script>

<template>
  <AuthLayout 
    title="تغيير كلمة المرور" 
    subtitle="الرجاء إدخال كلمة المرور الجديدة أدناه."
    image="https://images.unsplash.com/photo-1549488344-c4860b001d7e?q=80&w=2070&auto=format&fit=crop"
  >
    <AuthError :message="error || localError" />
    <AuthSuccess :message="successMessage" />

    <form v-if="!successMessage" @submit.prevent="handleResetPassword" class="space-y-6">
      <div class="space-y-1">
        <AuthPasswordInput
          id="password"
          label="كلمة المرور الجديدة"
          v-model="password"
          placeholder="أنشئ كلمة مرور جديدة"
          required
          autocomplete="new-password"
        />
        <AuthPasswordStrength :password="password" />
      </div>

      <AuthPasswordInput
        id="passwordConfirmation"
        label="تأكيد كلمة المرور"
        v-model="passwordConfirmation"
        placeholder="أعد إدخال كلمة المرور"
        required
        autocomplete="new-password"
      />

      <div class="pt-2">
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-arabic"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span :class="{'opacity-0': loading}">تغيير كلمة المرور</span>
        </button>
      </div>
    </form>
    
    <div class="mt-8 text-center text-sm font-arabic">
      <NuxtLink to="/auth/login" class="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors">
        <svg class="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        العودة لتسجيل الدخول
      </NuxtLink>
    </div>
  </AuthLayout>
</template>
