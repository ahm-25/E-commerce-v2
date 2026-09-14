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
  <footer class="bg-black text-white py-16 md:py-24 border-t border-gray-900 font-arabic">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
        
        <!-- Brand Area -->
        <div class="lg:col-span-4 flex flex-col items-start">
          <NuxtLink to="/" class="flex items-center gap-3 mb-8 text-white group">
            <span class="text-3xl font-bold tracking-wider uppercase">{{ store.name }}</span>
          </NuxtLink>
          
          <p class="text-gray-400 mb-8 max-w-sm leading-relaxed text-sm font-medium">
            {{ store.description }}
          </p>
          
          <div class="flex items-center gap-5">
            <a v-if="store.socials.facebook" :href="store.socials.facebook" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a v-if="store.socials.twitter" :href="store.socials.twitter" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a v-if="store.socials.instagram" :href="store.socials.instagram" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Links Group 1 -->
        <div class="lg:col-span-2 lg:col-start-6">
          <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">
            روابط سريعة
          </h4>
          <ul class="flex flex-col gap-4">
            <li v-for="link in [{name: 'الرئيسية', path: '/'}, {name: 'المنتجات', path: '/products'}, {name: 'الأقسام', path: '/categories'}, {name: 'العروض', path: '/offers'}, {name: 'من نحن', path: '/about'}]" :key="link.path">
              <NuxtLink :to="link.path" class="text-gray-400 hover:text-white text-sm transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links Group 2 -->
        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">
            خدمة العملاء
          </h4>
          <ul class="flex flex-col gap-4">
            <li v-for="link in [{name: 'تواصل معنا', path: '/contact'}, {name: 'سياسة الشحن', path: '/shipping'}, {name: 'سياسة الاسترجاع', path: '/returns'}, {name: 'الأسئلة الشائعة', path: '/faq'}, {name: 'دليل المقاسات', path: '/size-guide'}]" :key="link.path">
              <NuxtLink :to="link.path" class="text-gray-400 hover:text-white text-sm transition-colors">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-3 lg:col-start-10">
          <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">
            معلومات التواصل
          </h4>
          <ul class="flex flex-col gap-5">
            <li class="text-gray-400 flex items-center gap-3">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="text-sm dir-ltr text-right w-full">{{ store.contact.email }}</span>
            </li>
            <li class="text-gray-400 flex items-center gap-3">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span class="text-sm dir-ltr text-right w-full">{{ store.contact.phone }}</span>
            </li>
            <li class="text-gray-400 flex items-center gap-3">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span class="text-sm">{{ store.contact.address }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-gray-500 text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} جميع الحقوق محفوظة لـ <span class="text-white">{{ store.name }}</span>.
        </p>
        
        <div class="flex items-center gap-8">
          <button class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            <Globe class="w-4 h-4" />
            العربية
          </button>
          
          <button @click="scrollToTop" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold group" aria-label="Scroll to top">
            الأعلى
            <ArrowUp class="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
