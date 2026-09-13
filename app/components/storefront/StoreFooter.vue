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
  <footer class="relative bg-gray-950 text-gray-300 py-16 md:py-20 border-t border-gray-800/60 overflow-hidden">
    <!-- Subtle top gradient glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-32 bg-primary/5 blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        
        <!-- Brand Area -->
        <div class="lg:col-span-5 md:pr-8">
          <NuxtLink to="/" class="flex items-center gap-3 mb-6 text-white group w-fit">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <div class="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                <svg class="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <span class="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{{ store.name }}</span>
          </NuxtLink>
          
          <p class="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
            {{ store.description }}
          </p>
          
          <div class="flex items-center gap-4">
            <a v-if="store.socials.facebook" :href="store.socials.facebook" target="_blank" class="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] transition-all duration-300">
              <Facebook class="w-5 h-5" />
            </a>
            <a v-if="store.socials.twitter" :href="store.socials.twitter" target="_blank" class="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] transition-all duration-300">
              <Twitter class="w-5 h-5" />
            </a>
            <a v-if="store.socials.instagram" :href="store.socials.instagram" target="_blank" class="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] transition-all duration-300">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Links Group 1 -->
        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-6 text-lg flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            روابط سريعة
          </h4>
          <ul class="flex flex-col gap-3.5">
            <li v-for="link in [{name: 'الرئيسية', path: '/'}, {name: 'المنتجات', path: '/products'}, {name: 'الأقسام', path: '/categories'}, {name: 'العروض', path: '/offers'}, {name: 'من نحن', path: '/about'}]" :key="link.path">
              <NuxtLink :to="link.path" class="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                <span class="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300"></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links Group 2 -->
        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-6 text-lg flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            خدمة العملاء
          </h4>
          <ul class="flex flex-col gap-3.5">
            <li v-for="link in [{name: 'تواصل معنا', path: '/contact'}, {name: 'سياسة الشحن', path: '/shipping'}, {name: 'سياسة الاسترجاع', path: '/returns'}, {name: 'الأسئلة الشائعة', path: '/faq'}, {name: 'دليل المقاسات', path: '/size-guide'}]" :key="link.path">
              <NuxtLink :to="link.path" class="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                <span class="w-0 h-[1px] bg-accent group-hover:w-3 transition-all duration-300"></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-6 text-lg flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            معلومات التواصل
          </h4>
          <ul class="flex flex-col gap-5">
            <li class="text-gray-400 flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span class="rtl:mr-auto ltr:ml-auto dir-ltr font-medium pt-2">{{ store.contact.email }}</span>
            </li>
            <li class="text-gray-400 flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <span class="rtl:mr-auto ltr:ml-auto dir-ltr font-medium pt-2">{{ store.contact.phone }}</span>
            </li>
            <li class="text-gray-400 flex items-start gap-4 group">
              <div class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <span class="rtl:mr-auto ltr:ml-auto pt-2">{{ store.contact.address }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-gray-500 text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} جميع الحقوق محفوظة لـ <span class="text-gray-300">{{ store.name }}</span>.
        </p>
        
        <div class="flex items-center gap-8">
          <button class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            <Globe class="w-4 h-4" />
            العربية
          </button>
          
          <button @click="scrollToTop" class="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] transition-all duration-300 group" aria-label="Scroll to top">
            <ArrowUp class="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
