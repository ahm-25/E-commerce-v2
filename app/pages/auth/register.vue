<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { usePasswordValidation } from '~/composables/usePasswordValidation'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { register, loginWithGoogle, loading, error, clearError } = useAuth()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const acceptedTerms = ref(false)
const localError = ref('')

const { strengthScore } = usePasswordValidation(password)

const handleRegister = async () => {
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

  const success = await register({
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    acceptedTerms: acceptedTerms.value
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
    title="إنشاء حساب جديد" 
    subtitle="انضم إلينا واستمتع بتجربة تسوق أفضل."
    image="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
  >
    <AuthError :message="error || localError" />

    <form @submit.prevent="handleRegister" class="space-y-4">
      <AuthInput
        id="name"
        label="الاسم بالكامل"
        v-model="name"
        type="text"
        placeholder="أدخل اسمك الكامل"
        required
        autocomplete="name"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AuthInput
          id="email"
          label="البريد الإلكتروني"
          v-model="email"
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          required
          autocomplete="email"
        />
        
        <AuthInput
          id="phone"
          label="رقم الهاتف"
          v-model="phone"
          type="tel"
          placeholder="أدخل رقم الهاتف"
          required
          autocomplete="tel"
        />
      </div>

      <div class="space-y-1">
        <AuthPasswordInput
          id="password"
          label="كلمة المرور"
          v-model="password"
          placeholder="أنشئ كلمة مرور"
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

      <div class="flex items-start gap-2 font-arabic text-sm mt-4">
        <input 
          id="terms"
          type="checkbox" 
          v-model="acceptedTerms"
          required
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-1"
        >
        <label for="terms" class="text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer">
          أوافق على <NuxtLink to="/terms" class="text-blue-600 hover:underline">الشروط والأحكام</NuxtLink> و <NuxtLink to="/privacy" class="text-blue-600 hover:underline">سياسة الخصوصية</NuxtLink>.
        </label>
      </div>

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
          <span :class="{'opacity-0': loading}">إنشاء حساب</span>
        </button>
      </div>
    </form>

    <AuthDivider />

    <AuthSocialAuthButton :loading="loading" @click="handleGoogleLogin">
      إنشاء حساب باستخدام Google
    </AuthSocialAuthButton>

    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 font-arabic">
      لديك حساب بالفعل؟
      <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
        تسجيل الدخول
      </NuxtLink>
    </p>
  </AuthLayout>
</template>
