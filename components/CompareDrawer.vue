<template>
  <div
    v-if="compareList.length > 0"
    class="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-40 transition-all duration-300"
  >
    <div class="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl text-white">
      <div class="flex items-center justify-between gap-4">
        <!-- Left: Cars Thumbnails -->
        <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
          <div
            v-for="car in comparedCars"
            :key="car.id"
            class="relative flex items-center gap-2 bg-slate-800/90 rounded-xl p-1.5 pe-3 shrink-0 border border-slate-700"
          >
            <img
              :src="car.images?.[0]?.url"
              class="w-12 h-9 object-cover rounded-lg bg-slate-950"
            />
            <div class="max-w-[120px] truncate">
              <div class="text-xs font-bold truncate">
                {{ isRTL && car.name_ar ? car.name_ar : car.name_api }}
              </div>
              <div class="text-[10px] text-sky-400 font-black">
                {{ formatPrice(car.price) }}
              </div>
            </div>
            <button
              @click.stop="removeFromCompare(car.id)"
              class="w-5 h-5 rounded-full bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors ms-1"
              title="Remove"
            >
              <X class="w-3 h-3" />
            </button>
          </div>

          <!-- Empty Slot Placeholder if < 3 -->
          <div
            v-if="comparedCars.length < 3"
            class="hidden sm:flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-400 font-semibold"
          >
            {{ isRTL ? `أضف حتى ${3 - comparedCars.length} سيارات أخرى` : `Add up to ${3 - comparedCars.length} more` }}
          </div>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="clearCompare"
            class="text-xs font-bold text-slate-400 hover:text-rose-400 px-2 py-1.5 transition-colors hidden sm:block"
          >
            {{ t('website_cars_clear_all', 'Clear') }}
          </button>

          <button
            @click="isModalOpen = true"
            class="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <ArrowLeftRight class="w-4 h-4" />
            <span>{{ isRTL ? `مقارنة المواصفات (${comparedCars.length})` : `Compare Now (${comparedCars.length})` }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  ArrowLeftRight
} from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { compareList, removeFromCompare, clearCompare, isModalOpen } = useCompare()
const { cars } = useSiteData()

const comparedCars = computed(() => {
  return cars.value.filter(c => compareList.value.includes(c.id))
})
</script>
