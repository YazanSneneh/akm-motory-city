<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 relative overflow-hidden select-none">
    <!-- Luxury Background Ambient Glow -->
    <div class="absolute -top-40 -start-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -end-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-md w-full bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
      <!-- Logo & Branding -->
      <div class="text-center space-y-3 mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-sky-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-primary/40">
          AKM
        </div>
        <div>
          <h1 class="text-2xl font-black tracking-tight text-white">AKM Control Portal</h1>
          <p class="text-xs text-slate-400 mt-1">Dealership Fleet & Online Reservation Management</p>
        </div>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2"
      >
        <AlertCircle class="w-4 h-4 shrink-0" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1.5">Staff Email Address</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              class="w-full bg-slate-800/80 border border-slate-700 rounded-xl ps-10 pe-4 py-3 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="admin@akm.jo"
            />
            <Mail class="w-4 h-4 text-slate-500 absolute start-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full bg-slate-800/80 border border-slate-700 rounded-xl ps-10 pe-10 py-3 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500 font-mono"
              placeholder="••••••••"
            />
            <Lock class="w-4 h-4 text-slate-500 absolute start-3.5 top-3.5" />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute end-3.5 top-3.5 text-slate-500 hover:text-slate-300"
            >
              <EyeOff v-if="showPassword" class="w-4 h-4" />
              <Eye v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Quick Demo Credentials Hint -->
        <div class="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
          <div class="font-bold text-sky-400">Quick Demo Access:</div>
          <div class="flex justify-between font-mono">
            <span>Email: admin@akm.jo</span>
            <span>Pass: akm2026</span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-extrabold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
          <span v-else>Access Dealership Dashboard</span>
        </button>
      </form>

      <!-- Return link -->
      <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-xs text-slate-400 hover:text-white transition-colors">
          &larr; Return to public website
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'

useSeoMeta({
  title: 'AKM Portal Login | Dealership Management'
})

const email = ref('admin@akm.jo')
const password = ref('akm2026')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const { login } = useAdminAuth()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const success = await login(email.value, password.value)
    if (success) {
      router.push('/admin')
    }
  } catch (e: any) {
    errorMessage.value = e.data?.statusMessage || 'Invalid email or password'
  } finally {
    isLoading.value = false
  }
}
</script>

