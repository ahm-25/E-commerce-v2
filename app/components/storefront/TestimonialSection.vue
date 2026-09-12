<script setup lang="ts">
import { Quote, Star } from 'lucide-vue-next'
import type { Testimonial } from '~/types'

defineProps<{
  testimonials: Testimonial[]
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-surface">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- We just show the first testimonial for simplicity, or we could add a carousel -->
        <div v-if="testimonials.length > 0" class="flex flex-col items-center">
          <Quote class="w-12 h-12 text-text-secondary/30 mb-8" />
          
          <p class="text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-text-primary mb-10">
            "{{ testimonials[0].quote }}"
          </p>
          
          <div class="flex items-center gap-4">
            <!-- Customers avatars (simulated cluster if one is chosen, or single) -->
            <div class="flex -space-x-3 rtl:space-x-reverse">
              <NuxtImg 
                v-if="testimonials[0].avatar"
                :src="testimonials[0].avatar" 
                :alt="testimonials[0].name"
                class="w-12 h-12 rounded-full border-2 border-surface object-cover relative z-10"
                format="webp"
                quality="80"
                loading="lazy"
              />
              <!-- Mock additional avatars for social proof effect if desired -->
              <NuxtImg src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" class="w-12 h-12 rounded-full border-2 border-surface object-cover relative z-20" />
              <NuxtImg src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" class="w-12 h-12 rounded-full border-2 border-surface object-cover relative z-30" />
            </div>
            
            <div class="flex flex-col items-start rtl:items-start text-start">
              <div class="flex items-center gap-1 mb-1">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400 text-amber-400" />
                <span class="text-sm font-bold text-text-primary mr-2 rtl:mr-2 ltr:ml-2">(4.8)</span>
              </div>
              <span class="text-sm text-text-secondary font-medium">{{ testimonials[0].location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
