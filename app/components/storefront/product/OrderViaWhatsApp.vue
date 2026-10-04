<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
  quantity: number
  options: Record<string, string> // optionId -> valueId
}>()

const marketing = useStoreMarketing()
const requestUrl = useRequestURL()

// The order details the merchant needs, so the chat starts with "how do I pay" instead of "which bag?"
const message = computed(() => {
  const p = props.product
  const chosen = (p.options ?? [])
    .map(o => {
      const value = o.values.find(v => v.id === props.options[o.id])
      return value ? `${o.name}: ${value.label}` : null
    })
    .filter(Boolean)
    .join(' | ')

  return [
    'مرحباً، أريد طلب هذا المنتج:',
    `• ${p.name}`,
    chosen && `• ${chosen}`,
    `• الكمية: ${props.quantity}`,
    `• السعر: ${(p.price * props.quantity).toLocaleString('ar-EG')} ${p.currency}`,
    `${requestUrl.origin}/products/${p.slug}`
  ].filter(Boolean).join('\n')
})

const link = computed(() => {
  const wa = marketing.value?.whatsapp
  if (!wa?.productButton || !wa.number) return null
  return whatsappLink(wa.number, message.value)
})
</script>

<template>
  <a
    v-if="link"
    :href="link"
    target="_blank"
    rel="noopener"
    class="flex items-center justify-center gap-3 w-full py-3.5 rounded-[1.25rem] border-2 border-[#25D366] text-[#128C7E] dark:text-[#25D366] font-bold hover:bg-[#25D366] hover:text-white transition-colors"
  >
    <CommonWhatsAppIcon class="w-6 h-6" />
    اطلب عبر واتساب
  </a>
</template>
