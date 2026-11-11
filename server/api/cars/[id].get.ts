import { getSiteData } from '~/server/utils/store'

export default defineEventHandler((event) => {
  const idStr = getRouterParam(event, 'id')
  const id = parseInt(idStr || '0')

  const siteData = getSiteData()
  const car = siteData.cars.find((c: any) => c.id === id)

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Car not found'
    })
  }

  // Find related cars (same brand or body, excluding current car)
  const brand = car.attributes?.find((a: any) => a.name === 'Brand')?.value
  const body = car.attributes?.find((a: any) => a.name === 'Body')?.value

  const related = siteData.cars
    .filter((c: any) => c.id !== id && (
      c.attributes?.find((a: any) => a.name === 'Brand')?.value === brand ||
      c.attributes?.find((a: any) => a.name === 'Body')?.value === body
    ))
    .slice(0, 4)

  return {
    success: true,
    data: {
      ...car,
      related_cars: related
    }
  }
})
