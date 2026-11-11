<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200">
    <!-- Top Micro Bar -->
    <div class="bg-primary text-white text-xs py-1.5 px-4 hidden sm:block">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-6">
          <a :href="`tel:${dealershipSettings.phone}`" class="flex items-center gap-1.5 hover:text-sky-200 transition-colors">
            <Phone class="w-3.5 h-3.5" />
            <span>{{ dealershipSettings.phone }}</span>
          </a>
          <a
            :href="`https://wa.me/${cleanWhatsAppNumber}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <MessageCircle class="w-3.5 h-3.5" />
            <span>{{ isRTL ? 'تواصل عبر واتساب' : 'WhatsApp Us' }}</span>
          </a>
          <span class="text-slate-300/60 hidden md:inline">|</span>
          <span class="text-slate-200 hidden md:inline">
            {{ isRTL ? dealershipSettings.address_ar : dealershipSettings.address }}
          </span>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/terms_conditions" class="text-slate-300 hover:text-white transition-colors">
            {{ isRTL ? 'الشروط والأحكام' : 'Terms & Conditions' }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-slate-900 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            AKM
          </div>
          <div class="flex flex-col">
            <span class="font-black text-xl tracking-tight text-primary leading-tight">
              AKM MOTOR CITY
            </span>
            <span class="text-xs font-semibold text-slate-500 font-arabic">
              مدينة الخياط للسيارات
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            :class="$route.path === '/' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-100'"
          >
            {{ t('website_navbar_home', 'Home') }}
          </NuxtLink>

          <NuxtLink
            to="/cars"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            :class="$route.path.startsWith('/cars') ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-100'"
          >
            {{ t('website_navbar_cars', 'Models') }}
          </NuxtLink>

          <NuxtLink
            to="/showroom"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
            :class="$route.path === '/showroom' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-100'"
          >
            <Glasses class="w-4 h-4 text-primary" />
            <span>{{ t('website_navbar_vr', 'VR Showroom') }}</span>
          </NuxtLink>

          <NuxtLink
            to="/favourite"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
            :class="$route.path === '/favourite' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:text-primary hover:bg-slate-100'"
          >
            <Heart class="w-4 h-4" :class="favoriteCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'" />
            <span>{{ t('website_navbar_favourite', 'Favorites') }}</span>
            <span
              v-if="favoriteCount > 0"
              class="ms-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white"
            >
              {{ favoriteCount }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Utility Controls: Currency, Language, Compare Badge & Mobile Menu -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Currency Toggle -->
          <button
            @click="toggleCurrency"
            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs"
            :title="isRTL ? 'تغيير العملة' : 'Toggle Currency'"
          >
            <Coins class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ currency }}</span>
          </button>

          <!-- Language Switcher -->
          <button
            @click="switchLocale"
            class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Globe class="w-3.5 h-3.5 text-primary" />
            <span>{{ isRTL ? 'English' : 'عربي' }}</span>
          </button>

          <!-- Compare Tray Shortcut (if any cars added) -->
          <button
            v-if="compareCount > 0"
            @click="isCompareDrawerOpen = !isCompareDrawerOpen"
            class="relative px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeftRight class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">{{ isRTL ? 'المقارنة' : 'Compare' }}</span>
            <span class="px-1.5 py-0.2 rounded-full bg-white text-primary text-xs font-black">
              {{ compareCount }}
            </span>
          </button>

          <!-- Mobile Menu Toggle Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Open navigation menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-3"
      >
        <div class="flex flex-col space-y-1">
          <NuxtLink
            to="/"
            @click="isMobileMenuOpen = false"
            class="px-4 py-3 rounded-lg text-base font-semibold"
            :class="$route.path === '/' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:bg-slate-50'"
          >
            {{ t('website_navbar_home', 'Home') }}
          </NuxtLink>

          <NuxtLink
            to="/cars"
            @click="isMobileMenuOpen = false"
            class="px-4 py-3 rounded-lg text-base font-semibold"
            :class="$route.path.startsWith('/cars') ? 'text-primary bg-primary/10' : 'text-slate-700 hover:bg-slate-50'"
          >
            {{ t('website_navbar_cars', 'Models') }}
          </NuxtLink>

          <NuxtLink
            to="/showroom"
            @click="isMobileMenuOpen = false"
            class="px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between"
            :class="$route.path === '/showroom' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:bg-slate-50'"
          >
            <span>{{ t('website_navbar_vr', 'VR Showroom') }}</span>
            <Glasses class="w-4 h-4 text-primary" />
          </NuxtLink>

          <NuxtLink
            to="/favourite"
            @click="isMobileMenuOpen = false"
            class="px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between"
            :class="$route.path === '/favourite' ? 'text-primary bg-primary/10' : 'text-slate-700 hover:bg-slate-50'"
          >
            <span>{{ t('website_navbar_favourite', 'Favorites') }}</span>
            <span
              v-if="favoriteCount > 0"
              class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white"
            >
              {{ favoriteCount }}
            </span>
          </NuxtLink>
        </div>

        <div class="pt-3 border-t border-slate-100 flex flex-col gap-2 text-sm text-slate-600">
          <a
            :href="`tel:${dealershipSettings.phone}`"
            class="flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-50 font-semibold text-primary"
          >
            <Phone class="w-4 h-4" />
            <span>{{ dealershipSettings.phone }}</span>
          </a>
          <a
            :href="`https://wa.me/${cleanWhatsAppNumber}`"
            target="_blank"
            class="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 font-semibold text-emerald-700"
          >
            <MessageCircle class="w-4 h-4" />
            <span>{{ isRTL ? `واتساب: ${dealershipSettings.whatsapp}` : `WhatsApp: ${dealershipSettings.whatsapp}` }}</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import {
  Phone,
  MessageCircle,
  Heart,
  Glasses,
  Coins,
  Globe,
  ArrowLeftRight,
  Menu,
  X
} from 'lucide-vue-next'

const { locale, setLocale, isRTL, t } = useI18n()
const { currency, toggleCurrency } = useCurrency()
const { count: favoriteCount } = useFavorites()
const { count: compareCount, isDrawerOpen: isCompareDrawerOpen } = useCompare()
const { dealershipSettings, cleanWhatsAppNumber } = useSiteData()

const isMobileMenuOpen = ref(false)

const switchLocale = () => {
  setLocale(locale.value === 'en' ? 'ar' : 'en')
}
</script>
