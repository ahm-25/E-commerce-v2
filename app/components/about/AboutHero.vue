<script setup lang="ts">
// No props needed, uses tenant logo/visuals or a premium placeholder
const visualUrl = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200'
</script>

<template>
  <div class="relative py-16 md:py-24 overflow-hidden font-arabic">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <!-- Text Area -->
        <div class="flex flex-col items-start max-w-2xl">
          <span class="inline-block px-3 py-1 mb-6 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full tracking-wider">
            من نحن
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] mb-6 dark:text-white transition-colors">
            تجربة تسوق مختلفة،<br />صُممت من أجلك
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
            نؤمن أن التسوق الإلكتروني يجب أن يكون بسيطًا، موثوقًا، وممتعًا. لذلك نحرص على تقديم تجربة تجمع بين جودة المنتجات، سهولة الطلب، وخدمة عملاء تهتم بكل التفاصيل.
          </p>
        </div>
        
        <!-- Visual Area -->
        <div class="relative w-full aspect-[4/3] lg:aspect-square max-w-lg lg:max-w-none mx-auto">
          <!-- Abstract decoration behind the image -->
          <div class="absolute -inset-4 bg-gray-100 dark:bg-gray-800 rounded-[2rem] transform -rotate-3 transition-colors"></div>
          <div class="absolute -inset-4 bg-gray-50 dark:bg-gray-900 rounded-[2rem] transform rotate-2 transition-colors opacity-50 border border-gray-200 dark:border-gray-700"></div>
          
          <div class="relative w-full h-full rounded-3xl overflow-hidden shadow-sm">
            <NuxtImg 
              :src="visualUrl" 
              alt="تجربة تسوق مختلفة"
              class="w-full h-full object-cover object-center"
              format="webp"
              quality="85"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
