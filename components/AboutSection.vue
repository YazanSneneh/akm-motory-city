<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-black text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
          {{ isRTL ? 'لماذا تختار AKM؟' : 'Why Choose AKM Motor City?' }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {{ isRTL ? 'إرث عريق من الثقة والتميز في عالم السيارات' : 'A Legacy of Trust, Quality, & Automotive Excellence' }}
        </h2>
        <p class="mt-4 text-base text-slate-600 leading-relaxed">
          {{ isRTL
            ? 'منذ عام 1996، نلتزم في مدينة الخياط للسيارات بتقديم أرقى مستويات الخدمة والشفافية لعملائنا في المملكة الأردنية الهاشمية.'
            : 'Since 1996, AKM Motor City has set the benchmark for automotive reliability, customer care, and multi-brand excellence in Jordan.'
          }}
        </p>
      </div>

      <!-- 4 Core Pillars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="item in items"
          :key="item.id"
          class="group bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-sm mb-5 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
              <img :src="item.image_api" :alt="item.title" class="w-full h-full object-contain" />
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-2">
              {{ isRTL && item.title_ar ? item.title_ar : item.title }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {{ isRTL && item.description_ar ? item.description_ar : item.description }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all">
            <span>{{ isRTL ? 'معرفة المزيد' : 'Learn more' }}</span>
            <ChevronRight class="w-3.5 h-3.5 rtl:rotate-180" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const { isRTL } = useI18n()
const { settings } = useSiteData()

const items = computed(() => {
  return settings.value?.home_page?.about_us?.items || []
})
</script>
