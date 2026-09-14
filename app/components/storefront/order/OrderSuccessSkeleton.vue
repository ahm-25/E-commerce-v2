<template>
  <div class="animate-pulse">
    <!-- Breadcrumb -->
    <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
    
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <!-- Main Content -->
      <div class="lg:w-2/3">
        <!-- Hero Skeleton -->
        <div class="flex flex-col items-center pb-8 border-b border-gray-100 dark:border-gray-800">
          <div class="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full mb-6"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6"></div>
          <div class="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl w-48"></div>
        </div>

        <!-- Info Skeleton -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-gray-100 dark:border-gray-800">
          <div v-for="i in 4" :key="i" class="flex gap-4">
            <div class="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0"></div>
            <div class="flex-grow space-y-2">
              <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <!-- Timeline Skeleton -->
        <div class="py-10 border-b border-gray-100 dark:border-gray-800">
          <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
          <div class="flex justify-between">
            <div v-for="i in 5" :key="i" class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
              <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
            </div>
          </div>
          <div class="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-8"></div>
        </div>
        
        <!-- Items Skeleton -->
        <div class="py-8">
          <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6"></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="i in 3" :key="i" class="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0"></div>
              <div class="flex-grow space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Skeleton -->
      <div class="lg:w-1/3">
        <div class="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 lg:p-8">
          <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
          
          <div class="space-y-4 mb-6">
            <div v-for="i in 3" :key="i" class="flex gap-4">
              <div class="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
              <div class="flex-grow space-y-2 py-1">
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mt-2"></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
            <div v-for="i in 4" :key="i" class="flex justify-between">
              <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            </div>
          </div>
          
          <div class="flex justify-between py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
