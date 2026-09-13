<script setup lang="ts">
// CartHero.vue
</script>

<template>
  <div class="relative w-full h-[200px] md:h-[280px] bg-gray-50 flex items-center justify-center overflow-hidden">
    <!-- Optional Background Image with Overlay -->
    <NuxtImg 
      src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
      alt="Cart Background"
      class="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
      format="webp"
      quality="80"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-white/60 to-gray-50"></div>
    
    <div class="relative z-10 text-center px-4">
      <h1 class="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">
        عربة التسوق
      </h1>
      <p class="text-gray-600 md:text-lg max-w-lg mx-auto">
        منتجاتك المفضلة في مكان واحد
      </p>
    </div>
  </div>
</template>
