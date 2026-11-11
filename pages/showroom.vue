<template>
  <div class="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <NuxtLink to="/" class="hover:text-primary transition-colors">
          {{ t('website_cars_hero_home', 'Home') }}
        </NuxtLink>
        <span>/</span>
        <span class="text-slate-900 font-bold">
          {{ t('website_navbar_vr', 'VR Showroom') }}
        </span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Glasses class="w-8 h-8 text-primary" />
            <span>{{ isRTL ? 'المعرض الافتراضي ثلاثي الأبعاد 360°' : '3D Virtual Showroom Tour' }}</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            {{ isRTL
              ? 'تجول في معرض AKM Motor City بتقنية الواقع الافتراضي وتفقد سياراتنا مباشرة وكأنك في المعرض'
              : 'Experience the AKM flagship showroom with realistic 360° virtual reality walkthrough'
            }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="toggleFullscreen"
            class="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Maximize2 class="w-4 h-4 text-primary" />
            <span>{{ isRTL ? 'ملء الشاشة' : 'Fullscreen' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- VR Tour Container -->
    <div
      ref="tourContainer"
      class="relative w-full aspect-16/10 lg:aspect-21/9 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl"
    >
      <iframe
        :src="tourUrl"
        class="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen; gyroscope; accelerometer"
        title="AKM Motor City Virtual Tour"
      ></iframe>
    </div>

    <!-- Instructions & Showroom Information Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Move class="w-5 h-5" />
        </div>
        <h3 class="font-extrabold text-slate-900 text-base">
          {{ isRTL ? 'التنقل الحر' : 'Free 360° Navigation' }}
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">
          {{ isRTL
            ? 'انقر واسحب بالفأرة أو المس الشاشة للالتفاف في أي اتجاه، واضغط على الدوائر البيضاء على الأرضية للانتقال بين أجنحة المعرض.'
            : 'Click and drag or swipe to look in any direction. Click floor waypoints to move seamlessly between showroom sections.'
          }}
        </p>
      </div>

      <div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Car class="w-5 h-5" />
        </div>
        <h3 class="font-extrabold text-slate-900 text-base">
          {{ isRTL ? 'معاينة المقصورات' : 'Inspect Vehicle Cockpits' }}
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">
          {{ isRTL
            ? 'اقترب من أي سيارة في المعرض لاستكشاف التصميم الخارجي والداخلي والتفاصيل الفاخرة بدقة متناهية.'
            : 'Step inside vehicles to examine dashboard layouts, seating ergonomics, and premium finishes in high-res detail.'
          }}
        </p>
      </div>

      <div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <CalendarCheck class="w-5 h-5" />
        </div>
        <h3 class="font-extrabold text-slate-900 text-base">
          {{ isRTL ? 'حجز موعد تجربة قيادة' : 'Book a Live Test Drive' }}
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">
          {{ isRTL
            ? 'أعجبتك سيارة معينة؟ يمكنك حجز موعد لتجربة قيادتها وزيارة مركزنا في البيادر بالتنسيق المباشر مع فريقنا.'
            : 'Found the car you love? Schedule a personalized in-person test drive at our Bayader showroom.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Glasses,
  Maximize2,
  Move,
  Car,
  CalendarCheck
} from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const tourContainer = ref<HTMLElement | null>(null)

useSeoMeta({
  title: '3D VR Virtual Showroom | AKM Motor City Jordan',
  description: 'Walk through AKM Motor City virtually with our interactive 360-degree showroom tour.'
})

const tourUrl = computed(() => {
  const lang = isRTL.value ? 'ar' : 'en'
  return `https://tourmkr.com/F1zGuCY9xc/47655706p&269h&90t/lang:${lang}`
})

const toggleFullscreen = () => {
  if (!tourContainer.value) return
  if (!document.fullscreenElement) {
    tourContainer.value.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}
</script>

