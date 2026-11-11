<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    @click.self="$emit('close')"
  >
    <div class="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
      <!-- Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            <Car class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-900 tracking-tight">
              {{ isEditing ? (isRTL ? 'تعديل بيانات السيارة' : 'Edit Vehicle Specifications') : (isRTL ? 'إضافة سيارة جديدة للأسطول' : 'Add New Vehicle to Inventory') }}
            </h3>
            <p class="text-xs text-slate-500">
              {{ isEditing ? `ID: #${car.id} • ${car.name_api}` : (isRTL ? 'أدخل تفاصيل ومواصفات السيارة للتحديث الفوري' : 'Fill in the specifications for immediate live catalog publication') }}
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="submitForm" class="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
        <!-- 1. Basic Information -->
        <div class="space-y-4">
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-primary border-b border-slate-100 pb-2">
            {{ isRTL ? 'المعلومات الأساسية' : '1. Core Details & Pricing' }}
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Vehicle Name (English) *</label>
              <input
                v-model="form.name_api"
                type="text"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:bg-white text-slate-900 font-semibold"
                placeholder="e.g. Mazda CX-90 Signature"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">اسم السيارة (بالعربية)</label>
              <input
                v-model="form.name_ar"
                type="text"
                dir="rtl"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:bg-white text-slate-900 font-semibold font-arabic"
                placeholder="مثال: مازدا سي اكس 90"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Price (JOD) *</label>
              <input
                v-model="form.price"
                type="number"
                step="500"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:bg-white text-slate-900 font-bold"
                placeholder="45000"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand *</label>
              <input
                v-model="form.brand"
                type="text"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:bg-white text-slate-900 font-semibold"
                placeholder="e.g. Mazda"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Model Year *</label>
              <input
                v-model="form.model_year"
                type="text"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-primary focus:bg-white text-slate-900 font-semibold"
                placeholder="2026"
              />
            </div>
          </div>
        </div>

        <!-- 2. Technical Specifications -->
        <div class="space-y-4">
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-primary border-b border-slate-100 pb-2">
            {{ isRTL ? 'المواصفات الفنية' : '2. Technical Specifications' }}
          </h4>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Body Shape</label>
              <select
                v-model="form.body"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Pickup">Pickup</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Engine Type</label>
              <select
                v-model="form.engine_type"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Electric">Electric (EV)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Transmission</label>
              <select
                v-model="form.transmission"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Drive Type</label>
              <select
                v-model="form.drive_type"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
              >
                <option value="AWD">AWD</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="4WD">4WD</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Performance / HP</label>
              <input
                v-model="form.performance"
                type="text"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
                placeholder="e.g. 280 Horsepower"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Total Stock Units</label>
              <input
                v-model.number="form.total_units"
                type="number"
                min="1"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        <!-- 3. Status Toggles -->
        <div class="space-y-4">
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-primary border-b border-slate-100 pb-2">
            {{ isRTL ? 'حالة التوفر والعرض' : '3. Availability & Visibility Toggles' }}
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label class="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60">
              <input v-model="form.is_used" type="checkbox" class="w-4 h-4 rounded text-primary accent-primary" />
              <div>
                <div class="font-bold text-slate-800 text-xs">Pre-Owned / Used</div>
                <div class="text-[10px] text-slate-500">Uncheck for Brand New (0 KM)</div>
              </div>
            </label>

            <label class="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60">
              <input v-model="form.is_full" type="checkbox" class="w-4 h-4 rounded text-rose-600 accent-rose-600" />
              <div>
                <div class="font-bold text-rose-700 text-xs">Fully Reserved / Closed</div>
                <div class="text-[10px] text-slate-500">Prevents new online bookings</div>
              </div>
            </label>

            <label class="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60">
              <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 rounded text-primary accent-primary" />
              <div>
                <div class="font-bold text-slate-800 text-xs">Featured on Homepage</div>
                <div class="text-[10px] text-slate-500">Shows in hero/top picks</div>
              </div>
            </label>
          </div>
        </div>

        <!-- 4. Media & Description -->
        <div class="space-y-4">
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider text-primary border-b border-slate-100 pb-2">
            {{ isRTL ? 'الصور والوصف' : '4. Photography & Overview' }}
          </h4>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Primary Image URL</label>
            <div class="flex gap-3 items-center">
              <input
                v-model="form.image_url"
                type="url"
                class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                placeholder="https://cms-motorcity.akm.jo/storage/cars/..."
              />
              <img
                v-if="form.image_url"
                :src="form.image_url"
                class="w-14 h-10 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Vehicle Description</label>
            <textarea
              v-model="form.description_api"
              rows="3"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white"
              placeholder="Highlight key equipment, condition, warranty..."
            ></textarea>
          </div>
        </div>

        <!-- Submit Footer -->
        <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            @click="$emit('close')"
            class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold shadow-md transition-all flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <span v-else>{{ isEditing ? 'Save Changes' : 'Publish to Catalog' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Car,
  X,
  Loader2
} from 'lucide-vue-next'

const props = defineProps<{
  car?: any
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
  'saved': [car: any]
}>()

const { isRTL } = useI18n()
const isSubmitting = ref(false)

const isEditing = computed(() => !!props.car?.id)

const form = ref({
  name_api: '',
  name_ar: '',
  price: '',
  brand: 'Mazda',
  model_year: '2026',
  body: 'SUV',
  engine_type: 'Gasoline',
  transmission: 'Automatic',
  drive_type: 'AWD',
  performance: '',
  total_units: 1,
  is_used: false,
  is_full: false,
  is_featured: false,
  image_url: '',
  description_api: ''
})

watch(() => props.car, (c) => {
  if (c) {
    form.value = {
      name_api: c.name_api || '',
      name_ar: c.name_ar || '',
      price: c.price || '',
      brand: c.attributes?.find((a: any) => a.name === 'Brand')?.value || 'Mazda',
      model_year: c.extra_attributes?.find((a: any) => a.name === 'Model Year')?.value || '2026',
      body: c.attributes?.find((a: any) => a.name === 'Body')?.value || 'SUV',
      engine_type: c.attributes?.find((a: any) => a.name === 'Engine Type')?.value || 'Gasoline',
      transmission: c.attributes?.find((a: any) => a.name === 'Transmission')?.value || 'Automatic',
      drive_type: c.attributes?.find((a: any) => a.name === 'Drive Type')?.value || 'AWD',
      performance: c.extra_attributes?.find((a: any) => a.name === 'Performance')?.value || '',
      total_units: c.total_units || 1,
      is_used: !!c.is_used,
      is_full: !!c.is_full,
      is_featured: !!c.is_featured,
      image_url: c.images?.[0]?.url || '',
      description_api: c.description_api || ''
    }
  } else {
    // Reset
    form.value = {
      name_api: '',
      name_ar: '',
      price: '25000',
      brand: 'Mazda',
      model_year: '2026',
      body: 'SUV',
      engine_type: 'Gasoline',
      transmission: 'Automatic',
      drive_type: 'AWD',
      performance: '180 HP',
      total_units: 1,
      is_used: false,
      is_full: false,
      is_featured: false,
      image_url: 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp',
      description_api: 'Certified vehicle available for inspection at AKM Motor City.'
    }
  }
}, { immediate: true })

const submitForm = async () => {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      const res = await $fetch<any>(`/api/admin/cars/${props.car.id}`, {
        method: 'PUT',
        body: form.value
      })
      emit('saved', res.data)
    } else {
      const res = await $fetch<any>('/api/admin/cars', {
        method: 'POST',
        body: form.value
      })
      emit('saved', res.data)
    }
    emit('close')
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Failed to save vehicle')
  } finally {
    isSubmitting.value = false
  }
}
</script>

