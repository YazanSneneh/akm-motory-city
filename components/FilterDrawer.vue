<template>
  <div class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6">
    <!-- Header with Clear All button -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <SlidersHorizontal class="w-4 h-4 text-primary" />
        <h3 class="font-extrabold text-slate-900 text-base">
          {{ t('website_cars_filters', 'Filters') }}
        </h3>
      </div>
      <button
        v-if="hasActiveFilters"
        @click="clearAll"
        class="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors"
      >
        {{ t('website_cars_clear_all', 'Clear All') }}
      </button>
    </div>

    <!-- Keyword Search Input -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ isRTL ? 'البحث السريع' : 'Search' }}
      </label>
      <div class="relative">
        <input
          v-model="modelQuery"
          type="text"
          :placeholder="t('website_cars_search_placeholder', 'Search by make, model, or keyword')"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-primary focus:bg-white transition-all"
        />
        <Search class="w-4 h-4 text-slate-400 absolute start-3 top-3" />
        <button
          v-if="modelQuery"
          @click="modelQuery = ''"
          class="absolute end-3 top-2.5 text-slate-400 hover:text-slate-600"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Condition Segment (All, New, Used) -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ isRTL ? 'حالة السيارة' : 'Vehicle Condition' }}
      </label>
      <div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
        <button
          @click="modelCondition = ''"
          class="py-2 text-xs font-bold rounded-lg transition-all"
          :class="!modelCondition ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ isRTL ? 'الكل' : 'All' }}
        </button>
        <button
          @click="modelCondition = 'new'"
          class="py-2 text-xs font-bold rounded-lg transition-all"
          :class="modelCondition === 'new' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ isRTL ? 'جديد' : 'New' }}
        </button>
        <button
          @click="modelCondition = 'used'"
          class="py-2 text-xs font-bold rounded-lg transition-all"
          :class="modelCondition === 'used' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'"
        >
          {{ isRTL ? 'مستعمل' : 'Used' }}
        </button>
      </div>
    </div>

    <!-- Brand Filter -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ t('website_cars_by_brands', 'Brand') }}
      </label>
      <div class="space-y-1 max-h-48 overflow-y-auto pe-1">
        <button
          v-for="b in brands"
          :key="b"
          @click="toggleBrand(b)"
          class="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          :class="modelBrand === b ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'"
        >
          <span>{{ b }}</span>
          <Check v-if="modelBrand === b" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Body Shape Filter -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ t('website_cars_by_bodies', 'Body Shape') }}
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="b in bodies"
          :key="b"
          @click="toggleBody(b)"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="modelBody === b ? 'bg-primary text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        >
          {{ b }}
        </button>
      </div>
    </div>

    <!-- Engine Type Filter -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ t('website_cars_by_engine_types', 'Engine Type') }}
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="e in engineTypes"
          :key="e"
          @click="toggleEngineType(e)"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="modelEngineType === e ? 'bg-primary text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        >
          {{ e }}
        </button>
      </div>
    </div>

    <!-- Transmission Filter -->
    <div>
      <label class="block text-xs font-bold text-slate-700 mb-2">
        {{ t('website_cars_by_transmissions', 'Transmission') }}
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="t in transmissions"
          :key="t"
          @click="toggleTransmission(t)"
          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="modelTransmission === t ? 'bg-primary text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        >
          {{ t }}
        </button>
      </div>
    </div>

    <!-- Price Range Slider -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-bold text-slate-700">
          {{ t('website_cars_by_price', 'Price') }}
        </label>
        <span class="text-xs font-black text-primary">
          {{ formatPrice(modelMaxPrice) }}
        </span>
      </div>
      <input
        v-model.number="modelMaxPrice"
        type="range"
        min="5000"
        max="150000"
        step="2500"
        class="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
      />
      <div class="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
        <span>5,000 JOD</span>
        <span>150,000 JOD</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SlidersHorizontal,
  Search,
  Check,
  X
} from 'lucide-vue-next'

const props = defineProps<{
  query: string
  condition: string
  brand: string
  body: string
  engineType: string
  transmission: string
  maxPrice: number
}>()

const emit = defineEmits<{
  'update:query': [value: string]
  'update:condition': [value: string]
  'update:brand': [value: string]
  'update:body': [value: string]
  'update:engineType': [value: string]
  'update:transmission': [value: string]
  'update:maxPrice': [value: number]
  'clear': []
}>()

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { brands, bodies, filters } = useSiteData()

const modelQuery = computed({
  get: () => props.query,
  set: (v) => emit('update:query', v)
})

const modelCondition = computed({
  get: () => props.condition,
  set: (v) => emit('update:condition', v)
})

const modelBrand = computed({
  get: () => props.brand,
  set: (v) => emit('update:brand', v)
})

const modelBody = computed({
  get: () => props.body,
  set: (v) => emit('update:body', v)
})

const modelEngineType = computed({
  get: () => props.engineType,
  set: (v) => emit('update:engineType', v)
})

const modelTransmission = computed({
  get: () => props.transmission,
  set: (v) => emit('update:transmission', v)
})

const modelMaxPrice = computed({
  get: () => props.maxPrice,
  set: (v) => emit('update:maxPrice', v)
})

const engineTypes = computed(() => filters.value?.engine_types?.map((e: any) => e.name) || ['Gasoline', 'Electric', 'Hybrid'])
const transmissions = computed(() => filters.value?.transmissions?.map((t: any) => t.name) || ['Automatic', 'Manual'])

const hasActiveFilters = computed(() => {
  return !!(
    props.query ||
    props.condition ||
    props.brand ||
    props.body ||
    props.engineType ||
    props.transmission ||
    props.maxPrice < 150000
  )
})

const toggleBrand = (b: string) => {
  modelBrand.value = modelBrand.value === b ? '' : b
}

const toggleBody = (b: string) => {
  modelBody.value = modelBody.value === b ? '' : b
}

const toggleEngineType = (e: string) => {
  modelEngineType.value = modelEngineType.value === e ? '' : e
}

const toggleTransmission = (t: string) => {
  modelTransmission.value = modelTransmission.value === t ? '' : t
}

const clearAll = () => {
  emit('clear')
}
</script>
