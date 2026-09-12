<script setup lang="ts">
import { Facebook, Twitter, Instagram, ArrowUp, Globe } from 'lucide-vue-next'
import type { Store } from '~/types'

defineProps<{
  store: Store
}>()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <!-- In dark mode, we keep a deep charcoal background (bg-background in dark). In light mode, the footer is also dark charcoal based on the reference image -->
  <footer class="bg-[#121212] text-[#F3F4F6] py-16 border-t border-[#333333]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        <!-- Brand Area -->
        <div class="lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2 mb-6 text-white">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-2xl font-bold tracking-tight">{{ store.name }}</span>
          </NuxtLink>
          <p class="text-[#9CA3AF] mb-8 max-w-sm leading-relaxed">
            {{ store.description }}
          </p>
          <div class="flex items-center gap-4">
            <a v-if="store.socials.facebook" :href="store.socials.facebook" target="_blank" class="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-white transition-colors">
              <Facebook class="w-4 h-4" />
            </a>
            <a v-if="store.socials.twitter" :href="store.socials.twitter" target="_blank" class="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-white transition-colors">
              <Twitter class="w-4 h-4" />
            </a>
            <a v-if="store.socials.instagram" :href="store.socials.instagram" target="_blank" class="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-white transition-colors">
              <Instagram class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Links Group 1 -->
        <div>
          <h4 class="text-white font-bold mb-6 text-lg">روابط سريعة</h4>
          <ul class="flex flex-col gap-4">
            <li><NuxtLink to="/" class="text-[#9CA3AF] hover:text-white transition-colors">الرئيسية</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-[#9CA3AF] hover:text-white transition-colors">المنتجات</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-[#9CA3AF] hover:text-white transition-colors">الأقسام</NuxtLink></li>
            <li><NuxtLink to="/offers" class="text-[#9CA3AF] hover:text-white transition-colors">العروض</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-[#9CA3AF] hover:text-white transition-colors">من نحن</NuxtLink></li>
          </ul>
        </div>

        <!-- Links Group 2 -->
        <div>
          <h4 class="text-white font-bold mb-6 text-lg">خدمة العملاء</h4>
          <ul class="flex flex-col gap-4">
            <li><NuxtLink to="/contact" class="text-[#9CA3AF] hover:text-white transition-colors">تواصل معنا</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="text-[#9CA3AF] hover:text-white transition-colors">سياسة الشحن</NuxtLink></li>
            <li><NuxtLink to="/returns" class="text-[#9CA3AF] hover:text-white transition-colors">سياسة الاسترجاع</NuxtLink></li>
            <li><NuxtLink to="/faq" class="text-[#9CA3AF] hover:text-white transition-colors">الأسئلة الشائعة</NuxtLink></li>
            <li><NuxtLink to="/size-guide" class="text-[#9CA3AF] hover:text-white transition-colors">دليل المقاسات</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-white font-bold mb-6 text-lg">معلومات التواصل</h4>
          <ul class="flex flex-col gap-4">
            <li class="text-[#9CA3AF] flex items-center gap-3">
              <span class="rtl:mr-auto ltr:ml-auto dir-ltr">{{ store.contact.email }}</span>
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </li>
            <li class="text-[#9CA3AF] flex items-center gap-3">
              <span class="rtl:mr-auto ltr:ml-auto dir-ltr">{{ store.contact.phone }}</span>
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </li>
            <li class="text-[#9CA3AF] flex items-center gap-3">
              <span class="rtl:mr-auto ltr:ml-auto">{{ store.contact.address }}</span>
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-[#9CA3AF] text-sm">
          &copy; {{ new Date().getFullYear() }} جميع الحقوق محفوظة لـ {{ store.name }}.
        </p>
        
        <div class="flex items-center gap-6">
          <button class="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium">
            <Globe class="w-4 h-4" />
            العربية
          </button>
          
          <button @click="scrollToTop" class="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-white hover:text-[#121212] transition-colors" aria-label="Scroll to top">
            <ArrowUp class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
