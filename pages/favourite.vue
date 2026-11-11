<template>
  <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
      <div>
        <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <NuxtLink to="/" class="hover:text-primary transition-colors">
            {{ t('website_cars_hero_home', 'Home') }}
          </NuxtLink>
          <span>/</span>
          <span class="text-slate-900 font-bold">
            {{ t('website_navbar_favourite', 'Favorites') }}
          </span>
        </div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Heart class="w-7 h-7 text-rose-500 fill-rose-500" />
          <span>{{ t('website_navbar_favourite', 'Favorites') }}</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          {{ isRTL ? `لديك ${favCars.length} سيارة في قائمة المفضلة الخاصة بك` : `You have ${favCars.length} saved vehicles in your wishlist` }}
        </p>
      </div>

      <button
        v-if="favCars.length > 0"
        @click="clearFavorites"
        class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors"
      >
        {{ t('website_cars_clear_all', 'Clear Wishlist') }}
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="favCars.length === 0"
      class="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4"
    >
      <div class="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
        <Heart class="w-10 h-10" />
      </div>
      <h2 class="text-2xl font-black text-slate-900">
        {{ isRTL ? 'قائمة المفضلة فارغة حالياً' : 'Your wishlist is empty' }}
      </h2>
      <p class="text-sm text-slate-500 leading-relaxed">
        {{ isRTL
          ? 'اضغط على أيقونة القلب في أي سيارة لحفظها هنا ومقارنتها أو حجزها في أي وقت لاحق.'
          : 'Click the heart icon on any car card to save your favorite vehicles here for easy access and comparison.'
        }}
      </p>
      <div class="pt-4">
        <NuxtLink
          to="/cars"
          class="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-md transition-all inline-block"
        >
          {{ isRTL ? 'تصفح السيارات الآن' : 'Browse Inventory Now' }}
        </NuxtLink>
      </div>
    </div>

    <!-- Favorites Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <CarCard
        v-for="car in favCars"
        :key="car.id"
        :car="car"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const { favorites, clearFavorites } = useFavorites()
const { cars } = useSiteData()

useSeoMeta({
  title: 'Favorite Cars | AKM Motor City - السيارات المفضلة',
  description: 'View your saved vehicles at AKM Motor City.'
})

const favCars = computed(() => {
  return cars.value.filter(c => favorites.value.includes(c.id))
})
</script>
