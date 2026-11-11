<template>
  <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-e border-slate-800 select-none">
    <div>
      <!-- Brand Header -->
      <div class="p-6 border-b border-slate-800 flex items-center justify-between">
        <NuxtLink to="/admin" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary/30">
            AKM
          </div>
          <div>
            <div class="font-black text-white text-base tracking-tight leading-none">
              AKM CONTROL
            </div>
            <div class="text-[10px] text-sky-400 font-bold uppercase tracking-wider mt-1">
              Dealership Portal
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <nav class="p-4 space-y-1.5">
        <button
          @click="$emit('selectTab', 'overview')"
          class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-start"
          :class="activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <div class="flex items-center gap-3">
            <LayoutDashboard class="w-4 h-4" />
            <span>{{ isRTL ? 'نظرة عامة وإحصائيات' : 'Executive Overview' }}</span>
          </div>
        </button>

        <button
          @click="$emit('selectTab', 'inventory')"
          class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-start"
          :class="activeTab === 'inventory' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <div class="flex items-center gap-3">
            <Car class="w-4 h-4" />
            <span>{{ isRTL ? 'إدارة أسطول السيارات' : 'Fleet & Inventory' }}</span>
          </div>
          <span
            v-if="carsCount"
            class="px-2 py-0.5 rounded-full text-[10px] font-black"
            :class="activeTab === 'inventory' ? 'bg-white text-primary' : 'bg-slate-800 text-slate-300'"
          >
            {{ carsCount }}
          </span>
        </button>

        <button
          @click="$emit('selectTab', 'reservations')"
          class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-start"
          :class="activeTab === 'reservations' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <div class="flex items-center gap-3">
            <BookmarkCheck class="w-4 h-4" />
            <span>{{ isRTL ? 'الحجوزات والطلبات' : 'Online Bookings' }}</span>
          </div>
          <span
            v-if="pendingCount > 0"
            class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse"
          >
            {{ pendingCount }}
          </span>
        </button>

        <button
          @click="$emit('selectTab', 'settings')"
          class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-start"
          :class="activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'"
        >
          <div class="flex items-center gap-3">
            <Settings class="w-4 h-4" />
            <span>{{ isRTL ? 'إعدادات المعرض والعروض' : 'Showroom Settings' }}</span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Footer Profile & Return to Site -->
    <div class="p-4 border-t border-slate-800 space-y-3">
      <!-- Live Website Shortcut -->
      <NuxtLink
        to="/"
        target="_blank"
        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-sky-300 transition-colors"
      >
        <span class="flex items-center gap-2">
          <ExternalLink class="w-3.5 h-3.5" />
          <span>{{ isRTL ? 'الموقع العام المباشر' : 'View Public Site' }}</span>
        </span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </NuxtLink>

      <!-- Admin Profile Box -->
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-2.5 truncate">
          <div class="w-8 h-8 rounded-full bg-primary/30 border border-primary/50 text-white font-bold flex items-center justify-center text-xs">
            AD
          </div>
          <div class="truncate">
            <div class="text-xs font-bold text-white truncate">
              {{ adminUser?.name || 'AKM Admin' }}
            </div>
            <div class="text-[10px] text-slate-400 truncate">
              admin@akm.jo
            </div>
          </div>
        </div>

        <button
          @click="logout"
          class="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Sign out"
        >
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  Car,
  BookmarkCheck,
  Settings,
  ExternalLink,
  LogOut
} from 'lucide-vue-next'

defineProps<{
  activeTab: string
  carsCount: number
  pendingCount: number
}>()

defineEmits<{
  'selectTab': [tab: string]
}>()

const { isRTL } = useI18n()
const { adminUser, logout } = useAdminAuth()
</script>

