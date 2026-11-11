<template>
  <div v-if="car" class="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Breadcrumb & Share Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 truncate">
        <NuxtLink to="/" class="hover:text-primary transition-colors">
          {{ t('website_car_details_home', 'Home') }}
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/cars" class="hover:text-primary transition-colors">
          {{ t('website_car_details_the_cars', 'Models') }}
        </NuxtLink>
        <span>/</span>
        <span class="text-slate-900 font-bold truncate">
          {{ carTitle }}
        </span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <!-- Share button -->
        <button
          @click="shareCar"
          class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          :title="isRTL ? 'مشاركة رابط السيارة' : 'Share link'"
        >
          <Share2 class="w-3.5 h-3.5 text-primary" />
          <span class="hidden sm:inline">{{ isRTL ? 'مشاركة' : 'Share' }}</span>
        </button>

        <!-- Compare button -->
        <button
          @click="toggleCompare(car.id)"
          class="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors"
          :class="isComparing(car.id) ? 'bg-primary text-white border-primary' : 'border-slate-200 text-slate-700 hover:bg-slate-50'"
        >
          <ArrowLeftRight class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">{{ isComparing(car.id) ? (isRTL ? 'في المقارنة' : 'In Compare') : (isRTL ? 'مقارنة' : 'Compare') }}</span>
        </button>

        <!-- Favorite button -->
        <button
          @click="toggleFavorite(car.id)"
          class="p-2 rounded-xl border border-slate-200 text-slate-700 hover:text-rose-500 hover:bg-slate-50 transition-colors"
          :class="isFavorite(car.id) ? 'text-rose-500 bg-rose-50 border-rose-200' : ''"
        >
          <Heart class="w-4 h-4" :class="isFavorite(car.id) ? 'fill-rose-500' : ''" />
        </button>
      </div>
    </div>

    <!-- Main Two-Column Presentation (Media & Booking Sidebar) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
      <!-- Media Showcase Column (7 cols) -->
      <div class="lg:col-span-7">
        <CarGallery
          :images="car.images || []"
          :threesixtyFrames="car.threesixty || []"
          :title="carTitle"
        />
      </div>

      <!-- Overview & Booking Card Column (5 cols) -->
      <div class="lg:col-span-5">
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card sticky top-28 space-y-6">
          <!-- Badges & Brand -->
          <div class="flex items-center justify-between">
            <span
              class="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider"
              :class="car.is_used ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-600 text-white'"
            >
              {{ car.is_used ? (isRTL ? 'مستعمل ومفحوص' : 'Certified Pre-Owned') : (isRTL ? 'سيارة جديدة 0 كم' : 'Brand New (0 KM)') }}
            </span>

            <span v-if="modelYear" class="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              {{ isRTL ? `موديل ${modelYear}` : `Model Year ${modelYear}` }}
            </span>
          </div>

          <!-- Title -->
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ brandName }}</div>
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {{ carTitle }}
            </h1>
          </div>

          <!-- Pricing Section -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <div class="text-xs font-medium text-slate-500">
              {{ t('website_car_details_car_price', 'Vehicle Cash Price') }}
            </div>
            <div class="text-3xl font-black text-primary tracking-tight">
              <span v-if="car.show_price && car.price">{{ formatPrice(car.price) }}</span>
              <span v-else class="text-xl text-slate-700">{{ t('website_car_price_on_request', 'Price on Request') }}</span>
            </div>
            <div class="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{{ isRTL ? 'يشمل فحص المعرض الشامل وضمان AKM المعتمد' : 'Includes multi-point vehicle inspection & AKM warranty' }}</span>
            </div>
          </div>

          <!-- Stock & Reservation Status -->
          <div v-if="car.is_full" class="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle class="w-4 h-4 shrink-0" />
            <span>{{ isRTL ? 'هذه السيارة محجوزة بالكامل حالياً. تواصل معنا لمعرفة موعد توفر دفعة جديدة.' : 'This vehicle is currently fully booked. Contact us for incoming batches.' }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3 pt-2">
            <!-- Book Now Button -->
            <button
              @click="isBookingOpen = true"
              :disabled="car.is_full"
              class="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm sm:text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <CreditCard class="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{{ isRTL ? 'احجز الآن أونلاين (دفعة 100 دينار فقط)' : 'Book Online (100 JOD Deposit Only)' }}</span>
            </button>

            <!-- WhatsApp Inquire Button -->
            <a
              :href="whatsappInquiryUrl"
              target="_blank"
              class="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle class="w-5 h-5" />
              <span>{{ t('website_car_whatsapp_inquire', 'Inquire via WhatsApp') }}</span>
            </a>
          </div>

          <!-- Micro Terms Assurance -->
          <p class="text-[11px] text-slate-400 text-center leading-relaxed">
            {{ isRTL
              ? 'مبلغ الـ 100 دينار يُعد دفعة حجز أولية تُخصم من السعر النهائي للسيارة عند إتمام الشراء.'
              : 'The 100 JOD reservation fee is deducted from the final purchase price upon closing.'
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Description & Comprehensive Specifications Tabs -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
      <div class="lg:col-span-8 space-y-10">
        <!-- Vehicle Description -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText class="w-5 h-5 text-primary" />
            <span>{{ t('website_car_details_description', 'Vehicle Overview & Description') }}</span>
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
            {{ isRTL && car.description_ar ? car.description_ar : car.description_api }}
          </p>
        </div>

        <!-- Specifications Matrix Grid -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <SlidersHorizontal class="w-5 h-5 text-primary" />
            <span>{{ t('website_car_details_car_specifications', 'Technical Specifications') }}</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Brand -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ t('website_car_details_brand', 'Brand') }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ brandName }}</span>
            </div>

            <!-- Model Year -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'سنة الصنع' : 'Model Year' }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ modelYear || '—' }}</span>
            </div>

            <!-- Body Shape -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ t('website_car_details_body', 'Body Shape') }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getAttr('Body') }}</span>
            </div>

            <!-- Engine Type -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ t('website_car_details_engine_type', 'Engine Type') }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getAttr('Engine Type') }}</span>
            </div>

            <!-- Transmission -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'ناقل الحركة' : 'Transmission' }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getAttr('Transmission') }}</span>
            </div>

            <!-- Drive Type -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'نظام الدفع' : 'Drive Type' }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getAttr('Drive Type') }}</span>
            </div>

            <!-- Wheel Type -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ t('website_car_details_wheel_type', 'Wheel Type') }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getAttr('Wheel Type') }}</span>
            </div>

            <!-- Performance / Horsepower -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'القوة والأداء' : 'Horsepower / Performance' }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getExtraAttr('Performance') || '—' }}</span>
            </div>

            <!-- Upholstery -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'فرش المقاعد' : 'Upholstery Material' }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-800">{{ getExtraAttr('Upholstery Material') || '—' }}</span>
            </div>

            <!-- Exterior Color -->
            <div class="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'اللون الخارجي' : 'Exterior Color' }}</span>
              <div class="flex items-center gap-2">
                <span
                  v-if="getExtraAttr('Exterior Color')?.startsWith('#')"
                  class="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                  :style="{ backgroundColor: getExtraAttr('Exterior Color') }"
                />
                <span class="text-xs sm:text-sm font-black text-slate-800">{{ getExtraAttr('Exterior Color') || '—' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Checklist -->
        <div v-if="car.features && car.features.length > 0" class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <h2 class="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 class="w-5 h-5 text-emerald-600" />
            <span>{{ t('website_car_details_features', 'Included Features & Equipment') }} ({{ car.features.length }})</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="f in car.features"
              :key="f.id"
              class="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700"
            >
              <Check class="w-4 h-4 text-emerald-600 shrink-0" />
              <span class="truncate">{{ isRTL && f.name_ar ? f.name_ar : f.name_api }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Dealership Assurance & Quick Support -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Warranty & Bayader Service Box -->
        <div class="bg-gradient-to-br from-primary to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <ShieldCheck class="w-6 h-6 text-sky-300" />
          </div>
          <h3 class="text-lg font-black tracking-tight">
            {{ isRTL ? 'كفالة معتمدة ومركز خدمة البيادر' : 'AKM Certified Warranty & Service' }}
          </h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            {{ isRTL
              ? 'تخضع جميع سياراتنا لبرنامج الضمان المعتمد مع خدمة الصيانة وتوفير قطع الغيار الأصلية في مركز خدمة البيادر.'
              : 'All vehicles come with verified warranty coverage and post-sale support backed by our official Bayader service center.'
            }}
          </p>
          <div class="pt-2 text-xs text-sky-200 font-bold flex items-center gap-1.5">
            <Phone class="w-4 h-4" />
            <a :href="`tel:${dealershipSettings.phone}`" class="hover:underline">
              {{ dealershipSettings.phone }}
            </a>
          </div>
        </div>

        <!-- Visit Showroom Box -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
            <MapPin class="w-4 h-4 text-primary" />
            <span>{{ isRTL ? 'موقع المعرض والمشاهدة الحية' : 'Showroom Inspection' }}</span>
          </h4>
          <p class="text-xs text-slate-600 leading-relaxed">
            {{ isRTL
              ? 'تفضل بزيارة معرضنا في منطقة البيادر - عمّان لمعاينة السيارة وتجربة قيادتها.'
              : 'Visit our flagship showroom in Bayader - Amman to inspect the vehicle and book a test drive.'
            }}
          </p>
          <a
            href="https://maps.google.com/?q=AKM+Motor+City+Amman"
            target="_blank"
            class="inline-block text-xs font-bold text-primary hover:underline"
          >
            {{ isRTL ? 'الاتجاهات عبر خرائط Google' : 'Open in Google Maps' }} &rarr;
          </a>
        </div>
      </div>
    </div>

    <!-- Related Vehicles Section -->
    <div v-if="relatedCars.length > 0" class="pt-8 border-t border-slate-200">
      <div class="mb-8">
        <h3 class="text-2xl font-black text-slate-900 tracking-tight">
          {{ t('website_car_details_vehicles_for_you', 'Related Vehicles You May Like') }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          {{ isRTL ? 'خيارات مماثلة من نفس الفئة والعلامة التجارية' : 'Alternative options with similar attributes and price points' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarCard
          v-for="rc in relatedCars"
          :key="rc.id"
          :car="rc"
        />
      </div>
    </div>

    <!-- Booking Modal -->
    <BookingModal
      :car="car"
      :isOpen="isBookingOpen"
      @close="isBookingOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Share2,
  Heart,
  ArrowLeftRight,
  ShieldCheck,
  AlertCircle,
  CreditCard,
  MessageCircle,
  FileText,
  SlidersHorizontal,
  CheckCircle2,
  Check,
  Phone,
  MapPin
} from 'lucide-vue-next'

const route = useRoute()
const carId = parseInt(route.params.id as string || '0')

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { isFavorite, toggleFavorite } = useFavorites()
const { isComparing, toggleCompare } = useCompare()
const { cars, findCar, dealershipSettings, cleanWhatsAppNumber } = useSiteData()

const isBookingOpen = ref(false)

const car = computed(() => {
  return findCar(carId)
})

const carTitle = computed(() => {
  if (isRTL.value && car.value?.name_ar) return car.value.name_ar
  return car.value?.name_api || 'Car'
})

const brandName = computed(() => {
  return car.value?.attributes?.find((a: any) => a.name === 'Brand')?.value || 'AKM'
})

const modelYear = computed(() => {
  return car.value?.extra_attributes?.find((a: any) => a.name === 'Model Year')?.value
})

const getAttr = (name: string) => {
  return car.value?.attributes?.find((a: any) => a.name === name)?.value || '—'
}

const getExtraAttr = (name: string) => {
  return car.value?.extra_attributes?.find((a: any) => a.name === name)?.value || '—'
}

const relatedCars = computed(() => {
  const currentBrand = brandName.value
  const currentBody = getAttr('Body')
  return cars.value
    .filter(c => c.id !== carId && (
      c.attributes?.find((a: any) => a.name === 'Brand')?.value === currentBrand ||
      c.attributes?.find((a: any) => a.name === 'Body')?.value === currentBody
    ))
    .slice(0, 4)
})

const whatsappInquiryUrl = computed(() => {
  const text = encodeURIComponent(
    `Hello AKM Motor City, I am interested in ${carTitle.value} (ID: ${carId}). Please provide more details and availability.`
  )
  return `https://wa.me/${cleanWhatsAppNumber.value}?text=${text}`
})

const shareCar = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
    alert(isRTL.value ? 'تم نسخ رابط السيارة إلى الحافظة!' : 'Car link copied to clipboard!')
  }
}

useSeoMeta({
  title: computed(() => `${carTitle.value} | AKM Motor City Jordan`),
  description: computed(() => car.value?.description_api || 'AKM Motor City vehicle')
})
</script>
