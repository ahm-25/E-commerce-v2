<script setup lang="ts">
// TODO: Fetch this data from backend tenant configuration when available
const mission = 'أن نكون الخيار الأول للتسوق الإلكتروني في المنطقة من خلال تقديم منتجات عالية الجودة، وتجربة عملاء لا تُنسى، وبناء علاقات مبنية على الثقة المتبادلة.'
const vision = 'إعادة صياغة مفهوم التسوق الرقمي ليصبح أكثر إنسانية، استدامة، وموثوقية، مع تمكين عملائنا من التعبير عن أنفسهم من خلال ما يختارونه من منتجاتنا.'
</script>

<template>
  <div class="py-16 md:py-24 bg-gray-900 dark:bg-black font-arabic">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
        
        <!-- Divider (Desktop) -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
        
        <!-- Mission -->
        <div class="text-right">
          <div class="inline-flex items-center gap-3 mb-6">
            <span class="w-8 h-[2px] bg-white/30"></span>
            <h2 class="text-2xl md:text-3xl font-bold text-white tracking-wide">رسالتنا</h2>
          </div>
          <p class="text-lg text-gray-400 leading-relaxed font-light">
            {{ mission }}
          </p>
        </div>
        
        <!-- Vision -->
        <div class="text-right">
          <div class="inline-flex items-center gap-3 mb-6">
            <span class="w-8 h-[2px] bg-white/30"></span>
            <h2 class="text-2xl md:text-3xl font-bold text-white tracking-wide">رؤيتنا</h2>
          </div>
          <p class="text-lg text-gray-400 leading-relaxed font-light">
            {{ vision }}
          </p>
        </div>
        
      </div>
    </div>
  </div>
</template>
