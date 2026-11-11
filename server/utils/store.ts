import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import initialData from '~/data/site-data.json'

export interface Reservation {
  id: string
  hash: string
  date: string
  status: 'pending' | 'confirmed' | 'contacted' | 'completed' | 'cancelled'
  customer: {
    first_name: string
    last_name: string
    phone: string
    email?: string
  }
  car: {
    id: number
    name: string
    name_ar?: string
    price: string
    reservation_amount: string
    image?: string | null
  }
  payment_method: string
  notes?: string
}

export interface DealershipSettings {
  phone: string
  whatsapp: string
  address: string
  address_ar: string
  working_hours_en: string
  working_hours_ar: string
}

const defaultDealershipSettings: DealershipSettings = {
  phone: '0791663333',
  whatsapp: '+96265777777',
  address: 'Bayader - Amman, Hashemite Kingdom of Jordan',
  address_ar: 'البيادر - عمّان، المملكة الأردنية الهاشمية',
  working_hours_en: 'Sat - Thu: 9:00 AM - 8:00 PM',
  working_hours_ar: 'السبت - الخميس: 9:00 ص - 8:00 م'
}

const defaultReservations: Reservation[] = [
  {
    id: 'res-1',
    hash: 'AKM-9X72BA',
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'pending',
    customer: {
      first_name: 'Zaid',
      last_name: 'Al-Majali',
      phone: '0795551234',
      email: 'zaid.majali@gmail.com'
    },
    car: {
      id: 107,
      name: 'Mustang GT Premium',
      name_ar: 'Mustang GT Premium',
      price: '63000.00',
      reservation_amount: '100.00',
      image: 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'
    },
    payment_method: 'mastercard',
    notes: 'Customer asked about insurance options and warranty coverage.'
  },
  {
    id: 'res-2',
    hash: 'AKM-4K89PQ',
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'contacted',
    customer: {
      first_name: 'Rania',
      last_name: 'Haddad',
      phone: '0798889911',
      email: 'rania.haddad@outlook.com'
    },
    car: {
      id: 93,
      name: 'Aion ES EV',
      name_ar: 'ايون اس',
      price: '17000.00',
      reservation_amount: '100.00',
      image: 'https://cms-motorcity.akm.jo/storage/cars/8844d60a33a100f817289b33fad351758862a138.webp'
    },
    payment_method: 'apple_pay',
    notes: 'Test drive scheduled for Thursday 4:00 PM at Bayader.'
  },
  {
    id: 'res-3',
    hash: 'AKM-1B23LM',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'confirmed',
    customer: {
      first_name: 'Omar',
      last_name: 'Khasawneh',
      phone: '0777123987',
      email: 'omar.k@yahoo.com'
    },
    car: {
      id: 72,
      name: 'Ford Territory Titanium',
      name_ar: 'فورد تيريتوري تيتانيوم',
      price: '28500.00',
      reservation_amount: '100.00',
      image: 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'
    },
    payment_method: 'whatsapp',
    notes: 'Deposit received. Preparing registration paperwork.'
  }
]

// Paths for persistence
const localDataPath = path.resolve(process.cwd(), 'data/site-data.json')
const localReservationsPath = path.resolve(process.cwd(), 'data/reservations.json')
const tmpDataPath = path.join(os.tmpdir(), 'akm_site_data.json')
const tmpReservationsPath = path.join(os.tmpdir(), 'akm_reservations.json')

// In-memory runtime state
let siteState: any = null
let reservationsState: Reservation[] = []

// Try to initialize Netlify Blobs store safely
let blobStore: any = null
const getNetlifyBlobStore = async () => {
  if (blobStore) return blobStore
  try {
    const { getStore } = await import('@netlify/blobs')
    blobStore = getStore('akm-dealership-data')
    return blobStore
  } catch {
    return null
  }
}

// Initial state loading function
const initStore = () => {
  if (siteState) return

  // 1. Check local file if updated
  if (fs.existsSync(localDataPath)) {
    try {
      const content = fs.readFileSync(localDataPath, 'utf8')
      siteState = JSON.parse(content)
    } catch {}
  }

  // 2. Check /tmp backup
  if (!siteState && fs.existsSync(tmpDataPath)) {
    try {
      const content = fs.readFileSync(tmpDataPath, 'utf8')
      siteState = JSON.parse(content)
    } catch {}
  }

  // 3. Fallback to bundled initialData
  if (!siteState) {
    siteState = JSON.parse(JSON.stringify(initialData))
  }

  // Ensure dealership_settings exists
  if (!siteState.dealership_settings) {
    siteState.dealership_settings = { ...defaultDealershipSettings }
  }

  // Initialize reservations
  if (fs.existsSync(localReservationsPath)) {
    try {
      reservationsState = JSON.parse(fs.readFileSync(localReservationsPath, 'utf8'))
    } catch {}
  }
  if ((!reservationsState || reservationsState.length === 0) && fs.existsSync(tmpReservationsPath)) {
    try {
      reservationsState = JSON.parse(fs.readFileSync(tmpReservationsPath, 'utf8'))
    } catch {}
  }
  if (!reservationsState || reservationsState.length === 0) {
    reservationsState = [...defaultReservations]
  }

  // Background check for Netlify Blobs
  getNetlifyBlobStore().then(async (store) => {
    if (!store) return
    try {
      const remoteSite = await store.get('site-data', { type: 'json' })
      if (remoteSite && Array.isArray(remoteSite.cars) && remoteSite.cars.length > 0) {
        siteState = remoteSite
      }
      const remoteReservations = await store.get('reservations', { type: 'json' })
      if (remoteReservations && Array.isArray(remoteReservations)) {
        reservationsState = remoteReservations
      }
    } catch {}
  }).catch(() => {})
}

// Ensure store is ready
initStore()

export const getSiteData = () => {
  initStore()
  return siteState
}

export const saveSiteData = (newData: any) => {
  siteState = newData

  // Automatically update dynamic filters based on cars inventory
  const uniqueBrands = [...new Set(newData.cars.map((c: any) => {
    return c.attributes?.find((a: any) => a.name === 'Brand')?.value
  }).filter(Boolean))]

  if (uniqueBrands.length > 0 && newData.filters) {
    newData.filters.brands = uniqueBrands.map(name => ({ id: name, name }))
  }

  const jsonStr = JSON.stringify(newData, null, 2)

  // 1. Save to local data directory if writable
  try {
    fs.writeFileSync(localDataPath, jsonStr, 'utf8')
  } catch {}

  // 2. Save to /tmp
  try {
    fs.writeFileSync(tmpDataPath, jsonStr, 'utf8')
  } catch {}

  // 3. Async save to Netlify Blobs if in Netlify runtime
  getNetlifyBlobStore().then(async (store) => {
    if (store) {
      await store.setJSON('site-data', newData)
    }
  }).catch(() => {})
}

export const getDealershipSettings = (): DealershipSettings => {
  initStore()
  return siteState.dealership_settings || { ...defaultDealershipSettings }
}

export const saveDealershipSettings = (settings: Partial<DealershipSettings>) => {
  initStore()
  siteState.dealership_settings = {
    ...siteState.dealership_settings,
    ...settings
  }
  saveSiteData(siteState)
  return siteState.dealership_settings
}

export const getReservations = (): Reservation[] => {
  initStore()
  return reservationsState
}

export const addReservation = (res: Reservation) => {
  initStore()
  reservationsState.unshift(res)
  saveReservations()
  return res
}

export const updateReservationStatus = (hashOrId: string, status: Reservation['status'], notes?: string) => {
  initStore()
  const item = reservationsState.find(r => r.hash === hashOrId || r.id === hashOrId)
  if (item) {
    item.status = status
    if (notes !== undefined) item.notes = notes
    saveReservations()
    return item
  }
  return null
}

const saveReservations = () => {
  const jsonStr = JSON.stringify(reservationsState, null, 2)
  try {
    fs.writeFileSync(localReservationsPath, jsonStr, 'utf8')
  } catch {}
  try {
    fs.writeFileSync(tmpReservationsPath, jsonStr, 'utf8')
  } catch {}
  getNetlifyBlobStore().then(async (store) => {
    if (store) {
      await store.setJSON('reservations', reservationsState)
    }
  }).catch(() => {})
}
