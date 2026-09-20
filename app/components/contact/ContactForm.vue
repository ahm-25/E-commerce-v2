<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isLoading = ref(false)
const isSuccess = ref(false)
const error = ref('')

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const submitContactForm = async () => {
  // Basic validation
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    error.value = 'يرجى ملء جميع الحقول المطلوبة'
    return
  }

  if (!validateEmail(form.value.email)) {
    error.value = 'يرجى إدخال بريد إلكتروني صحيح'
    return
  }

  if (form.value.message.length < 10) {
    error.value = 'الرسالة قصيرة جداً'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    // TODO: Replace with actual API endpoint
    // await $fetch('/api/contact', { method: 'POST', body: form.value })
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isSuccess.value = true
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      isSuccess.value = false
    }, 5000)

  } catch (err) {
    error.value = 'تعذر إرسال الرسالة حاليًا. حاول مرة أخرى.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 transition-colors font-arabic">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">أرسل لنا رسالة</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm transition-colors">سنقوم بالرد عليك في أقرب وقت ممكن.</p>
    </div>

    <form @submit.prevent="submitContactForm" class="space-y-6">
      <!-- Error Message -->
      <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium transition-colors">
        {{ error }}
      </div>

      <!-- Success Message -->
      <div v-if="isSuccess" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 rounded-xl text-green-600 dark:text-green-400 text-sm font-medium transition-colors">
        تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت ممكن.
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Name -->
        <div class="space-y-2">
          <label for="name" class="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">الاسم <span class="text-red-500">*</span></label>
          <input 
            id="name"
            v-model="form.name"
            type="text" 
            placeholder="الاسم الكامل"
            :disabled="isLoading"
            class="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
          >
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">البريد الإلكتروني <span class="text-red-500">*</span></label>
          <input 
            id="email"
            v-model="form.email"
            type="email" 
            placeholder="example@domain.com"
            :disabled="isLoading"
            dir="ltr"
            class="w-full text-right bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
          >
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Phone -->
        <div class="space-y-2">
          <label for="phone" class="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">رقم الهاتف <span class="text-gray-400 font-normal">(اختياري)</span></label>
          <input 
            id="phone"
            v-model="form.phone"
            type="tel" 
            placeholder="+20 123 456 7890"
            :disabled="isLoading"
            dir="ltr"
            class="w-full text-right bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
          >
        </div>

        <!-- Subject -->
        <div class="space-y-2">
          <label for="subject" class="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">الموضوع <span class="text-red-500">*</span></label>
          <input 
            id="subject"
            v-model="form.subject"
            type="text" 
            placeholder="موضوع الرسالة"
            :disabled="isLoading"
            class="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all"
          >
        </div>
      </div>

      <!-- Message -->
      <div class="space-y-2">
        <label for="message" class="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">الرسالة <span class="text-red-500">*</span></label>
        <textarea 
          id="message"
          v-model="form.message"
          rows="5"
          placeholder="اكتب رسالتك هنا..."
          :disabled="isLoading"
          class="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition-all resize-none"
        ></textarea>
      </div>

      <!-- Submit -->
      <button 
        type="submit"
        :disabled="isLoading"
        class="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <svg v-if="isLoading" class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>إرسال الرسالة</span>
      </button>
    </form>
  </div>
</template>
