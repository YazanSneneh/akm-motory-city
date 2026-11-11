<template>
  <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        <!-- Brand Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-inner">
              AKM
            </div>
            <div>
              <h3 class="text-white font-extrabold text-lg tracking-tight">AKM MOTOR CITY</h3>
              <p class="text-xs text-slate-400 font-arabic">مدينة الخياط للسيارات</p>
            </div>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ isRTL 
              ? 'اسم تثق به، وعالم من خيارات السيارات المتنوعة. نقدم أفضل السيارات الجديدة والمستعملة في الأردن بأعلى معايير الجودة والضمان.' 
              : 'A name you trust, a world of Automotive Choices. Delivering premier new and verified pre-owned vehicles in Jordan with certified warranties.' 
            }}
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/akmmotorcity?igsh=ZGZha2cxMXc3b3pk"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 flex items-center justify-center text-white transition-all shadow-sm"
              aria-label="Instagram"
            >
              <Instagram class="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/share/1BFERUNnoG/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition-all shadow-sm"
              aria-label="Facebook"
            >
              <Facebook class="w-5 h-5" />
            </a>
            <a
              :href="`https://wa.me/${cleanWhatsAppNumber}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-all shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-white font-bold text-sm tracking-wide uppercase">
            {{ isRTL ? 'روابط سريعة' : 'Quick Navigation' }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-white transition-colors">
                {{ isRTL ? 'الرئيسية' : 'Home' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cars" class="hover:text-white transition-colors">
                {{ isRTL ? 'جميع السيارات والموديلات' : 'All Car Models' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cars?condition=new" class="hover:text-white transition-colors">
                {{ isRTL ? 'سيارات جديدة' : 'New Vehicles' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cars?condition=used" class="hover:text-white transition-colors">
                {{ isRTL ? 'سيارات مستعملة ومفحوصة' : 'Certified Pre-Owned' }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/showroom" class="hover:text-white transition-colors">
                {{ isRTL ? 'المعرض الافتراضي 3D' : 'VR Showroom Experience' }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Popular Brands -->
        <div class="space-y-4">
          <h4 class="text-white font-bold text-sm tracking-wide uppercase">
            {{ isRTL ? 'العلامات التجارية' : 'Top Brands' }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="b in featuredBrands" :key="b">
              <NuxtLink :to="`/cars?brand=${encodeURIComponent(b)}`" class="hover:text-white transition-colors">
                {{ b }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Location -->
        <div class="space-y-4">
          <h4 class="text-white font-bold text-sm tracking-wide uppercase">
            {{ isRTL ? 'معلومات الاتصال والزيارة' : 'Visit & Contact Us' }}
          </h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-primary-300 shrink-0 mt-0.5" />
              <span>{{ isRTL ? dealershipSettings.address_ar : dealershipSettings.address }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-primary-300 shrink-0" />
              <a :href="`tel:${dealershipSettings.phone}`" class="hover:text-white transition-colors dir-ltr">
                {{ dealershipSettings.phone }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-primary-300 shrink-0" />
              <span>{{ isRTL ? dealershipSettings.working_hours_ar : dealershipSettings.working_hours_en }}</span>
            </div>
            <div class="pt-2">
              <NuxtLink
                to="/terms_conditions"
                class="inline-block text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                {{ isRTL ? 'سياسة الحجز والشروط والأحكام القانونية' : 'Booking Terms & Conditions' }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright & Bottom Line -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>
          &copy; {{ new Date().getFullYear() }} AKM Motor City. {{ isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.' }}
        </p>
        <div class="flex items-center gap-6">
          <NuxtLink to="/admin" class="hover:text-sky-400 text-slate-400 font-semibold transition-colors flex items-center gap-1">
            <Lock class="w-3 h-3 text-sky-400" />
            <span>{{ isRTL ? 'بوابة إدارة المعرض' : 'Staff Portal' }}</span>
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/terms_conditions" class="hover:text-slate-300 transition-colors">
            {{ isRTL ? 'الشروط والأحكام' : 'Terms & Conditions' }}
          </NuxtLink>
          <span>•</span>
          <a :href="`https://wa.me/${cleanWhatsAppNumber}`" target="_blank" class="hover:text-slate-300 transition-colors">
            {{ isRTL ? 'الدعم والمساعدة' : 'Support' }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Lock
} from 'lucide-vue-next'

const { isRTL } = useI18n()
const { dealershipSettings, cleanWhatsAppNumber, brands } = useSiteData()

const featuredBrands = computed(() => {
  return brands.value.slice(0, 5)
})
</script>
