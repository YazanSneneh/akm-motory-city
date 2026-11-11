<template>
  <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Breadcrumb & Catalog Title -->
    <div class="mb-8">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <NuxtLink to="/" class="hover:text-primary transition-colors">
          {{ t('website_cars_hero_home', 'Home') }}
        </NuxtLink>
        <span>/</span>
        <span class="text-slate-900 font-bold">
          {{ t('website_cars_hero_the_cars', 'Models') }}
        </span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">
            {{ isRTL ? 'معرض السيارات والموديلات' : 'Vehicle Inventory' }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">
            {{ isRTL ? `عرض ${filteredCars.length} من أصل ${totalCars} سيارة متوفرة` : `Showing ${filteredCars.length} of ${totalCars} vehicles` }}
          </p>
        </div>

        <!-- Sort by & Mobile Filter Trigger -->
        <div class="flex items-center gap-3">
          <!-- Mobile Filters Drawer Toggle Button -->
          <button
            @click="isMobileFilterOpen = true"
            class="lg:hidden px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs"
          >
            <SlidersHorizontal class="w-4 h-4 text-primary" />
            <span>{{ t('website_cars_filters', 'Filters') }}</span>
            <span
              v-if="activeFilterCount > 0"
              class="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center"
            >
              {{ activeFilterCount }}
            </span>
          </button>

          <!-- Sort Select -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-semibold hidden sm:inline">
              {{ t('website_cars_sort_by', 'Sort by') }}:
            </span>
            <select
              v-model="sortOrder"
              class="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary shadow-2xs"
            >
              <option value="">{{ isRTL ? 'الافتراضي' : 'Featured' }}</option>
              <option value="price_asc">{{ t('website_cars_price_low_high', 'Price: Low to High') }}</option>
              <option value="price_desc">{{ t('website_cars_price_high_low', 'Price: High to Low') }}</option>
              <option value="views">{{ isRTL ? 'الأكثر مشاهدة' : 'Most Popular' }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Active Filter Chips -->
      <div v-if="activeFilterCount > 0" class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-200/80">
        <span class="text-xs font-bold text-slate-500">
          {{ t('website_cars_active_filters', 'Active Filters:') }}
        </span>

        <span
          v-if="query"
          @click="query = ''"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>"{{ query }}"</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <span
          v-if="condition"
          @click="condition = ''"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>{{ condition === 'new' ? (isRTL ? 'جديد' : 'New') : (isRTL ? 'مستعمل' : 'Used') }}</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <span
          v-if="brand"
          @click="brand = ''"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>{{ brand }}</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <span
          v-if="body"
          @click="body = ''"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>{{ body }}</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <span
          v-if="engineType"
          @click="engineType = ''"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>{{ engineType }}</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <span
          v-if="maxPrice < 150000"
          @click="maxPrice = 150000"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <span>&le; {{ maxPrice }} JOD</span>
          <X class="w-3.5 h-3.5" />
        </span>

        <button
          @click="clearAllFilters"
          class="text-xs font-bold text-rose-600 hover:underline ms-2"
        >
          {{ t('website_cars_clear_all', 'Clear All') }}
        </button>
      </div>
    </div>

    <!-- Main Content Layout (Sidebar + Grid) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Desktop Filters Sidebar -->
      <aside class="hidden lg:block lg:col-span-1">
        <div class="sticky top-28">
          <FilterDrawer
            v-model:query="query"
            v-model:condition="condition"
            v-model:brand="brand"
            v-model:body="body"
            v-model:engineType="engineType"
            v-model:transmission="transmission"
            v-model:maxPrice="maxPrice"
            @clear="clearAllFilters"
          />
        </div>
      </aside>

      <!-- Cars Catalog Grid Area -->
      <div class="lg:col-span-3">
        <!-- Empty State -->
        <div
          v-if="paginatedCars.length === 0"
          class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4"
        >
          <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <CarFront class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-black text-slate-900">
            {{ t('website_cars_no_cars_found', 'No Cars Found') }}
          </h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            {{ t('website_cars_try_adjusting', 'Try adjusting your filters or search query.') }}
          </p>
          <button
            @click="clearAllFilters"
            class="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-dark transition-colors inline-block"
          >
            {{ t('website_cars_clear_all', 'Reset All Filters') }}
          </button>
        </div>

        <!-- Cards Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CarCard
            v-for="car in paginatedCars"
            :key="car.id"
            :car="car"
          />
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1"
          class="mt-12 flex items-center justify-center gap-2"
        >
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft class="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            v-for="p in totalPages"
            :key="p"
            @click="currentPage = p"
            class="w-10 h-10 rounded-xl font-bold text-xs transition-all"
            :class="currentPage === p ? 'bg-primary text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
          >
            {{ p }}
          </button>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight class="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Slide-over Modal -->
    <div
      v-if="isMobileFilterOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-end"
      @click.self="isMobileFilterOpen = false"
    >
      <div class="relative w-full max-w-sm bg-white min-h-screen p-5 flex flex-col justify-between shadow-2xl">
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 class="text-lg font-black text-slate-900">
              {{ t('website_cars_filters', 'Filter Options') }}
            </h3>
            <button
              @click="isMobileFilterOpen = false"
              class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <FilterDrawer
            v-model:query="query"
            v-model:condition="condition"
            v-model:brand="brand"
            v-model:body="body"
            v-model:engineType="engineType"
            v-model:transmission="transmission"
            v-model:maxPrice="maxPrice"
            @clear="clearAllFilters"
          />
        </div>

        <div class="pt-4 border-t border-slate-200">
          <button
            @click="isMobileFilterOpen = false"
            class="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md"
          >
            {{ t('website_cars_apply_filters', 'Apply Filters') }} ({{ filteredCars.length }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  CarFront
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { isRTL, t } = useI18n()
const { cars } = useSiteData()

useSeoMeta({
  title: 'All Models & Cars | AKM Motor City - المعرض الكامل للسيارات',
  description: 'Explore the full inventory of certified new and used cars at AKM Motor City. Filter by brand, shape, engine, and price.'
})

const query = ref((route.query.q as string) || '')
const condition = ref((route.query.condition as string) || '')
const brand = ref((route.query.brand as string) || '')
const body = ref((route.query.body as string) || '')
const engineType = ref((route.query.engineType as string) || '')
const transmission = ref((route.query.transmission as string) || '')
const maxPrice = ref(150000)
const sortOrder = ref((route.query.sort as string) || '')

const isMobileFilterOpen = ref(false)
const currentPage = ref(1)
const itemsPerPage = 9

const totalCars = computed(() => cars.value.length)

// Sync filters with URL query parameters
watch([query, condition, brand, body, engineType, transmission, sortOrder], () => {
  currentPage.value = 1
  const q: Record<string, string> = {}
  if (query.value) q.q = query.value
  if (condition.value) q.condition = condition.value
  if (brand.value) q.brand = brand.value
  if (body.value) q.body = body.value
  if (engineType.value) q.engineType = engineType.value
  if (transmission.value) q.transmission = transmission.value
  if (sortOrder.value) q.sort = sortOrder.value
  router.replace({ query: q })
})

const activeFilterCount = computed(() => {
  let count = 0
  if (query.value) count++
  if (condition.value) count++
  if (brand.value) count++
  if (body.value) count++
  if (engineType.value) count++
  if (transmission.value) count++
  if (maxPrice.value < 150000) count++
  return count
})

const clearAllFilters = () => {
  query.value = ''
  condition.value = ''
  brand.value = ''
  body.value = ''
  engineType.value = ''
  transmission.value = ''
  maxPrice.value = 150000
  sortOrder.value = ''
  currentPage.value = 1
}

const filteredCars = computed(() => {
  let list = [...cars.value]

  if (query.value.trim()) {
    const q = query.value.toLowerCase().trim()
    list = list.filter(car => {
      const nameEn = (car.name_api || '').toLowerCase()
      const nameAr = (car.name_ar || '').toLowerCase()
      const brandVal = car.attributes?.find((a: any) => a.name === 'Brand')?.value?.toLowerCase() || ''
      const bodyVal = car.attributes?.find((a: any) => a.name === 'Body')?.value?.toLowerCase() || ''
      return nameEn.includes(q) || nameAr.includes(q) || brandVal.includes(q) || bodyVal.includes(q)
    })
  }

  if (condition.value) {
    if (condition.value === 'new') {
      list = list.filter(c => !c.is_used)
    } else if (condition.value === 'used') {
      list = list.filter(c => c.is_used)
    }
  }

  if (brand.value) {
    list = list.filter(c => {
      const b = c.attributes?.find((a: any) => a.name === 'Brand')?.value
      return b && b.toLowerCase() === brand.value.toLowerCase()
    })
  }

  if (body.value) {
    list = list.filter(c => {
      const b = c.attributes?.find((a: any) => a.name === 'Body')?.value
      return b && b.toLowerCase() === body.value.toLowerCase()
    })
  }

  if (engineType.value) {
    list = list.filter(c => {
      const e = c.attributes?.find((a: any) => a.name === 'Engine Type')?.value
      return e && e.toLowerCase() === engineType.value.toLowerCase()
    })
  }

  if (transmission.value) {
    list = list.filter(c => {
      const t = c.attributes?.find((a: any) => a.name === 'Transmission')?.value
      return t && t.toLowerCase() === transmission.value.toLowerCase()
    })
  }

  if (maxPrice.value < 150000) {
    list = list.filter(c => {
      const p = parseFloat(c.price || '0')
      return p <= maxPrice.value
    })
  }

  if (sortOrder.value === 'price_asc') {
    list.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'))
  } else if (sortOrder.value === 'price_desc') {
    list.sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'))
  } else if (sortOrder.value === 'views') {
    list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
  }

  return list
})

const totalPages = computed(() => Math.ceil(filteredCars.value.length / itemsPerPage))

const paginatedCars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredCars.value.slice(start, start + itemsPerPage)
})
</script>
