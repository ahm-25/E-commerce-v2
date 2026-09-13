<template>
  <div class="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-7xl">
    <!-- Breadcrumbs Skeleton -->
    <div class="h-4 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
    
    <!-- Hero Skeleton -->
    <div class="flex flex-col items-center justify-center mb-12 text-center">
      <div class="h-10 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
      <div class="h-5 bg-gray-200 rounded w-96 animate-pulse"></div>
    </div>

    <!-- Steps Skeleton -->
    <div class="w-full max-w-4xl mx-auto mb-10 overflow-hidden px-4 md:px-0 hidden sm:flex items-center justify-between">
      <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      <div class="flex-grow h-1 bg-gray-100 mx-4"></div>
      <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      <div class="flex-grow h-1 bg-gray-100 mx-4"></div>
      <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      <div class="flex-grow h-1 bg-gray-100 mx-4"></div>
      <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    </div>

    <!-- Main Layout -->
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
      <!-- Forms Area (Left) -->
      <div class="flex-grow order-2 lg:order-1 space-y-6">
        <div v-for="i in 4" :key="i" class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div class="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div class="space-y-4">
            <div class="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            <div class="h-12 bg-gray-100 rounded-xl animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Order Summary Area (Right) -->
      <div class="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 order-1 lg:order-2">
        <div class="bg-surface border border-border/50 rounded-[2rem] p-6 sm:p-8 shadow-sm h-[600px]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div class="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div class="space-y-4 mt-8">
            <div v-for="i in 3" :key="i" class="flex gap-4">
              <div class="w-16 h-16 rounded-lg bg-gray-200 animate-pulse"></div>
              <div class="flex-grow space-y-2 py-1">
                <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
