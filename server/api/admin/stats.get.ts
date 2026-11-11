import { getSiteData, getReservations } from '~/server/utils/store'

export default defineEventHandler(() => {
  const siteData = getSiteData()
  const reservations = getReservations()

  const totalCars = siteData.cars.length
  const availableCars = siteData.cars.filter((c: any) => !c.is_full).length
  const reservedCars = siteData.cars.filter((c: any) => c.is_full).length
  const brandNewCars = siteData.cars.filter((c: any) => !c.is_used).length
  const preOwnedCars = siteData.cars.filter((c: any) => c.is_used).length

  // Calculate fleet inventory value
  let totalFleetValue = 0
  siteData.cars.forEach((c: any) => {
    const p = parseFloat(c.price || '0')
    if (!isNaN(p)) totalFleetValue += p
  })

  // Calculate total views
  let totalViews = 0
  siteData.cars.forEach((c: any) => {
    totalViews += (c.views_count || 0)
  })

  const pendingBookings = reservations.filter(r => r.status === 'pending').length
  const confirmedBookings = reservations.filter(r => r.status === 'confirmed').length

  // Top 5 viewed cars
  const topViewedCars = [...siteData.cars]
    .sort((a: any, b: any) => (b.views_count || 0) - (a.views_count || 0))
    .slice(0, 5)
    .map((c: any) => ({
      id: c.id,
      name: c.name_api,
      name_ar: c.name_ar,
      price: c.price,
      views_count: c.views_count,
      is_used: c.is_used,
      image: c.images?.[0]?.url
    }))

  // Brand distribution
  const brandCounts: Record<string, number> = {}
  siteData.cars.forEach((c: any) => {
    const b = c.attributes?.find((a: any) => a.name === 'Brand')?.value || 'Other'
    brandCounts[b] = (brandCounts[b] || 0) + 1
  })

  return {
    success: true,
    data: {
      totalCars,
      availableCars,
      reservedCars,
      brandNewCars,
      preOwnedCars,
      totalFleetValue,
      totalViews,
      totalReservations: reservations.length,
      pendingBookings,
      confirmedBookings,
      topViewedCars,
      brandDistribution: Object.entries(brandCounts).map(([name, count]) => ({ name, count }))
    }
  }
})

