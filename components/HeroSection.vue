<template>
  <div class="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
    <!-- Background Video with Fallback Poster -->
    <video
      autoplay
      loop
      muted
      playsinline
      poster="https://cms-motorcity.akm.jo/storage/seo_pages/f7436f911b9335b46afc81caa65e336cd2b45bf0.webp"
      class="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transform pointer-events-none"
    >
      <source
        src="https://cms-motorcity.akm.jo/storage/hero_pages/ywpPcGiIcmB6A5UJzAgKh0Aj754GMSzZQTHzIFsM.webm"
        type="video/webm"
      />
    </video>

    <!-- Gradient Overlay for Contrast & Luxury Feel -->
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-primary/30"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent"></div>

    <!-- Hero Main Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
      <!-- Top Tagline Pill -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-sky-200 mb-6 shadow-inner animate-pulse">
        <Sparkles class="w-4 h-4 text-amber-400" />
        <span>{{ isRTL ? 'الوجهة المعتمدة الأولى للسيارات في الأردن' : 'Jordan’s Premier Destination for Premium & EV Vehicles' }}</span>
      </div>

      <!-- Main Heading -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight sm:leading-none">
        <span class="block mb-2">{{ isRTL ? 'اكتشف سيارتك القادمة' : 'Drive the Extraordinary' }}</span>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300">
          {{ isRTL ? 'مدينة الخياط للسيارات' : 'AKM MOTOR CITY' }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
        {{ isRTL
          ? 'تصفح أحدث موديلات السيارات الجديدة والسيارات المفحوصة في الأردن مع كفالات معتمدة، وحجز فوري بمبلغ 100 دينار فقط.'
          : 'Browse brand new models and certified pre-owned vehicles with official warranty, transparent pricing, and instant online reservation.'
        }}
      </p>

      <!-- Smart Filter & Search Box -->
      <div class="mt-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl text-slate-800 border border-white/40">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Brand Selector -->
          <div class="text-start">
            <label class="block text-xs font-bold text-slate-600 mb-1">
              {{ t('website_cars_by_brands', 'Brand') }}
            </label>
            <select
              v-model="selectedBrand"
              class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"
            >
              <option value="">{{ isRTL ? 'جميع العلامات' : 'All Brands' }}</option>
              <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>

          <!-- Body Shape Selector -->
          <div class="text-start">
            <label class="block text-xs font-bold text-slate-600 mb-1">
              {{ t('website_cars_by_bodies', 'Body Shape') }}
            </label>
            <select
              v-model="selectedBody"
              class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"
            >
              <option value="">{{ isRTL ? 'جميع الهياكل' : 'All Bodies' }}</option>
              <option v-for="b in bodies" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>

          <!-- Condition Selector -->
          <div class="text-start">
            <label class="block text-xs font-bold text-slate-600 mb-1">
              {{ isRTL ? 'الحالة' : 'Condition' }}
            </label>
            <select
              v-model="selectedCondition"
              class="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary text-slate-800"
            >
              <option value="">{{ isRTL ? 'الكل (جديد ومستعمل)' : 'All (New & Used)' }}</option>
              <option value="new">{{ isRTL ? 'جديد (0 كم)' : 'Brand New' }}</option>
              <option value="used">{{ isRTL ? 'مستعمل ومفحوص' : 'Pre-Owned' }}</option>
            </select>
          </div>

          <!-- Search Button -->
          <div class="flex items-end">
            <button
              @click="submitSearch"
              class="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Search class="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{{ isRTL ? 'بحث في المعرض' : 'Search Inventory' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Trust Indicators -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 font-medium">
        <div class="flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-emerald-400" />
          <span>{{ isRTL ? 'كفالة شاملة ومركز خدمة معتمد' : 'Certified Service & Warranty' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <BadgePercent class="w-5 h-5 text-amber-400" />
          <span>{{ isRTL ? 'حجز فوري بمبلغ 100 دينار' : 'Instant 100 JOD Online Booking' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Glasses class="w-5 h-5 text-sky-400" />
          <NuxtLink to="/showroom" class="hover:underline flex items-center gap-1">
            <span>{{ isRTL ? 'معرض افتراضي 3D تفاعلي' : '3D Virtual VR Showroom' }}</span>
            <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Sparkles,
  Search,
  ShieldCheck,
  BadgePercent,
  Glasses,
  ChevronRight
} from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const { brands, bodies } = useSiteData()
const router = useRouter()

const selectedBrand = ref('')
const selectedBody = ref('')
const selectedCondition = ref('')

const submitSearch = () => {
  const query: Record<string, string> = {}
  if (selectedBrand.value) query.brand = selectedBrand.value
  if (selectedBody.value) query.body = selectedBody.value
  if (selectedCondition.value) query.condition = selectedCondition.value

  router.push({
    path: '/cars',
    query
  })
}
</script>
