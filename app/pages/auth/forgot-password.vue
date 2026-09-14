<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'default'
})

const { forgotPassword, loading, error, clearError } = useAuth()

const email = ref('')
const successMessage = ref('')

const handleForgotPassword = async () => {
  if (!email.value) return
  
  clearError()
  successMessage.value = ''
  
  const success = await forgotPassword(email.value)

  if (success) {
    successMessage.value = 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح (يرجى التحقق من الرسائل غير المرغوب فيها أيضاً).'
  }
}
</script>

<template>
  <AuthLayout 
    title="هل نسيت كلمة المرور؟" 
    subtitle="لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رابطاً لاستعادة كلمة المرور."
    image="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2070&auto=format&fit=crop"
  >
    <AuthError :message="error" />
    <AuthSuccess :message="successMessage" />

    <form v-if="!successMessage" @submit.prevent="handleForgotPassword" class="space-y-6">
      <AuthInput
        id="email"
        label="البريد الإلكتروني"
        v-model="email"
        type="email"
        placeholder="أدخل بريدك الإلكتروني المسجل"
        required
        autocomplete="email"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </template>
      </AuthInput>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-arabic"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span :class="{'opacity-0': loading}">إرسال رابط الاستعادة</span>
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
