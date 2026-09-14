<template>
  <div class="relative my-6 font-arabic">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
    </div>
    <div class="relative flex justify-center text-sm">
      <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <slot>أو</slot>
      </span>
    </div>
  </div>
</template>

<style scoped>
.font-arabic {
  font-family: 'Cairo', 'IBM Plex Sans Arabic', sans-serif;
}
</style>
