<template>
  <div class="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10 text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
        <Scale class="w-4 h-4" />
        <span>{{ isRTL ? 'الوثائق القانونية وسياسات المعرض' : 'Legal & Reservation Policies' }}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        {{ t('website_terms_conditions', 'Terms & Conditions') }}
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
        {{ isRTL
          ? 'الشروط والأحكام الخاصة بخدمة الحجز الإلكتروني وشراء السيارات لدى شركة مدينة الخياط للسيارات (AKM Motor City)'
          : 'Terms and conditions governing the online booking and reservation services of AKM Motor City'
        }}
      </p>
    </div>

    <!-- Terms Content Container -->
    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
      <div class="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {{ termsText }}
      </div>

      <!-- Quick Summary Box -->
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldAlert class="w-4 h-4 text-primary" />
          <span>{{ isRTL ? 'ملخص نقاط الحجز الهامة:' : 'Key Booking Policy Highlights:' }}</span>
        </h3>
        <ul class="text-xs text-slate-600 space-y-2 list-disc ps-5">
          <li>{{ isRTL ? 'رسوم الحجز الثابتة هي 100 دينار أردني فقط.' : 'A fixed deposit of 100 JOD is required for online reservation.' }}</li>
          <li>{{ isRTL ? 'يتم خصم مبلغ الـ 100 دينار بالكامل من السعر النهائي للسيارة عند إتمام الشراء.' : 'The 100 JOD fee is fully deducted from the final purchase price.' }}</li>
          <li>{{ isRTL ? 'تخضع الشروط والأحكام لقوانين المملكة الأردنية الهاشمية.' : 'Governed under the laws of the Hashemite Kingdom of Jordan.' }}</li>
        </ul>
      </div>

      <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>{{ isRTL ? `لأية استفسارات قانونية، يرجى التواصل مع مركز الاتصال: ${dealershipSettings.phone}` : `For inquiries regarding terms, contact: ${dealershipSettings.phone}` }}</div>
        <NuxtLink to="/cars" class="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors">
          {{ isRTL ? 'العودة لمعرض السيارات' : 'Return to Inventory' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Scale, ShieldAlert } from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const { terms, dealershipSettings } = useSiteData()

useSeoMeta({
  title: 'Terms & Conditions | AKM Motor City - الشروط والأحكام',
  description: 'Legal terms and conditions for vehicle reservation and sales at AKM Motor City Jordan.'
})

const termsText = computed(() => {
  const paragraph = terms.value?.[0]
  if (!paragraph) return ''
  return isRTL.value ? (paragraph.description_ar || paragraph.description) : paragraph.description
})
</script>
