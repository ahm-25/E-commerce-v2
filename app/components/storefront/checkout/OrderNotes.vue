<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout'
import { FileText } from 'lucide-vue-next'

const store = useCheckoutStore()
</script>

<template>
  <section class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm mt-6 mb-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <FileText class="w-5 h-5" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">ملاحظات الطلب <span class="text-text-secondary/60 text-sm font-normal">(اختياري)</span></h2>
    </div>

    <div class="space-y-2">
      <textarea 
        id="orderNotes"
        v-model="store.orderNotes"
        placeholder="أي ملاحظات إضافية تريد إرسالها مع الطلب (مثال: موعد الاستلام المفضل، تعليمات خاصة للمندوب...)"
        rows="3"
        maxlength="500"
        class="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20 resize-none"
      ></textarea>
      <div class="flex justify-end text-xs text-gray-400 font-medium">
        {{ store.orderNotes.length }} / 500
      </div>
    </div>
  </section>
</template>
