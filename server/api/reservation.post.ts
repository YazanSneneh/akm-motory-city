import { getSiteData, addReservation } from '~/server/utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { car_id, first_name, last_name, phone, email, payment_method, notes } = body

  if (!car_id || !first_name || !phone) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing required reservation fields'
    })
  }

  const siteData = getSiteData()
  const car = siteData.cars.find((c: any) => c.id === parseInt(car_id))
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Car not found'
    })
  }

  const hash = 'AKM-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  const reservationDate = new Date().toISOString()

  const newReservation = addReservation({
    id: 'res-' + Date.now(),
    hash,
    date: reservationDate,
    status: 'pending',
    customer: {
      first_name,
      last_name,
      phone,
      email: email || ''
    },
    car: {
      id: car.id,
      name: car.name_api,
      name_ar: car.name_ar,
      price: car.price,
      reservation_amount: car.reservation_amount || '100.00',
      image: car.images && car.images[0] ? car.images[0].url : null
    },
    payment_method: payment_method || 'mastercard',
    notes: notes || 'New online reservation'
  })

  // Increment reserved count if total_units specified
  if (typeof car.reserved_count === 'number') {
    car.reserved_count++
    if (car.total_units && car.reserved_count >= car.total_units) {
      car.is_full = true
    }
  }

  return {
    success: true,
    message: 'Reservation booked successfully',
    data: newReservation
  }
})
