<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    @click.self="isModalOpen = false"
  >
    <div class="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ArrowLeftRight class="w-6 h-6 text-primary" />
            <span>{{ isRTL ? 'مقارنة مواصفات السيارات' : 'Vehicle Specification Comparison' }}</span>
          </h2>
          <p class="text-xs text-slate-500 mt-1">
            {{ isRTL ? 'مقارنة تفصيلية جنباً إلى جنب لاختيار السيارة الأنسب لاحتياجاتك وميزانيتك' : 'Side-by-side spec comparison to help you choose the ideal vehicle' }}
          </p>
        </div>

        <button
          @click="isModalOpen = false"
          class="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close comparison modal"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Comparison Table Area -->
      <div class="overflow-x-auto p-5 sm:p-6 flex-1">
        <table class="w-full text-start border-collapse">
          <thead>
            <tr>
              <th class="p-3 text-xs font-bold text-slate-400 uppercase w-36 bg-slate-50/50 rounded-lg">
                {{ isRTL ? 'المواصفة' : 'Feature' }}
              </th>
              <th
                v-for="car in comparedCars"
                :key="car.id"
                class="p-4 text-center align-top min-w-[220px]"
              >
                <div class="space-y-3">
                  <img
                    :src="car.images?.[0]?.url"
                    :alt="car.name_api"
                    class="w-full aspect-16/10 object-cover rounded-xl bg-slate-100 shadow-sm"
                  />
                  <h3 class="font-extrabold text-slate-900 text-sm line-clamp-2">
                    {{ isRTL && car.name_ar ? car.name_ar : car.name_api }}
                  </h3>
                  <div class="text-lg font-black text-primary">
                    {{ formatPrice(car.price) }}
                  </div>
                  <div class="flex items-center justify-center gap-2">
                    <NuxtLink
                      :to="`/cars/${car.id}`"
                      @click="isModalOpen = false"
                      class="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-xs"
                    >
                      {{ isRTL ? 'عرض السيارة' : 'View Car' }}
                    </NuxtLink>
                    <button
                      @click="removeFromCompare(car.id)"
                      class="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                      title="Remove"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-sm">
            <!-- Row: Condition -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ isRTL ? 'الحالة' : 'Condition' }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-bold">
                <span
                  class="px-2.5 py-1 rounded-md text-xs"
                  :class="car.is_used ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'"
                >
                  {{ car.is_used ? (isRTL ? 'مستعمل ومفحوص' : 'Pre-Owned') : (isRTL ? 'جديد 0 كم' : 'Brand New') }}
                </span>
              </td>
            </tr>

            <!-- Row: Brand -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_brands', 'Brand') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Brand') }}
              </td>
            </tr>

            <!-- Row: Body Shape -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_bodies', 'Body Shape') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Body') }}
              </td>
            </tr>

            <!-- Row: Engine Type -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_engine_types', 'Engine Type') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Engine Type') }}
              </td>
            </tr>

            <!-- Row: Transmission -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_transmissions', 'Transmission') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Transmission') }}
              </td>
            </tr>

            <!-- Row: Drive Type -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_drive_types', 'Drive Type') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Drive Type') }}
              </td>
            </tr>

            <!-- Row: Wheel Type -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ t('website_cars_by_wheel_types', 'Wheel Type') }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getAttribute(car, 'Wheel Type') }}
              </td>
            </tr>

            <!-- Row: Model Year -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ isRTL ? 'سنة الصنع' : 'Model Year' }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getExtraAttribute(car, 'Model Year') || '—' }}
              </td>
            </tr>

            <!-- Row: Horsepower / Performance -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ isRTL ? 'القوة والأداء' : 'Performance' }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getExtraAttribute(car, 'Performance') || '—' }}
              </td>
            </tr>

            <!-- Row: Upholstery Material -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ isRTL ? 'الفرش الداخلي' : 'Upholstery' }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center font-semibold text-slate-800">
                {{ getExtraAttribute(car, 'Upholstery Material') || '—' }}
              </td>
            </tr>

            <!-- Row: Features Count -->
            <tr class="hover:bg-slate-50/60">
              <td class="p-3 font-bold text-slate-500 text-xs">
                {{ isRTL ? 'الميزات الإضافية' : 'Key Features' }}
              </td>
              <td v-for="car in comparedCars" :key="car.id" class="p-3 text-center text-xs text-slate-600">
                <span class="font-bold text-slate-900">{{ car.features?.length || 0 }}</span>
                {{ isRTL ? 'ميزة متوفرة' : 'features included' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer CTA -->
      <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>{{ isRTL ? 'يمكن حجز أي سيارة أونلاين بدفعة أولى 100 دينار أردني فقط' : 'Any vehicle can be reserved online with an initial 100 JOD deposit' }}</span>
        <button
          @click="isModalOpen = false"
          class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          {{ isRTL ? 'إغلاق' : 'Close' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  ArrowLeftRight,
  Trash2
} from 'lucide-vue-next'

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { compareList, removeFromCompare, isModalOpen } = useCompare()
const { cars } = useSiteData()

const comparedCars = computed(() => {
  return cars.value.filter(c => compareList.value.includes(c.id))
})

const getAttribute = (car: any, name: string) => {
  return car.attributes?.find((a: any) => a.name === name)?.value || '—'
}

const getExtraAttribute = (car: any, name: string) => {
  return car.extra_attributes?.find((a: any) => a.name === name)?.value || '—'
}
</script>
