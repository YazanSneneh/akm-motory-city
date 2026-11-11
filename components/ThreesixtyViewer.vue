<template>
  <div class="relative bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none">
    <!-- Main 360 Display Area -->
    <div
      ref="containerRef"
      class="relative aspect-16/10 sm:aspect-16/9 w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- Current Active Frame Image -->
      <img
        v-if="currentFrameUrl"
        :src="currentFrameUrl"
        :alt="`360 View Frame ${currentFrameIndex + 1}`"
        class="w-full h-full object-contain pointer-events-none transition-transform"
      />

      <!-- Preloading Progress Overlay -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-30 text-white"
      >
        <Loader2 class="w-10 h-10 text-sky-400 animate-spin mb-3" />
        <span class="text-sm font-bold tracking-wide">
          {{ isRTL ? 'جاري تحميل العرض التفاعلي 360°...' : 'Loading 360° Interactive Experience...' }}
        </span>
        <div class="w-48 h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            class="h-full bg-sky-400 transition-all duration-150"
            :style="{ width: `${loadPercentage}%` }"
          ></div>
        </div>
        <span class="text-xs text-slate-400 mt-1 font-mono">{{ loadPercentage }}%</span>
      </div>

      <!-- Drag Indicator Overlay (fades out after first interaction) -->
      <div
        v-if="showHint && !isLoading"
        class="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none z-20 animate-bounce"
      >
        <div class="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-2 shadow-lg">
          <MoveHorizontal class="w-4 h-4 text-sky-400" />
          <span>{{ isRTL ? 'اسحب لتدوير السيارة 360 درجة' : 'Drag or swipe to rotate car 360°' }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom Controls Bar -->
    <div class="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 gap-4">
      <div class="flex items-center gap-3">
        <!-- Play / Pause Auto-spin -->
        <button
          @click="toggleAutoSpin"
          class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-colors"
          :title="isAutoSpinning ? 'Pause rotation' : 'Auto-spin'"
        >
          <Pause v-if="isAutoSpinning" class="w-3.5 h-3.5 text-amber-400" />
          <Play v-else class="w-3.5 h-3.5 text-sky-400" />
          <span class="hidden sm:inline">{{ isAutoSpinning ? (isRTL ? 'إيقاف' : 'Pause') : (isRTL ? 'دوران تلقائي' : 'Auto Spin') }}</span>
        </button>

        <!-- Reset Angle Button -->
        <button
          @click="resetAngle"
          class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          title="Reset to front angle"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">{{ isRTL ? 'إعادة ضبط' : 'Reset' }}</span>
        </button>
      </div>

      <!-- Scrubber Slider -->
      <div class="flex-1 max-w-xs flex items-center gap-2">
        <span class="text-[10px] font-mono text-slate-400">1</span>
        <input
          v-model.number="currentFrameIndex"
          type="range"
          min="0"
          :max="totalFrames - 1"
          class="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />
        <span class="text-[10px] font-mono text-slate-400">{{ totalFrames }}</span>
      </div>

      <!-- Frame Badge -->
      <div class="text-[11px] font-mono text-slate-400 hidden sm:block">
        {{ currentFrameIndex + 1 }} / {{ totalFrames }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Play,
  Pause,
  RotateCcw,
  MoveHorizontal,
  Loader2
} from 'lucide-vue-next'

const props = defineProps<{
  frames: Array<{ id: number; url: string; order?: number }>
}>()

const { isRTL } = useI18n()

const containerRef = ref<HTMLElement | null>(null)
const currentFrameIndex = ref(0)
const isAutoSpinning = ref(false)
const showHint = ref(true)
const isLoading = ref(true)
const loadedCount = ref(0)

const totalFrames = computed(() => props.frames?.length || 0)

const currentFrameUrl = computed(() => {
  if (!props.frames || props.frames.length === 0) return ''
  return props.frames[currentFrameIndex.value]?.url || props.frames[0]?.url || ''
})

const loadPercentage = computed(() => {
  if (totalFrames.value === 0) return 100
  return Math.min(100, Math.round((loadedCount.value / totalFrames.value) * 100))
})

// Preload first 20 frames immediately, then stream the rest
onMounted(() => {
  if (!props.frames || props.frames.length === 0) {
    isLoading.value = false
    return
  }

  let count = 0
  props.frames.forEach((f, idx) => {
    const img = new Image()
    img.src = f.url
    img.onload = () => {
      count++
      loadedCount.value = count
      if (count >= Math.min(12, totalFrames.value)) {
        isLoading.value = false
      }
    }
    img.onerror = () => {
      count++
      loadedCount.value = count
      if (count >= Math.min(12, totalFrames.value)) {
        isLoading.value = false
      }
    }
  })
})

// Auto-spin interval
let autoSpinTimer: any = null

const toggleAutoSpin = () => {
  isAutoSpinning.value = !isAutoSpinning.value
  if (isAutoSpinning.value) {
    showHint.value = false
    autoSpinTimer = setInterval(() => {
      currentFrameIndex.value = (currentFrameIndex.value + 1) % totalFrames.value
    }, 70)
  } else {
    clearInterval(autoSpinTimer)
  }
}

const resetAngle = () => {
  currentFrameIndex.value = 0
  if (isAutoSpinning.value) {
    toggleAutoSpin()
  }
}

// Drag logic
let isDragging = false
let startX = 0
let lastFrame = 0

const handleMouseDown = (e: MouseEvent) => {
  if (isAutoSpinning.value) toggleAutoSpin()
  showHint.value = false
  isDragging = true
  startX = e.clientX
  lastFrame = currentFrameIndex.value

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging || totalFrames.value === 0) return
  const diffX = e.clientX - startX
  const sensitivity = 8
  const frameDelta = Math.floor(diffX / sensitivity)
  let newFrame = (lastFrame - frameDelta) % totalFrames.value
  if (newFrame < 0) newFrame += totalFrames.value
  currentFrameIndex.value = newFrame
}

const handleMouseUp = () => {
  isDragging = false
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

// Touch logic
let touchStartX = 0

const handleTouchStart = (e: TouchEvent) => {
  if (isAutoSpinning.value) toggleAutoSpin()
  showHint.value = false
  if (e.touches[0]) {
    touchStartX = e.touches[0].clientX
    lastFrame = currentFrameIndex.value
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!e.touches[0] || totalFrames.value === 0) return
  const diffX = e.touches[0].clientX - touchStartX
  const sensitivity = 8
  const frameDelta = Math.floor(diffX / sensitivity)
  let newFrame = (lastFrame - frameDelta) % totalFrames.value
  if (newFrame < 0) newFrame += totalFrames.value
  currentFrameIndex.value = newFrame
}

const handleTouchEnd = () => {}

onUnmounted(() => {
  if (autoSpinTimer) clearInterval(autoSpinTimer)
  if (import.meta.client) {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }
})
</script>

