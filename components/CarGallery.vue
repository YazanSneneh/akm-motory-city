<template>
  <div class="space-y-4">
    <!-- View Mode Switcher (Photos vs 360) -->
    <div v-if="has360" class="flex items-center gap-2">
      <button
        @click="activeMode = 'photos'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        :class="activeMode === 'photos' ? 'bg-primary text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
      >
        <ImageIcon class="w-4 h-4" />
        <span>{{ isRTL ? 'معرض الصور' : 'Photo Gallery' }} ({{ images.length }})</span>
      </button>

      <button
        @click="activeMode = '360'"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        :class="activeMode === '360' ? 'bg-slate-900 text-sky-400 shadow-md ring-2 ring-sky-400/20' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
      >
        <Rotate3d class="w-4 h-4 text-sky-400" />
        <span>{{ isRTL ? 'عرض تفاعلي 360°' : 'Interactive 360° View' }}</span>
      </button>
    </div>

    <!-- 360 Viewer View -->
    <div v-if="activeMode === '360' && has360">
      <ThreesixtyViewer :frames="threesixtyFrames" />
    </div>

    <!-- Standard Image Gallery View -->
    <div v-else class="space-y-3">
      <!-- Main Featured Image -->
      <div class="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
        <img
          :src="currentImage"
          :alt="title"
          class="w-full h-full object-cover object-center transition-all duration-300"
        />

        <!-- Prev / Next arrows -->
        <button
          v-if="images.length > 1"
          @click="prevImage"
          class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft class="w-5 h-5 rtl:rotate-180" />
        </button>
        <button
          v-if="images.length > 1"
          @click="nextImage"
          class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight class="w-5 h-5 rtl:rotate-180" />
        </button>

        <div class="absolute bottom-3 end-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-xs font-mono backdrop-blur-xs">
          {{ selectedIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Thumbnails Strip -->
      <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          v-for="(img, idx) in images"
          :key="img.id || idx"
          @click="selectedIndex = idx"
          class="relative w-20 sm:w-24 aspect-16/10 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
          :class="selectedIndex === idx ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-transparent opacity-70 hover:opacity-100'"
        >
          <img :src="img.url" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ImageIcon,
  Rotate3d,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const props = defineProps<{
  images: Array<{ id: number; url: string; is_main?: boolean }>
  threesixtyFrames?: Array<{ id: number; url: string; order?: number }>
  title: string
}>()

const { isRTL } = useI18n()

const activeMode = ref<'photos' | '360'>('photos')
const selectedIndex = ref(0)

const has360 = computed(() => {
  return Array.isArray(props.threesixtyFrames) && props.threesixtyFrames.length > 0
})

const currentImage = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images[selectedIndex.value]?.url || props.images[0]?.url
  }
  return ''
})

const prevImage = () => {
  if (props.images.length <= 1) return
  selectedIndex.value = (selectedIndex.value - 1 + props.images.length) % props.images.length
}

const nextImage = () => {
  if (props.images.length <= 1) return
  selectedIndex.value = (selectedIndex.value + 1) % props.images.length
}
</script>

