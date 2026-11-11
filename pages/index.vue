<template>
  <div>
    <!-- Hero with Video Background & Search Box -->
    <HeroSection />

    <!-- Brands Carousel Bar -->
    <section class="py-8 bg-white border-y border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-4 mb-4">
          <span class="text-xs font-black text-slate-400 uppercase tracking-wider">
            {{ isRTL ? 'تصفح حسب العلامة التجارية' : 'Explore By Official Brands' }}
          </span>
          <NuxtLink to="/cars" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <span>{{ isRTL ? 'عرض جميع الموديلات' : 'View All Models' }}</span>
            <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <NuxtLink
            v-for="brand in brandList"
            :key="brand.name"
            :to="`/cars?brand=${encodeURIComponent(brand.name)}`"
            class="px-5 py-3 rounded-2xl bg-slate-50 hover:bg-primary/5 hover:border-primary/30 border border-slate-200/90 text-slate-800 hover:text-primary font-black text-sm transition-all duration-200 shrink-0 flex items-center gap-2.5 shadow-2xs group"
          >
            <div class="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"></div>
            <span>{{ brand.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured New Arrivals Section -->
    <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1.5">
            <Sparkles class="w-4 h-4" />
            <span>{{ isRTL ? 'أحدث السيارات' : 'Latest Arrivals' }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {{ isRTL ? 'السيارات الجديدة (0 كم)' : 'Brand New Vehicles' }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            {{ isRTL ? 'تشكيلة مميزة من سيارات 2026 و2025 مع كفالات المصنع والوكيل' : 'Handpicked 2026 & 2025 inventory with certified factory warranty' }}
          </p>
        </div>

        <NuxtLink
          to="/cars?condition=new"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0"
        >
          <span>{{ isRTL ? 'مشاهدة المزيد' : 'See all new cars' }}</span>
          <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
        </NuxtLink>
      </div>

      <!-- Cars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <CarCard
          v-for="car in featuredNewCars"
          :key="car.id"
          :car="car"
        />
      </div>
    </section>

    <!-- 3D VR Showroom Interactive Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-primary text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
        <div class="relative z-10 max-w-2xl space-y-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
            <Glasses class="w-4 h-4" />
            <span>{{ isRTL ? 'تجربة تفاعلية ثلاثية الأبعاد' : '3D Virtual Showroom' }}</span>
          </div>

          <h3 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {{ isRTL ? 'تجول في معرض AKM الافتراضي وأنت في منزلك' : 'Walk Through the AKM Showroom Virtually' }}
          </h3>

          <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {{ isRTL
              ? 'استكشف سياراتنا بأبعاد 360 درجة، وتفقد مقصورة القيادة وأدق التفاصيل من هاتفك أو حاسوبك قبل زيارة المعرض.'
              : 'Explore the full showroom inventory with high-definition 360° virtual tours and inspect vehicle interiors before your test drive.'
            }}
          </p>

          <div class="pt-2 flex flex-wrap gap-4">
            <NuxtLink
              to="/showroom"
              class="px-6 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-slate-950 font-black text-sm shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>{{ isRTL ? 'دخول المعرض الافتراضي الآن' : 'Launch Virtual Tour' }}</span>
              <ChevronRight class="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </NuxtLink>

            <a
              :href="`https://wa.me/${cleanWhatsAppNumber}`"
              target="_blank"
              class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <MessageCircle class="w-4 h-4 text-emerald-400" />
              <span>{{ isRTL ? 'تواصل مع مستشار المبيعات' : 'Contact Sales Consultant' }}</span>
            </a>
          </div>
        </div>

        <!-- Decorative background glow -->
        <div class="absolute -end-24 -bottom-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>

    <!-- Popular Pre-Owned / Tested Cars Section -->
    <section class="py-16 bg-slate-100/60 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1.5">
              <ShieldCheck class="w-4 h-4" />
              <span>{{ isRTL ? 'فحص كامل وضمان معتمد' : '100% Inspected & Certified' }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {{ isRTL ? 'سيارات مستعملة مفحوصة ومضمونة' : 'Certified Pre-Owned Inventory' }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              {{ isRTL ? 'سيارات خضعت لأدق فحوصات السلامة والأداء مع تقارير شاملة' : 'Meticulously inspected vehicles with verified history and condition reports' }}
            </p>
          </div>

          <NuxtLink
            to="/cars?condition=used"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0 shadow-2xs"
          >
            <span>{{ isRTL ? 'مشاهدة المزيد' : 'See all pre-owned' }}</span>
            <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
          </NuxtLink>
        </div>

        <!-- Cars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <CarCard
            v-for="car in popularUsedCars"
            :key="car.id"
            :car="car"
          />
        </div>
      </div>
    </section>

    <!-- About Section with 4 Pillars -->
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import {
  Sparkles,
  ChevronRight,
  Glasses,
  MessageCircle,
  ShieldCheck
} from 'lucide-vue-next'

const { isRTL } = useI18n()
const { cars, brands, cleanWhatsAppNumber } = useSiteData()

// SEO Meta
useSeoMeta({
  title: 'AKM Motor City | مدينة الخياط للسيارات - New & Used Cars in Jordan',
  description: 'Buy new and used cars in Jordan. Browse by brand, model, and year at competitive prices with certified warranty and instant booking.'
})

const brandList = computed(() => {
  return brands.value.map(name => ({ name }))
})

const featuredNewCars = computed(() => {
  const newCars = cars.value.filter(c => !c.is_used)
  return newCars.slice(0, 6)
})

const popularUsedCars = computed(() => {
  const usedCars = cars.value.filter(c => c.is_used)
  return usedCars.slice(0, 6)
})
</script>
