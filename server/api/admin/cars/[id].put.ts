import { getSiteData, saveSiteData } from '~/server/utils/store'

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, 'id')
  const id = parseInt(idStr || '0')
  const body = await readBody(event)

  const siteData = getSiteData()
  const carIndex = siteData.cars.findIndex((c: any) => c.id === id)

  if (carIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Vehicle not found'
    })
  }

  const existingCar = siteData.cars[carIndex]

  // Merge top-level properties
  if (body.name_api !== undefined) existingCar.name_api = body.name_api
  if (body.name_ar !== undefined) existingCar.name_ar = body.name_ar
  if (body.price !== undefined) existingCar.price = parseFloat(body.price).toFixed(2)
  if (body.show_price !== undefined) existingCar.show_price = !!body.show_price
  if (body.has_offer !== undefined) existingCar.has_offer = !!body.has_offer
  if (body.offer_price !== undefined) existingCar.offer_price = body.offer_price
  if (body.is_full !== undefined) existingCar.is_full = !!body.is_full
  if (body.is_featured !== undefined) existingCar.is_featured = !!body.is_featured
  if (body.is_used !== undefined) existingCar.is_used = !!body.is_used
  if (body.total_units !== undefined) existingCar.total_units = parseInt(body.total_units)
  if (body.reserved_count !== undefined) existingCar.reserved_count = parseInt(body.reserved_count)
  if (body.description_api !== undefined) existingCar.description_api = body.description_api
  if (body.description_ar !== undefined) existingCar.description_ar = body.description_ar

  // Update attributes if passed
  if (body.brand) {
    const attr = existingCar.attributes?.find((a: any) => a.name === 'Brand')
    if (attr) attr.value = body.brand
  }
  if (body.body) {
    const attr = existingCar.attributes?.find((a: any) => a.name === 'Body')
    if (attr) attr.value = body.body
  }
  if (body.engine_type) {
    const attr = existingCar.attributes?.find((a: any) => a.name === 'Engine Type')
    if (attr) attr.value = body.engine_type
  }
  if (body.transmission) {
    const attr = existingCar.attributes?.find((a: any) => a.name === 'Transmission')
    if (attr) attr.value = body.transmission
  }
  if (body.drive_type) {
    const attr = existingCar.attributes?.find((a: any) => a.name === 'Drive Type')
    if (attr) attr.value = body.drive_type
  }
  if (body.model_year) {
    const attr = existingCar.extra_attributes?.find((a: any) => a.name === 'Model Year')
    if (attr) attr.value = body.model_year
  }
  if (body.performance) {
    const attr = existingCar.extra_attributes?.find((a: any) => a.name === 'Performance')
    if (attr) attr.value = body.performance
  }

  saveSiteData(siteData)

  return {
    success: true,
    message: 'Vehicle updated successfully',
    data: existingCar
  }
})

