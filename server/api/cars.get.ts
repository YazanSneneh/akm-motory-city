import { getSiteData } from '~/server/utils/store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = (query.q as string || '').toLowerCase().trim()
  const brand = query.brand as string
  const body = query.body as string
  const engineType = query.engine_type as string
  const transmission = query.transmission as string
  const driveType = query.drive_type as string
  const condition = query.condition as string // 'new' | 'used'
  const minPrice = query.min_price ? parseFloat(query.min_price as string) : undefined
  const maxPrice = query.max_price ? parseFloat(query.max_price as string) : undefined
  const sort = query.sort as string // 'price_asc' | 'price_desc' | 'views'
  const page = parseInt(query.page as string || '1')
  const limit = parseInt(query.limit as string || '12')

  const siteData = getSiteData()
  let filtered = [...siteData.cars]

  if (q) {
    filtered = filtered.filter(car => {
      const nameEn = (car.name_api || '').toLowerCase()
      const nameAr = (car.name_ar || '').toLowerCase()
      const brandAttr = car.attributes?.find((a: any) => a.name === 'Brand')?.value?.toLowerCase() || ''
      const bodyAttr = car.attributes?.find((a: any) => a.name === 'Body')?.value?.toLowerCase() || ''
      return nameEn.includes(q) || nameAr.includes(q) || brandAttr.includes(q) || bodyAttr.includes(q)
    })
  }

  if (brand) {
    filtered = filtered.filter(car => {
      const b = car.attributes?.find((a: any) => a.name === 'Brand')?.value
      return b && b.toLowerCase() === brand.toLowerCase()
    })
  }

  if (body) {
    filtered = filtered.filter(car => {
      const b = car.attributes?.find((a: any) => a.name === 'Body')?.value
      return b && b.toLowerCase() === body.toLowerCase()
    })
  }

  if (engineType) {
    filtered = filtered.filter(car => {
      const e = car.attributes?.find((a: any) => a.name === 'Engine Type')?.value
      return e && e.toLowerCase() === engineType.toLowerCase()
    })
  }

  if (transmission) {
    filtered = filtered.filter(car => {
      const t = car.attributes?.find((a: any) => a.name === 'Transmission')?.value
      return t && t.toLowerCase() === transmission.toLowerCase()
    })
  }

  if (driveType) {
    filtered = filtered.filter(car => {
      const d = car.attributes?.find((a: any) => a.name === 'Drive Type')?.value
      return d && d.toLowerCase() === driveType.toLowerCase()
    })
  }

  if (condition) {
    if (condition === 'new') {
      filtered = filtered.filter(car => !car.is_used)
    } else if (condition === 'used') {
      filtered = filtered.filter(car => car.is_used)
    }
  }

  if (minPrice !== undefined && !isNaN(minPrice)) {
    filtered = filtered.filter(car => parseFloat(car.price || '0') >= minPrice)
  }

  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    filtered = filtered.filter(car => parseFloat(car.price || '0') <= maxPrice)
  }

  if (sort === 'price_asc') {
    filtered.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'))
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'))
  } else if (sort === 'views') {
    filtered.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
  }

  const total = filtered.length
  const startIndex = (page - 1) * limit
  const paginated = filtered.slice(startIndex, startIndex + limit)

  return {
    success: true,
    total,
    page,
    limit,
    total_pages: Math.ceil(total / limit),
    data: paginated
  }
})
