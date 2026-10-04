<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const marketing = useStoreMarketing()

// Hidden where it would cover the checkout's pay button on phones
const HIDDEN_ON = ['/checkout']

const link = computed(() => {
  const wa = marketing.value?.whatsapp
  if (!wa?.enabled || !wa.number || HIDDEN_ON.includes(route.path)) return null
  return whatsappLink(wa.number, wa.message)
})
</script>

<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener"
    aria-label="تواصل معنا على واتساب"
    title="تواصل معنا على واتساب"
    class="group fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 transition-all p-3.5 print:hidden"
  >
    <CommonWhatsAppIcon class="w-7 h-7" />
    <span class="hidden md:group-hover:inline pe-1 text-sm font-bold whitespace-nowrap">تواصل معنا</span>
  </a>
</template>
