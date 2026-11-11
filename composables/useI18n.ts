import siteData from '~/data/site-data.json'

export type Locale = 'en' | 'ar'

export const useI18n = () => {
  const locale = useCookie<Locale>('locale', {
    default: () => 'en',
    watch: true
  })

  const translations = siteData.translations as Record<Locale, Record<string, string>>

  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale
    if (import.meta.client) {
      document.documentElement.lang = newLocale
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    }
  }

  const isRTL = computed(() => locale.value === 'ar')

  const t = (key: string, fallback?: string): string => {
    const current = translations[locale.value]
    if (current && current[key]) {
      return current[key]
    }
    // Fallback to English if Arabic is missing
    if (translations.en && translations.en[key]) {
      return translations.en[key]
    }
    return fallback || key
  }

  // Sync on client mount
  onMounted(() => {
    document.documentElement.lang = locale.value
    document.documentElement.dir = isRTL.value ? 'rtl' : 'ltr'
  })

  return {
    locale,
    setLocale,
    isRTL,
    t
  }
}

