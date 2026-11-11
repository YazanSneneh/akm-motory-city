<template>
  <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-primary/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col relative">
    <!-- Top Action Buttons (Favorite & Compare) -->
    <div class="absolute top-3 end-3 z-20 flex items-center gap-1.5">
      <!-- 360 Badge if available -->
      <span
        v-if="has360"
        class="px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-sky-400 tracking-wider uppercase flex items-center gap-1 shadow-sm"
        title="360° Interactive Viewer Available"
      >
        <Rotate3d class="w-3 h-3 text-sky-400 animate-spin-slow" />
        <span>360°</span>
      </span>

      <!-- Compare Button -->
      <button
        @click.stop.prevent="toggleCompare(car.id)"
        class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md"
        :class="isComparing(car.id) ? 'bg-primary text-white ring-2 ring-primary/30' : 'bg-white/90 text-slate-700 hover:bg-white hover:text-primary'"
        :title="isComparing(car.id) ? t('website_car_card_remove_from_compare', 'Remove from Compare') : t('website_car_card_add_to_compare', 'Add to Compare')"
      >
        <ArrowLeftRight class="w-4 h-4" />
      </button>

      <!-- Favorite Button -->
      <button
        @click.stop.prevent="toggleFavorite(car.id)"
        class="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md"
        :class="isFavorite(car.id) ? 'bg-rose-50 text-rose-500 ring-2 ring-rose-300' : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500'"
        :title="isFavorite(car.id) ? 'Remove from favorites' : 'Add to favorites'"
      >
        <Heart class="w-4 h-4" :class="isFavorite(car.id) ? 'fill-rose-500 text-rose-500' : ''" />
      </button>
    </div>

    <!-- Condition & Stock Status Badges -->
    <div class="absolute top-3 start-3 z-20 flex flex-col gap-1.5 items-start">
      <span
        class="px-2.5 py-1 rounded-lg text-xs font-black tracking-wide uppercase shadow-sm"
        :class="car.is_used ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-600 text-white'"
      >
        {{ car.is_used ? (isRTL ? 'مستعمل ومفحوص' : 'Pre-Owned') : (isRTL ? 'جديد 0 كم' : 'Brand New') }}
      </span>

      <span
        v-if="car.is_full"
        class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-600 text-white shadow-sm"
      >
        {{ isRTL ? 'محجوز بالكامل' : 'Fully Reserved' }}
      </span>
      <span
        v-else-if="unitsLeft !== null && unitsLeft <= 2"
        class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-white shadow-sm"
      >
        {{ isRTL ? `متبقي ${unitsLeft} فقط` : `Only ${unitsLeft} Left` }}
      </span>
    </div>

    <!-- Car Media Showcase with Clickable Route -->
    <NuxtLink :to="`/cars/${car.id}`" class="block relative aspect-16/10 bg-slate-100 overflow-hidden cursor-pointer">
      <img
        :src="currentImage"
        :alt="carTitle"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      <!-- Image Navigation Dots on Hover (if multiple images) -->
      <div
        v-if="car.images && car.images.length > 1"
        class="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          v-for="(_, idx) in car.images.slice(0, 5)"
          :key="idx"
          @mouseenter.stop.prevent="activeImageIndex = idx"
          class="w-2 h-2 rounded-full transition-all"
          :class="activeImageIndex === idx ? 'w-5 bg-white' : 'bg-white/60 hover:bg-white'"
          :aria-label="`Image slide ${idx + 1}`"
        />
      </div>

      <!-- Views count tag -->
      <div class="absolute bottom-2 end-2 z-10 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white/90 flex items-center gap-1">
        <Eye class="w-3 h-3 text-slate-300" />
        <span>{{ car.views_count || 120 }}</span>
      </div>
    </NuxtLink>

    <!-- Car Information Content -->
    <div class="p-5 flex-1 flex flex-col justify-between gap-4">
      <!-- Title & Year/Brand -->
      <div>
        <div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
          <span>{{ brandName }}</span>
          <span v-if="modelYear" class="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {{ modelYear }}
          </span>
        </div>
        <NuxtLink
          :to="`/cars/${car.id}`"
          class="font-black text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-1 block leading-snug"
        >
          {{ carTitle }}
        </NuxtLink>
      </div>

      <!-- Key Specifications Pill Row -->
      <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <div class="flex items-center gap-1.5 truncate" :title="bodyShape">
          <Car class="w-3.5 h-3.5 text-primary shrink-0" />
          <span class="truncate">{{ bodyShape || (isRTL ? 'سيدان' : 'Sedan') }}</span>
        </div>
        <div class="flex items-center gap-1.5 truncate" :title="engineType">
          <Zap class="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span class="truncate">{{ engineType || (isRTL ? 'بنزين' : 'Gasoline') }}</span>
        </div>
        <div class="flex items-center gap-1.5 truncate" :title="transmission">
          <Gauge class="w-3.5 h-3.5 text-primary shrink-0" />
          <span class="truncate">{{ transmission || (isRTL ? 'أوتوماتيك' : 'Automatic') }}</span>
        </div>
        <div class="flex items-center gap-1.5 truncate" :title="driveType">
          <Compass class="w-3.5 h-3.5 text-primary shrink-0" />
          <span class="truncate">{{ driveType || 'FWD' }}</span>
        </div>
      </div>

      <!-- Price & Actions Footer -->
      <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div class="text-[11px] font-medium text-slate-400">
            {{ isRTL ? 'السعر النقدي' : 'Cash Price' }}
          </div>
          <div class="text-xl font-black text-primary tracking-tight">
            <span v-if="car.show_price && car.price">
              {{ formatPrice(car.price) }}
            </span>
            <span v-else class="text-base text-slate-600 font-bold">
              {{ t('website_car_price_on_request', 'Price on Request') }}
            </span>
          </div>
        </div>

        <NuxtLink
          :to="`/cars/${car.id}`"
          class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-extrabold shadow-sm transition-all group-hover:shadow-md"
        >
          <span>{{ isRTL ? 'التفاصيل' : 'Details' }}</span>
          <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Heart,
  ArrowLeftRight,
  Eye,
  Car,
  Zap,
  Gauge,
  Compass,
  ChevronRight,
  Rotate3d
} from 'lucide-vue-next'

const props = defineProps<{
  car: any
}>()

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { isFavorite, toggleFavorite } = useFavorites()
const { isComparing, toggleCompare } = useCompare()

const activeImageIndex = ref(0)

const carTitle = computed(() => {
  if (isRTL.value && props.car.name_ar) {
    return props.car.name_ar
  }
  return props.car.name_api || props.car.name || 'AKM Vehicle'
})

const currentImage = computed(() => {
  if (props.car.images && props.car.images.length > 0) {
    const img = props.car.images[activeImageIndex.value] || props.car.images[0]
    return img.url
  }
  return 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'
})

const has360 = computed(() => {
  return Array.isArray(props.car.threesixty) && props.car.threesixty.length > 0
})

const brandName = computed(() => {
  const brand = props.car.attributes?.find((a: any) => a.name === 'Brand')?.value
  return brand || 'AKM'
})

const bodyShape = computed(() => {
  return props.car.attributes?.find((a: any) => a.name === 'Body')?.value
})

const engineType = computed(() => {
  return props.car.attributes?.find((a: any) => a.name === 'Engine Type')?.value
})

const transmission = computed(() => {
  return props.car.attributes?.find((a: any) => a.name === 'Transmission')?.value
})

const driveType = computed(() => {
  return props.car.attributes?.find((a: any) => a.name === 'Drive Type')?.value
})

const modelYear = computed(() => {
  return props.car.extra_attributes?.find((a: any) => a.name === 'Model Year')?.value
})

const unitsLeft = computed(() => {
  if (props.car.total_units && typeof props.car.reserved_count === 'number') {
    return props.car.total_units - props.car.reserved_count
  }
  return null
})
</script>

<style scoped>
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spinSlow 8s linear infinite;
}
</style>

