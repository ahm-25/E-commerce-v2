<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
    <!-- Main Content Area -->
    <div class="lg:col-span-8 space-y-8">
      <div class="bg-white rounded-3xl p-4 md:p-8 border border-gray-100 shadow-sm">
        <!-- Header Skeleton -->
        <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
          <div class="flex gap-3 items-center">
            <div class="w-6 h-6 rounded-md bg-gray-200"></div>
            <div class="w-32 h-6 bg-gray-200 rounded-md"></div>
          </div>
          <div class="w-24 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        
        <!-- Items Skeleton -->
        <div class="space-y-6">
          <div v-for="i in 3" :key="i" class="flex gap-4 md:gap-6 py-6 border-b border-gray-100 last:border-0">
            <div class="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-xl shrink-0"></div>
            <div class="flex-1 flex flex-col justify-between">
              <div class="flex justify-between items-start gap-4">
                <div class="space-y-2 flex-1">
                  <div class="w-3/4 h-5 bg-gray-200 rounded-md"></div>
                  <div class="w-1/2 h-5 bg-gray-200 rounded-md"></div>
                  <div class="w-1/4 h-3 bg-gray-200 rounded-md mt-4"></div>
                </div>
                <div class="w-24 h-6 bg-gray-200 rounded-md hidden md:block"></div>
              </div>
              <div class="flex items-end justify-between mt-4">
                <div class="w-28 h-10 bg-gray-200 rounded-lg"></div>
                <div class="flex gap-2">
                  <div class="w-9 h-9 bg-gray-200 rounded-full"></div>
                  <div class="w-9 h-9 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Area -->
    <div class="lg:col-span-4">
      <div class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm sticky top-28">
        <div class="w-32 h-6 bg-gray-200 rounded-md mb-6"></div>
        
        <!-- Coupon Skeleton -->
        <div class="space-y-3 mb-8">
          <div class="w-20 h-4 bg-gray-200 rounded-md"></div>
          <div class="w-full h-12 bg-gray-200 rounded-xl"></div>
        </div>

        <!-- Summary Lines Skeleton -->
        <div class="space-y-4 my-8 pb-8 border-b border-gray-100">
          <div v-for="i in 3" :key="i" class="flex justify-between items-center">
            <div class="w-24 h-4 bg-gray-200 rounded-md"></div>
            <div class="w-20 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <!-- Total Skeleton -->
        <div class="flex justify-between items-end mb-8">
          <div class="w-28 h-5 bg-gray-200 rounded-md"></div>
          <div class="space-y-2 text-left flex flex-col items-end">
            <div class="w-32 h-8 bg-gray-200 rounded-md"></div>
            <div class="w-24 h-3 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <!-- Button Skeleton -->
        <div class="w-full h-14 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
</template>
