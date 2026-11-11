<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
    <!-- Admin Sidebar -->
    <AdminSidebar
      :activeTab="activeTab"
      :carsCount="cars.length"
      :pendingCount="stats?.pendingBookings || 0"
      @selectTab="activeTab = $event"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 bg-slate-900/60 overflow-y-auto max-h-screen">
      <!-- Top Action Bar -->
      <header class="p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
        <div>
          <h1 class="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>{{ tabTitle }}</span>
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">
            {{ tabSubtitle }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Refresh Data Button -->
          <button
            @click="loadAllData"
            :disabled="isLoading"
            class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw class="w-4 h-4" :class="isLoading ? 'animate-spin text-sky-400' : ''" />
          </button>

          <!-- Add Car Button -->
          <button
            @click="openAddCarModal"
            class="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <Plus class="w-4 h-4" />
            <span>{{ isRTL ? 'إضافة سيارة جديدة' : 'Add Vehicle' }}</span>
          </button>
        </div>
      </header>

      <!-- Content Views by Tab -->
      <main class="p-6 sm:p-8 flex-1 space-y-8">
        <!-- ================= TAB 1: EXECUTIVE OVERVIEW ================= -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- KPI Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <!-- Stat 1: Total Fleet -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Fleet</span>
                <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Car class="w-4 h-4" />
                </div>
              </div>
              <div class="text-3xl font-black text-white mt-3">
                {{ stats?.totalCars || cars.length }}
              </div>
              <div class="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <span class="text-emerald-400 font-bold">{{ stats?.brandNewCars }} New</span>
                <span>•</span>
                <span class="text-amber-400 font-bold">{{ stats?.preOwnedCars }} Used</span>
              </div>
            </div>

            <!-- Stat 2: Fleet Value -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventory Value</span>
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Coins class="w-4 h-4" />
                </div>
              </div>
              <div class="text-3xl font-black text-white mt-3">
                {{ formatPrice(stats?.totalFleetValue) }}
              </div>
              <div class="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                <span>{{ stats?.availableCars }} vehicles available for sale</span>
              </div>
            </div>

            <!-- Stat 3: Online Bookings -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Online Bookings</span>
                <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <BookmarkCheck class="w-4 h-4" />
                </div>
              </div>
              <div class="text-3xl font-black text-white mt-3">
                {{ reservations.length }}
              </div>
              <div class="flex items-center gap-1.5 mt-2 text-xs font-bold" :class="stats?.pendingBookings > 0 ? 'text-rose-400' : 'text-slate-400'">
                <AlertCircle v-if="stats?.pendingBookings > 0" class="w-3.5 h-3.5" />
                <span>{{ stats?.pendingBookings || 0 }} pending review</span>
              </div>
            </div>

            <!-- Stat 4: Total Views -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Catalog Views</span>
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <TrendingUp class="w-4 h-4" />
                </div>
              </div>
              <div class="text-3xl font-black text-white mt-3">
                {{ (stats?.totalViews || 0).toLocaleString() }}
              </div>
              <div class="text-xs text-sky-400 font-bold mt-2">
                High client engagement rate
              </div>
            </div>
          </div>

          <!-- Split: Most Popular Vehicles & Brand Distribution -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left: Top Viewed Cars (7 cols) -->
            <div class="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-extrabold text-base text-white flex items-center gap-2">
                  <Flame class="w-4 h-4 text-amber-400" />
                  <span>Most In-Demand Vehicles</span>
                </h3>
                <button @click="activeTab = 'inventory'" class="text-xs font-bold text-sky-400 hover:underline">
                  View All &rarr;
                </button>
              </div>

              <div class="divide-y divide-slate-800/80">
                <div
                  v-for="car in stats?.topViewedCars"
                  :key="car.id"
                  class="py-3.5 flex items-center justify-between gap-4"
                >
                  <div class="flex items-center gap-3 truncate">
                    <img
                      :src="car.image || 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'"
                      class="w-14 h-10 object-cover rounded-xl bg-slate-800 shrink-0"
                    />
                    <div class="truncate">
                      <div class="font-bold text-sm text-white truncate">{{ car.name }}</div>
                      <div class="text-xs text-slate-400 font-medium">
                        {{ formatPrice(car.price) }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 shrink-0">
                    <div class="text-end">
                      <div class="text-xs font-black text-sky-400">{{ (car.views_count || 0).toLocaleString() }}</div>
                      <div class="text-[10px] text-slate-500 uppercase">Views</div>
                    </div>
                    <button
                      @click="openEditCarModal(findCar(car.id))"
                      class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Edit vehicle"
                    >
                      <Edit2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Brand Breakdown (5 cols) -->
            <div class="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
              <h3 class="font-extrabold text-base text-white flex items-center gap-2">
                <PieChart class="w-4 h-4 text-sky-400" />
                <span>Brand Distribution</span>
              </h3>

              <div class="space-y-3 pt-2">
                <div
                  v-for="b in (stats?.brandDistribution || []).slice(0, 6)"
                  :key="b.name"
                  class="space-y-1.5"
                >
                  <div class="flex justify-between text-xs font-bold text-slate-300">
                    <span>{{ b.name }}</span>
                    <span class="text-slate-400">{{ b.count }} cars ({{ Math.round((b.count / cars.length) * 100) }}%)</span>
                  </div>
                  <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-primary rounded-full transition-all duration-500"
                      :style="{ width: `${(b.count / cars.length) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Inquiries & Bookings Quick Glance -->
          <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-extrabold text-base text-white flex items-center gap-2">
                <BookmarkCheck class="w-4 h-4 text-emerald-400" />
                <span>Recent Customer Bookings</span>
              </h3>
              <button @click="activeTab = 'reservations'" class="text-xs font-bold text-sky-400 hover:underline">
                Manage Inquiries &rarr;
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-start text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400">
                    <th class="pb-3 text-start">Code</th>
                    <th class="pb-3 text-start">Customer</th>
                    <th class="pb-3 text-start">Vehicle</th>
                    <th class="pb-3 text-start">Phone</th>
                    <th class="pb-3 text-start">Status</th>
                    <th class="pb-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  <tr v-for="res in reservations.slice(0, 4)" :key="res.id" class="hover:bg-slate-800/40">
                    <td class="py-3 font-mono font-bold text-primary-300">{{ res.hash }}</td>
                    <td class="py-3 font-bold text-white">{{ res.customer.first_name }} {{ res.customer.last_name }}</td>
                    <td class="py-3 text-slate-300">{{ res.car.name }}</td>
                    <td class="py-3 font-mono text-slate-400">{{ res.customer.phone }}</td>
                    <td class="py-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase" :class="statusBadgeClass(res.status)">
                        {{ res.status }}
                      </span>
                    </td>
                    <td class="py-3 text-end">
                      <button
                        @click="openReservationModal(res)"
                        class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================= TAB 2: FLEET & INVENTORY ================= -->
        <div v-else-if="activeTab === 'inventory'" class="space-y-6">
          <!-- Filters & Search Toolbar -->
          <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <button
                @click="inventoryFilter = 'all'"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                :class="inventoryFilter === 'all' ? 'bg-primary text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:text-white'"
              >
                All ({{ cars.length }})
              </button>
              <button
                @click="inventoryFilter = 'new'"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                :class="inventoryFilter === 'new' ? 'bg-primary text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:text-white'"
              >
                Brand New
              </button>
              <button
                @click="inventoryFilter = 'used'"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                :class="inventoryFilter === 'used' ? 'bg-primary text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:text-white'"
              >
                Pre-Owned
              </button>
              <button
                @click="inventoryFilter = 'reserved'"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                :class="inventoryFilter === 'reserved' ? 'bg-primary text-white shadow-xs' : 'bg-slate-800 text-slate-400 hover:text-white'"
              >
                Fully Reserved
              </button>
            </div>

            <div class="relative w-full sm:w-64">
              <input
                v-model="inventorySearch"
                type="text"
                placeholder="Search inventory..."
                class="w-full bg-slate-800 border border-slate-700 rounded-xl ps-9 pe-4 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-primary placeholder:text-slate-500"
              />
              <Search class="w-4 h-4 text-slate-500 absolute start-3 top-2.5" />
            </div>
          </div>

          <!-- Inventory Table -->
          <div class="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-start text-xs">
                <thead>
                  <tr class="bg-slate-800/60 border-b border-slate-800 text-slate-400">
                    <th class="p-4 text-start">Vehicle</th>
                    <th class="p-4 text-start">Category</th>
                    <th class="p-4 text-start">Condition</th>
                    <th class="p-4 text-start">Price (JOD)</th>
                    <th class="p-4 text-center">Availability Status</th>
                    <th class="p-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  <tr
                    v-for="car in filteredInventory"
                    :key="car.id"
                    class="hover:bg-slate-800/40 transition-colors"
                  >
                    <!-- Vehicle Title & Thumb -->
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <img
                          :src="car.images?.[0]?.url || 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'"
                          class="w-14 h-10 object-cover rounded-xl bg-slate-800 shrink-0"
                        />
                        <div class="truncate max-w-xs">
                          <div class="font-extrabold text-white text-sm truncate">{{ car.name_api }}</div>
                          <div class="text-[11px] text-slate-400">
                            {{ getAttr(car, 'Brand') }} • {{ getExtraAttr(car, 'Model Year') }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Category -->
                    <td class="p-4 text-slate-300 font-medium">
                      {{ getAttr(car, 'Body') }} • {{ getAttr(car, 'Engine Type') }}
                    </td>

                    <!-- Condition -->
                    <td class="p-4">
                      <span
                        class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider"
                        :class="car.is_used ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'"
                      >
                        {{ car.is_used ? 'Pre-Owned' : 'Brand New' }}
                      </span>
                    </td>

                    <!-- Price -->
                    <td class="p-4 font-black text-white text-sm">
                      {{ formatPrice(car.price) }}
                    </td>

                    <!-- Availability Switch -->
                    <td class="p-4 text-center">
                      <button
                        @click="toggleCarAvailability(car)"
                        class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-1.5 cursor-pointer"
                        :class="car.is_full ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'"
                        :title="car.is_full ? 'Click to make Available' : 'Click to mark as Reserved'"
                      >
                        <span class="w-2 h-2 rounded-full" :class="car.is_full ? 'bg-rose-500' : 'bg-emerald-400'"></span>
                        <span>{{ car.is_full ? 'Reserved / Sold' : 'Available' }}</span>
                      </button>
                    </td>

                    <!-- Actions -->
                    <td class="p-4 text-end">
                      <div class="flex items-center justify-end gap-2">
                        <button
                          @click="openEditCarModal(car)"
                          class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                          title="Edit vehicle"
                        >
                          <Edit2 class="w-3.5 h-3.5" />
                        </button>
                        <button
                          @click="confirmDeleteCar(car)"
                          class="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                          title="Delete vehicle"
                        >
                          <Trash2 class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================= TAB 3: RESERVATIONS ================= -->
        <div v-else-if="activeTab === 'reservations'" class="space-y-6">
          <div class="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-start text-xs">
                <thead>
                  <tr class="bg-slate-800/60 border-b border-slate-800 text-slate-400">
                    <th class="p-4 text-start">Reference Code</th>
                    <th class="p-4 text-start">Customer Name</th>
                    <th class="p-4 text-start">Booked Vehicle</th>
                    <th class="p-4 text-start">Phone Number</th>
                    <th class="p-4 text-start">Booking Date</th>
                    <th class="p-4 text-start">Status</th>
                    <th class="p-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                  <tr
                    v-for="res in reservations"
                    :key="res.id"
                    class="hover:bg-slate-800/40 transition-colors"
                  >
                    <td class="p-4 font-mono font-black text-sky-400 text-sm">
                      {{ res.hash }}
                    </td>
                    <td class="p-4 font-bold text-white text-sm">
                      {{ res.customer.first_name }} {{ res.customer.last_name }}
                    </td>
                    <td class="p-4 text-slate-300 font-medium">
                      {{ res.car.name }}
                    </td>
                    <td class="p-4 font-mono text-slate-400">
                      {{ res.customer.phone }}
                    </td>
                    <td class="p-4 text-slate-400">
                      {{ formatDate(res.date) }}
                    </td>
                    <td class="p-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider" :class="statusBadgeClass(res.status)">
                        {{ res.status }}
                      </span>
                    </td>
                    <td class="p-4 text-end">
                      <button
                        @click="openReservationModal(res)"
                        class="px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-white font-bold transition-all shadow-xs"
                      >
                        Manage & Contact
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================= TAB 4: SHOWROOM SETTINGS ================= -->
        <div v-else-if="activeTab === 'settings'" class="max-w-3xl space-y-6">
          <div
            v-if="settingsSuccessMessage"
            class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2 animate-bounce"
          >
            <CheckCircle2 class="w-4 h-4 shrink-0" />
            <span>{{ settingsSuccessMessage }}</span>
          </div>

          <div class="p-6 sm:p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            <h3 class="text-lg font-black text-white">Dealership Public Information & Contact</h3>

            <div class="space-y-4 text-xs sm:text-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-300 mb-1">Main Phone Number</label>
                  <input
                    v-model="dealershipSettings.phone"
                    type="text"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-mono"
                    placeholder="0791663333"
                  />
                </div>

                <div>
                  <label class="block font-bold text-slate-300 mb-1">Official WhatsApp Number</label>
                  <input
                    v-model="dealershipSettings.whatsapp"
                    type="text"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-mono"
                    placeholder="+96265777777"
                  />
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-300 mb-1">Showroom Address (English)</label>
                <input
                  v-model="dealershipSettings.address"
                  type="text"
                  class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                  placeholder="Bayader - Amman, Hashemite Kingdom of Jordan"
                />
              </div>

              <div>
                <label class="block font-bold text-slate-300 mb-1">عنوان المعرض (بالعربية)</label>
                <input
                  v-model="dealershipSettings.address_ar"
                  type="text"
                  dir="rtl"
                  class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-arabic"
                  placeholder="البيادر - عمّان، المملكة الأردنية الهاشمية"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-slate-300 mb-1">Working Hours (English)</label>
                  <input
                    v-model="dealershipSettings.working_hours_en"
                    type="text"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                    placeholder="Sat - Thu: 9:00 AM - 8:00 PM"
                  />
                </div>

                <div>
                  <label class="block font-bold text-slate-300 mb-1">أوقات الدوام (بالعربية)</label>
                  <input
                    v-model="dealershipSettings.working_hours_ar"
                    type="text"
                    dir="rtl"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-arabic"
                    placeholder="السبت - الخميس: 9:00 ص - 8:00 م"
                  />
                </div>
              </div>

              <div class="pt-4 flex justify-between items-center border-t border-slate-800">
                <span class="text-xs text-slate-400">Updates live across all visitor devices & navbar/footer</span>
                <button
                  @click="saveSettingsFeedback"
                  :disabled="isSavingSettings"
                  class="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Loader2 v-if="isSavingSettings" class="w-4 h-4 animate-spin" />
                  <span v-else>Save & Publish Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <CarEditModal
      :car="editingCar"
      :isOpen="isCarModalOpen"
      @close="isCarModalOpen = false"
      @saved="onCarSaved"
    />

    <ReservationModal
      :reservation="selectedReservation"
      :isOpen="isReservationModalOpen"
      @close="isReservationModalOpen = false"
      @updated="onReservationUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Car,
  Coins,
  BookmarkCheck,
  TrendingUp,
  AlertCircle,
  Flame,
  PieChart,
  Edit2,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  CheckCircle2,
  Loader2
} from 'lucide-vue-next'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import CarEditModal from '~/components/admin/CarEditModal.vue'
import ReservationModal from '~/components/admin/ReservationModal.vue'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'AKM Motor City | Executive Dealership Management Portal'
})

const { isRTL } = useI18n()
const { formatPrice } = useCurrency()
const { isAuthenticated } = useAdminAuth()
const { refresh: refreshPublicSiteData, updateCarLocally, removeCarLocally, updateSettingsLocally } = useSiteData()
const router = useRouter()

// Guard route
onMounted(() => {
  if (!isAuthenticated.value) {
    router.replace('/admin/login')
  } else {
    loadAllData()
  }
})

const activeTab = ref('overview')
const isLoading = ref(false)

const stats = ref<any>(null)
const cars = ref<any[]>([])
const reservations = ref<any[]>([])

const inventoryFilter = ref('all')
const inventorySearch = ref('')

const isCarModalOpen = ref(false)
const editingCar = ref<any>(null)

const isReservationModalOpen = ref(false)
const selectedReservation = ref<any>(null)

const isSavingSettings = ref(false)
const settingsSuccessMessage = ref('')

const dealershipSettings = ref({
  phone: '0791663333',
  whatsapp: '+96265777777',
  address: 'Bayader - Amman, Hashemite Kingdom of Jordan',
  address_ar: 'البيادر - عمّان، المملكة الأردنية الهاشمية',
  working_hours_en: 'Sat - Thu: 9:00 AM - 8:00 PM',
  working_hours_ar: 'السبت - الخميس: 9:00 ص - 8:00 م'
})

const tabTitle = computed(() => {
  switch (activeTab.value) {
    case 'overview': return isRTL.value ? 'نظرة عامة على المعرض' : 'Executive Dealership Overview'
    case 'inventory': return isRTL.value ? 'أسطول السيارات والمعروضات' : 'Vehicle Inventory Management'
    case 'reservations': return isRTL.value ? 'طلبات الحجز الإلكتروني' : 'Online Bookings & Customer Inquiries'
    case 'settings': return isRTL.value ? 'إعدادات المعرض والعروض' : 'Showroom & Portal Settings'
    default: return 'Dealership Portal'
  }
})

const tabSubtitle = computed(() => {
  switch (activeTab.value) {
    case 'overview': return 'Real-time performance metrics, fleet valuation, and popularity analytics'
    case 'inventory': return 'Publish new models, modify prices, and manage stock availability live'
    case 'reservations': return 'Review incoming customer booking deposits and direct WhatsApp inquiries'
    case 'settings': return 'Manage public contact information, showroom working hours, and policies'
    default: return ''
  }
})

const loadAllData = async () => {
  isLoading.value = true
  try {
    const [s, c, r, set] = await Promise.all([
      $fetch<any>('/api/admin/stats'),
      $fetch<any>('/api/admin/cars'),
      $fetch<any>('/api/admin/reservations'),
      $fetch<any>('/api/admin/settings')
    ])
    if (s && s.success) stats.value = s.data
    if (c && c.success) cars.value = c.data
    if (r && r.success) reservations.value = r.data
    if (set && set.success && set.data) {
      dealershipSettings.value = {
        ...dealershipSettings.value,
        ...set.data
      }
    }
  } catch (e) {
    console.error('Error fetching admin data:', e)
  } finally {
    isLoading.value = false
  }
}

const filteredInventory = computed(() => {
  let list = [...cars.value]

  if (inventoryFilter.value === 'new') {
    list = list.filter(c => !c.is_used)
  } else if (inventoryFilter.value === 'used') {
    list = list.filter(c => c.is_used)
  } else if (inventoryFilter.value === 'reserved') {
    list = list.filter(c => c.is_full)
  }

  if (inventorySearch.value.trim()) {
    const q = inventorySearch.value.toLowerCase().trim()
    list = list.filter(c => {
      const name = (c.name_api || '').toLowerCase()
      const brand = c.attributes?.find((a: any) => a.name === 'Brand')?.value?.toLowerCase() || ''
      return name.includes(q) || brand.includes(q)
    })
  }

  return list
})

const getAttr = (car: any, name: string) => {
  return car.attributes?.find((a: any) => a.name === name)?.value || '—'
}

const getExtraAttr = (car: any, name: string) => {
  return car.extra_attributes?.find((a: any) => a.name === name)?.value || '—'
}

const findCar = (id: number) => {
  return cars.value.find(c => c.id === id)
}

const openAddCarModal = () => {
  editingCar.value = null
  isCarModalOpen.value = true
}

const openEditCarModal = (car: any) => {
  editingCar.value = car
  isCarModalOpen.value = true
}

const onCarSaved = (saved: any) => {
  updateCarLocally(saved)
  refreshPublicSiteData()
  loadAllData()
}

const toggleCarAvailability = async (car: any) => {
  try {
    const newStatus = !car.is_full
    await $fetch(`/api/admin/cars/${car.id}`, {
      method: 'PUT',
      body: { is_full: newStatus }
    })
    car.is_full = newStatus
    updateCarLocally(car)
    refreshPublicSiteData()

    if (stats.value) {
      if (newStatus) {
        stats.value.availableCars--
        stats.value.reservedCars++
      } else {
        stats.value.availableCars++
        stats.value.reservedCars--
      }
    }
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Failed to toggle availability')
  }
}

const confirmDeleteCar = async (car: any) => {
  if (confirm(`Are you sure you want to delete ${car.name_api} from the catalog?`)) {
    try {
      await $fetch(`/api/admin/cars/${car.id}`, {
        method: 'DELETE'
      })
      cars.value = cars.value.filter(c => c.id !== car.id)
      removeCarLocally(car.id)
      refreshPublicSiteData()
      loadAllData()
    } catch (e: any) {
      alert(e.data?.statusMessage || 'Failed to delete car')
    }
  }
}

const openReservationModal = (res: any) => {
  selectedReservation.value = res
  isReservationModalOpen.value = true
}

const onReservationUpdated = (updated: any) => {
  const item = reservations.value.find(r => r.id === updated.id)
  if (item) {
    item.status = updated.status
    item.notes = updated.notes
  }
  isReservationModalOpen.value = false
  loadAllData()
}

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
    case 'contacted': return 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
    case 'confirmed': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
    case 'completed': return 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
    case 'cancelled': return 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
    default: return 'bg-slate-800 text-slate-300'
  }
}

const formatDate = (d: string) => {
  try {
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return d
  }
}

const saveSettingsFeedback = async () => {
  isSavingSettings.value = true
  settingsSuccessMessage.value = ''
  try {
    const res = await $fetch<any>('/api/admin/settings', {
      method: 'PUT',
      body: dealershipSettings.value
    })
    if (res && res.success) {
      updateSettingsLocally(dealershipSettings.value)
      refreshPublicSiteData()
      settingsSuccessMessage.value = 'Showroom contact & settings saved live across public website!'
      setTimeout(() => {
        settingsSuccessMessage.value = ''
      }, 4000)
    }
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Failed to save settings')
  } finally {
    isSavingSettings.value = false
  }
}
</script>
