<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useMockData } from '~/composables/useMockData'
import ContactHero from '~/components/contact/ContactHero.vue'
import ContactInfo from '~/components/contact/ContactInfo.vue'
import ContactForm from '~/components/contact/ContactForm.vue'
import ContactHours from '~/components/contact/ContactHours.vue'

const { mockData } = useMockData()

// SEO
useSeoMeta({
  title: () => `تواصل معنا | ${mockData.store.name || 'المتجر'}`,
  description: 'يسعدنا تواصلكم معنا للرد على أي استفسارات أو ملاحظات.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] transition-colors duration-300">
    <!-- Breadcrumb -->
    <div class="bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex text-sm text-gray-500 dark:text-gray-400 font-arabic" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-gray-400 dark:text-gray-600">/</span>
                <span class="text-gray-900 dark:text-white font-bold" aria-current="page">تواصل معنا</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <ContactHero />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
        
        <!-- Sidebar Info -->
        <div class="lg:col-span-2 space-y-6">
          <ContactInfo :contact="mockData.store.contact" />
          <ContactHours />
          
          <!-- Socials TODO if necessary, currently mockData.store.socials exist -->
          <div class="p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 font-arabic mt-6">
            <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 transition-colors">تابعنا على الشبكات الاجتماعية</h3>
            <div class="flex flex-wrap items-center gap-4">
              <a 
                v-if="mockData.store.socials?.facebook" 
                :href="mockData.store.socials.facebook" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-blue-600 transition-colors"
              >
                فيسبوك
              </a>
              <a 
                v-if="mockData.store.socials?.twitter" 
                :href="mockData.store.socials.twitter" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-blue-400 transition-colors"
              >
                تويتر
              </a>
              <a 
                v-if="mockData.store.socials?.instagram" 
                :href="mockData.store.socials.instagram" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-gray-400 hover:text-pink-600 transition-colors"
              >
                إنستجرام
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <ContactForm />
        </div>
        
      </div>
    </div>
  </div>
</template>
