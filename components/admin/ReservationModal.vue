<template>
  <div
    v-if="isOpen && reservation"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    @click.self="$emit('close')"
  >
    <div class="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
      <!-- Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <div class="text-[11px] font-mono font-bold text-slate-400">BOOKING VOUCHER</div>
          <h3 class="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{{ reservation.hash }}</span>
            <span
              class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
              :class="statusBadgeClass(reservation.status)"
            >
              {{ reservation.status }}
            </span>
          </h3>
        </div>

        <button
          @click="$emit('close')"
          class="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Details Body -->
      <div class="p-6 space-y-6 text-xs sm:text-sm">
        <!-- Booked Car Box -->
        <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <img
            :src="reservation.car.image || 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'"
            class="w-16 h-12 object-cover rounded-xl bg-slate-200 shrink-0"
          />
          <div class="flex-1 truncate">
            <div class="font-extrabold text-slate-900 truncate">
              {{ reservation.car.name }}
            </div>
            <div class="text-xs text-slate-500 font-semibold mt-0.5">
              Price: <span class="text-primary font-bold">{{ formatPrice(reservation.car.price) }}</span>
            </div>
          </div>
          <div class="text-end">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Deposit</div>
            <div class="text-sm font-black text-emerald-600">100 JOD</div>
          </div>
        </div>

        <!-- Customer Profile Information -->
        <div class="space-y-3">
          <h4 class="font-bold text-slate-400 text-xs uppercase tracking-wider">Customer Details</h4>
          <div class="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <span class="text-slate-400 text-[11px] block">Full Name</span>
              <span class="font-bold text-slate-800">{{ reservation.customer.first_name }} {{ reservation.customer.last_name }}</span>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Booking Date</span>
              <span class="font-medium text-slate-800">{{ formatDate(reservation.date) }}</span>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Phone (Jordan)</span>
              <span class="font-mono font-bold text-slate-800">{{ reservation.customer.phone }}</span>
            </div>
            <div>
              <span class="text-slate-400 text-[11px] block">Payment Method</span>
              <span class="font-bold text-slate-800 uppercase text-xs">{{ reservation.payment_method }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Communication Actions -->
        <div class="grid grid-cols-2 gap-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            :href="`tel:${reservation.customer.phone}`"
            class="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Phone class="w-4 h-4" />
            <span>Call Customer</span>
          </a>
        </div>

        <!-- Status Management Selector -->
        <div class="space-y-2 pt-2 border-t border-slate-100">
          <label class="block font-bold text-slate-700 text-xs">Update Booking Status</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="s in ['pending', 'contacted', 'confirmed', 'completed', 'cancelled']"
              :key="s"
              type="button"
              @click="updateStatus(s)"
              class="py-2 rounded-xl text-xs font-bold capitalize transition-all border"
              :class="reservation.status === s ? 'bg-primary text-white border-primary shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'"
            >
              {{ s }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  MessageCircle,
  Phone
} from 'lucide-vue-next'

const props = defineProps<{
  reservation: any
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
  'updated': [res: any]
}>()

const { formatPrice } = useCurrency()

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-300'
    case 'contacted': return 'bg-sky-100 text-sky-800 border border-sky-300'
    case 'confirmed': return 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    case 'completed': return 'bg-purple-100 text-purple-800 border border-purple-300'
    case 'cancelled': return 'bg-rose-100 text-rose-800 border border-rose-300'
    default: return 'bg-slate-100 text-slate-800'
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

const whatsappUrl = computed(() => {
  if (!props.reservation) return ''
  const phone = props.reservation.customer.phone.replace(/[^0-9]/g, '')
  const formattedPhone = phone.startsWith('0') ? `962${phone.slice(1)}` : phone
  const text = encodeURIComponent(
    `Hello ${props.reservation.customer.first_name}, thank you for your booking with AKM Motor City regarding the ${props.reservation.car.name} (Booking Reference: ${props.reservation.hash}). When is a convenient time to schedule your showroom visit?`
  )
  return `https://wa.me/${formattedPhone}?text=${text}`
})

const updateStatus = async (newStatus: string) => {
  try {
    const res = await $fetch<any>(`/api/admin/reservations/${props.reservation.id}`, {
      method: 'PATCH',
      body: { status: newStatus }
    })
    emit('updated', res.data)
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Failed to update status')
  }
}
</script>

