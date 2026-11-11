<template>
  <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card animate-pulse flex flex-col">
    <!-- Image Skeleton -->
    <div class="aspect-16/10 bg-slate-200 w-full"></div>

    <!-- Content Skeleton -->
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <div class="space-y-2">
        <div class="h-3 w-1/4 bg-slate-200 rounded"></div>
        <div class="h-5 w-3/4 bg-slate-200 rounded"></div>
      </div>

      <!-- Specs Row Skeleton -->
      <div class="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl">
        <div class="h-3.5 bg-slate-200 rounded"></div>
        <div class="h-3.5 bg-slate-200 rounded"></div>
        <div class="h-3.5 bg-slate-200 rounded"></div>
        <div class="h-3.5 bg-slate-200 rounded"></div>
      </div>

      <!-- Bottom Skeleton -->
      <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div class="space-y-1">
          <div class="h-2.5 w-12 bg-slate-200 rounded"></div>
          <div class="h-6 w-24 bg-slate-200 rounded"></div>
        </div>
        <div class="h-9 w-20 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  </div>
</template>

