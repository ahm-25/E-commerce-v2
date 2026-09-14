<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { login, loginWithGoogle, loading, error, clearError } = useAuth()

const identifier = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  if (!identifier.value || !password.value) return
  
  clearError()
  const success = await login({
    identifier: identifier.value,
    password: password.value,
    rememberMe: rememberMe.value
  })

  if (success) {
    router.push('/')
  }
}

const handleGoogleLogin = async () => {
  clearError()
  const success = await loginWithGoogle()
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <AuthLayout 
    title="مرحباً بعودتك" 
    subtitle="سجّل الدخول إلى حسابك لمتابعة رحلتك."
    image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
  >
    <AuthError :message="error" />

    <form @submit.prevent="handleLogin" class="space-y-4">
      <AuthInput
        id="identifier"
        label="البريد الإلكتروني أو رقم الهاتف"
        v-model="identifier"
        type="text"
        placeholder="أدخل البريد الإلكتروني أو رقم الهاتف"
        required
        autocomplete="username"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </template>
      </AuthInput>

      <AuthPasswordInput
        id="password"
        label="كلمة المرور"
        v-model="password"
        placeholder="أدخل كلمة المرور"
        required
        autocomplete="current-password"
      />

      <div class="flex items-center justify-between font-arabic text-sm">
        <label class="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300">
          <input 
            type="checkbox" 
            v-model="rememberMe"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
          >
          <span>تذكرني</span>
        </label>
        
        <NuxtLink to="/auth/forgot-password" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors">
          نسيت كلمة المرور؟
        </NuxtLink>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-arabic"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span :class="{'opacity-0': loading}">تسجيل الدخول</span>
        </button>
      </div>
    </form>

    <AuthDivider />

    <AuthSocialAuthButton :loading="loading" @click="handleGoogleLogin" />

    <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 font-arabic">
      ليس لديك حساب؟
      <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
        إنشاء حساب جديد
      </NuxtLink>
    </p>
  </AuthLayout>
</template>
