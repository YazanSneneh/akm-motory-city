<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    @click.self="close"
  >
    <div class="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200">
      <!-- Modal Header -->
      <div class="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <CreditCard class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-900 tracking-tight">
              {{ isSuccess ? (isRTL ? 'تم تأكيد الحجز بنجاح!' : 'Reservation Confirmed!') : t('website_checkout_title', 'Book & Reserve Vehicle') }}
            </h3>
            <p class="text-xs text-slate-500">
              {{ isSuccess ? (isRTL ? 'تم إصدار كود الحجز وتثبيت طلبك' : 'Your booking code has been generated') : (isRTL ? 'حجز فوري للسيارة بدفعة مقدمة 100 دينار فقط' : 'Secure this car with an initial 100 JOD deposit') }}
            </p>
          </div>
        </div>

        <button
          @click="close"
          class="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Car Summary Banner -->
      <div class="p-4 bg-slate-100/70 border-b border-slate-200 flex items-center gap-3">
        <img
          :src="car.images?.[0]?.url"
          class="w-16 h-12 object-cover rounded-lg bg-slate-200 shrink-0"
        />
        <div class="flex-1 truncate">
          <h4 class="font-extrabold text-sm text-slate-900 truncate">
            {{ isRTL && car.name_ar ? car.name_ar : car.name_api }}
          </h4>
          <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>{{ isRTL ? 'سعر السيارة:' : 'Vehicle Price:' }}</span>
            <span class="font-bold text-primary">{{ formatPrice(car.price) }}</span>
          </div>
        </div>
        <div class="text-end">
          <div class="text-[10px] text-slate-500 uppercase font-bold">{{ t('website_checkout_booking_fee', 'Booking Deposit') }}</div>
          <div class="text-base font-black text-emerald-600">100 JOD</div>
        </div>
      </div>

      <!-- Success State Content -->
      <div v-if="isSuccess" class="p-6 text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 class="w-10 h-10" />
        </div>

        <div>
          <h4 class="text-xl font-black text-slate-900">
            {{ isRTL ? 'تهانينا! تم حجز السيارة لك' : 'Congratulations! Vehicle Reserved' }}
          </h4>
          <p class="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
            {{ isRTL
              ? 'تم استلام طلب الحجز بنجاح. سيقوم مستشار مبيعات AKM بالتواصل معك خلال ساعات لإتمام إجراءات التسجيل والاستلام.'
              : 'Your booking has been registered. An AKM sales specialist will contact you shortly to coordinate final registration and pickup.'
            }}
          </p>
        </div>

        <!-- Voucher Box -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-start space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500">{{ isRTL ? 'رقم الحجز المرجعي:' : 'Booking Reference:' }}</span>
            <span class="font-mono font-black text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-md">{{ bookingHash }}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">{{ isRTL ? 'الاسم:' : 'Customer Name:' }}</span>
            <span class="font-bold text-slate-800">{{ form.firstName }} {{ form.lastName }}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">{{ isRTL ? 'الهاتف:' : 'Phone:' }}</span>
            <span class="font-mono font-bold text-slate-800">{{ form.phone }}</span>
          </div>
        </div>

        <!-- Direct WhatsApp Confirmation -->
        <div class="space-y-2">
          <a
            :href="whatsappUrl"
            target="_blank"
            class="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle class="w-5 h-5" />
            <span>{{ isRTL ? 'إرسال تأكيد الحجز عبر واتساب' : 'Confirm via WhatsApp Now' }}</span>
          </a>

          <button
            @click="close"
            class="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            {{ isRTL ? 'إغلاق والعودة للمعرض' : 'Close and return to inventory' }}
          </button>
        </div>
      </div>

      <!-- Booking Form -->
      <form v-else @submit.prevent="submitBooking" class="p-6 space-y-4">
        <!-- Name Fields -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              {{ t('website_checkout_first_name', 'First Name') }} *
            </label>
            <input
              v-model="form.firstName"
              type="text"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800"
              placeholder="e.g. Ahmad"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              {{ t('website_checkout_last_name', 'Last Name') }} *
            </label>
            <input
              v-model="form.lastName"
              type="text"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800"
              placeholder="e.g. Al-Khayyat"
            />
          </div>
        </div>

        <!-- Phone & Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              {{ t('website_checkout_phone', 'Phone Number (Jordan)') }} *
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              dir="ltr"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800 font-mono"
              placeholder="079XXXXXXX"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              {{ t('website_checkout_email', 'Email Address') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:bg-white text-slate-800"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <!-- Payment Method -->
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            {{ t('website_checkout_payment_method', 'Preferred Payment Method') }}
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              @click="form.paymentMethod = 'mastercard'"
              class="p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"
              :class="form.paymentMethod === 'mastercard' ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
            >
              <CreditCard class="w-5 h-5 text-amber-500" />
              <span>Mastercard / Visa</span>
            </button>

            <button
              type="button"
              @click="form.paymentMethod = 'apple_pay'"
              class="p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"
              :class="form.paymentMethod === 'apple_pay' ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
            >
              <Wallet class="w-5 h-5 text-slate-800" />
              <span>Apple Pay</span>
            </button>

            <button
              type="button"
              @click="form.paymentMethod = 'whatsapp'"
              class="p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all"
              :class="form.paymentMethod === 'whatsapp' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'"
            >
              <MessageCircle class="w-5 h-5 text-emerald-600" />
              <span>WhatsApp Booking</span>
            </button>
          </div>
        </div>

        <!-- Terms Agreement Checkbox -->
        <div class="flex items-start gap-2 pt-2">
          <input
            v-model="form.agreeTerms"
            type="checkbox"
            id="terms-check"
            required
            class="w-4 h-4 rounded text-primary focus:ring-primary mt-0.5 accent-primary cursor-pointer"
          />
          <label for="terms-check" class="text-xs text-slate-600 leading-snug cursor-pointer">
            {{ isRTL ? 'أوافق على ' : 'I agree to the ' }}
            <NuxtLink to="/terms_conditions" target="_blank" class="text-primary font-bold hover:underline">
              {{ t('website_terms_conditions', 'Terms & Conditions') }}
            </NuxtLink>
            {{ isRTL ? ' وقواعد حجز السيارات لدى AKM Motor City.' : ' and vehicle reservation policies of AKM Motor City.' }}
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
          <span v-else>{{ isRTL ? 'تأكيد الحجز الآن (100 دينار)' : 'Confirm Booking Deposit (100 JOD)' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  CreditCard,
  Wallet,
  MessageCircle,
  CheckCircle2,
  Loader2
} from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const props = defineProps<{
  car: any
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
}>()

const { isRTL, t } = useI18n()
const { formatPrice } = useCurrency()
const { cleanWhatsAppNumber } = useSiteData()

const isSubmitting = ref(false)
const isSuccess = ref(false)
const bookingHash = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  phone: '079',
  email: '',
  paymentMethod: 'mastercard',
  agreeTerms: true
})

const close = () => {
  isSuccess.value = false
  emit('close')
}

const whatsappUrl = computed(() => {
  const carName = props.car?.name_api || 'Car'
  const text = encodeURIComponent(
    `Hello AKM Motor City, I have submitted a reservation for ${carName} (Booking ID: ${bookingHash.value}). Please contact me regarding the next steps.`
  )
  return `https://wa.me/${cleanWhatsAppNumber.value}?text=${text}`
})

const submitBooking = async () => {
  isSubmitting.value = true
  try {
    const res = await $fetch<any>('/api/reservation', {
      method: 'POST',
      body: {
        car_id: props.car.id,
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        phone: form.value.phone,
        email: form.value.email,
        payment_method: form.value.paymentMethod
      }
    })

    if (res.success) {
      bookingHash.value = res.data.hash
      isSuccess.value = true
      // Trigger confetti celebration
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        })
      }
    }
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Failed to submit reservation')
  } finally {
    isSubmitting.value = false
  }
}
</script>

