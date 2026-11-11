<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
    <AppHeader />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Floating Compare Tray & Modal -->
    <CompareDrawer />
    <CompareModal />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { isRTL, locale } = useI18n()
const { refresh } = useSiteData()

// Load live data from the server during SSR and hydration
await useAsyncData('akm_init_site_data', async () => {
  await refresh()
  return true
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: computed(() => (isRTL.value ? 'rtl' : 'ltr'))
  }
})
</script>
