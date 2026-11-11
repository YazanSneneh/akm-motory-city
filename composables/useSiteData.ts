import initialStaticData from '~/data/site-data.json'

export interface DealershipContact {
  phone: string
  whatsapp: string
  address: string
  address_ar: string
  working_hours_en: string
  working_hours_ar: string
}

export const useSiteData = () => {
  // Global reactive state shared across all components and SSR hydration
  const siteData = useState<any>('akm_live_site_data', () => {
    return {
      ...initialStaticData,
      dealership_settings: {
        phone: '0791663333',
        whatsapp: '+96265777777',
        address: 'Bayader - Amman, Hashemite Kingdom of Jordan',
        address_ar: 'البيادر - عمّان، المملكة الأردنية الهاشمية',
        working_hours_en: 'Sat - Thu: 9:00 AM - 8:00 PM',
        working_hours_ar: 'السبت - الخميس: 9:00 ص - 8:00 م'
      }
    }
  })

  const isLoading = useState('akm_site_data_loading', () => false)

  // Fetch live site data from Nitro API
  const refresh = async () => {
    try {
      isLoading.value = true
      const res = await $fetch<any>('/api/site-data')
      if (res && res.success && res.data) {
        siteData.value = res.data
      }
    } catch (e) {
      console.warn('Could not fetch live site data, using existing state:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Reactive accessors
  const cars = computed<any[]>(() => siteData.value?.cars || [])
  const settings = computed(() => siteData.value?.settings || {})
  const dealershipSettings = computed<DealershipContact>(() => {
    return siteData.value?.dealership_settings || {
      phone: '0791663333',
      whatsapp: '+96265777777',
      address: 'Bayader - Amman, Hashemite Kingdom of Jordan',
      address_ar: 'البيادر - عمّان، المملكة الأردنية الهاشمية',
      working_hours_en: 'Sat - Thu: 9:00 AM - 8:00 PM',
      working_hours_ar: 'السبت - الخميس: 9:00 ص - 8:00 م'
    }
  })

  // Format WhatsApp number cleanly for URLs (e.g. 96265777777)
  const cleanWhatsAppNumber = computed(() => {
    const raw = dealershipSettings.value.whatsapp || '96265777777'
    const digits = raw.replace(/[^0-9]/g, '')
    if (digits.startsWith('0')) {
      return `962${digits.slice(1)}`
    }
    return digits
  })

  const filters = computed(() => siteData.value?.filters || {})
  const terms = computed(() => siteData.value?.terms || [])
  const translations = computed(() => siteData.value?.translations || initialStaticData.translations)

  // Dynamic brand list derived from actual live inventory
  const brands = computed(() => {
    const unique = new Set<string>()
    cars.value.forEach(car => {
      const b = car.attributes?.find((a: any) => a.name === 'Brand')?.value
      if (b) unique.add(b)
    })
    if (unique.size === 0 && siteData.value?.filters?.brands) {
      return siteData.value.filters.brands.map((b: any) => b.name)
    }
    return Array.from(unique)
  })

  // Dynamic body shapes list derived from actual live inventory
  const bodies = computed(() => {
    const unique = new Set<string>()
    cars.value.forEach(car => {
      const b = car.attributes?.find((a: any) => a.name === 'Body')?.value
      if (b) unique.add(b)
    })
    if (unique.size === 0 && siteData.value?.filters?.bodies) {
      return siteData.value.filters.bodies.map((b: any) => b.name)
    }
    return Array.from(unique)
  })

  // Instant local state mutation helpers for dashboard actions
  const updateCarLocally = (updatedCar: any) => {
    if (!siteData.value?.cars) return
    const idx = siteData.value.cars.findIndex((c: any) => c.id === updatedCar.id)
    if (idx !== -1) {
      siteData.value.cars[idx] = { ...siteData.value.cars[idx], ...updatedCar }
    } else {
      siteData.value.cars.unshift(updatedCar)
    }
  }

  const removeCarLocally = (carId: number) => {
    if (!siteData.value?.cars) return
    siteData.value.cars = siteData.value.cars.filter((c: any) => c.id !== carId)
  }

  const updateSettingsLocally = (newSettings: Partial<DealershipContact>) => {
    if (!siteData.value) return
    siteData.value.dealership_settings = {
      ...siteData.value.dealership_settings,
      ...newSettings
    }
  }

  const findCar = (id: number) => {
    return cars.value.find((c: any) => c.id === id)
  }

  return {
    siteData,
    cars,
    settings,
    dealershipSettings,
    cleanWhatsAppNumber,
    filters,
    terms,
    translations,
    brands,
    bodies,
    isLoading,
    refresh,
    updateCarLocally,
    removeCarLocally,
    updateSettingsLocally,
    findCar
  }
}

