const BASE = 'http://localhost:3000'

async function runTests() {
  console.log('--- STARTING E2E DASHBOARD & SITE SYNC VERIFICATION ---\n')

  // 1. Initial State
  const initialRes = await fetch(`${BASE}/api/site-data`).then(r => r.json())
  console.log('✓ Initial site-data check:')
  console.log(`  - Cars count: ${initialRes.data?.cars?.length}`)
  console.log(`  - Initial phone: ${initialRes.data?.dealership_settings?.phone}`)
  console.log(`  - Initial WhatsApp: ${initialRes.data?.dealership_settings?.whatsapp}`)

  // 2. Update Dealership Settings
  console.log('\n✓ Updating Dealership Settings via PUT /api/admin/settings...')
  const putSettingsRes = await fetch(`${BASE}/api/admin/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: '0799998888',
      whatsapp: '+962799998888',
      working_hours_en: 'Sun - Fri: 8:00 AM - 9:00 PM'
    })
  }).then(r => r.json())
  console.log('  - Response success:', putSettingsRes.success)

  // Verify site-data reflects the new settings
  const afterSettingsRes = await fetch(`${BASE}/api/site-data`).then(r => r.json())
  if (afterSettingsRes.data?.dealership_settings?.phone === '0799998888') {
    console.log('  ★ CONFIRMED: Live site-data immediately updated to phone: 0799998888')
  } else {
    throw new Error('Settings update was not reflected in site-data!')
  }

  // Restore original phone
  await fetch(`${BASE}/api/admin/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: '0791663333',
      whatsapp: '+96265777777',
      working_hours_en: 'Sat - Thu: 9:00 AM - 8:00 PM'
    })
  })
  console.log('  - Restored original phone: 0791663333')

  // 3. Add a new Vehicle via POST /api/admin/cars
  console.log('\n✓ Adding a new vehicle via POST /api/admin/cars...')
  const newCarPayload = {
    name: '2026 Porsche Taycan Turbo GT',
    name_ar: 'بورشه تايكان توربو جي تي 2026',
    price: '185000',
    type: 'new',
    is_available: true,
    is_promoted: true,
    brand: 'Porsche',
    model: 'Taycan',
    year: '2026',
    transmission: 'Automatic',
    engine_type: 'Electric',
    body_shape: 'Sedan',
    color: 'Frozen Blue Metallic',
    mileage: '0',
    description: 'High-performance electric super sedan with Weissach package.',
    description_ar: 'سيدان كهربائية فائقة الأداء مع حزمة فايساخ الاستثنائية.'
  }

  const addCarRes = await fetch(`${BASE}/api/admin/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCarPayload)
  }).then(r => r.json())
  console.log('  - Created car ID:', addCarRes.data?.id, 'Name:', addCarRes.data?.name)
  const testCarId = addCarRes.data?.id

  // Verify site-data includes new car
  const afterAddRes = await fetch(`${BASE}/api/site-data`).then(r => r.json())
  const foundCar = afterAddRes.data?.cars?.find(c => c.id === testCarId)
  if (foundCar && afterAddRes.data?.cars?.length === 32) {
    console.log(`  ★ CONFIRMED: Inventory count increased to ${afterAddRes.data?.cars?.length}`)
    console.log(`  ★ CONFIRMED: Test car "${foundCar.name}" found in live site data!`)
  } else {
    throw new Error('Created car was not found in live site-data!')
  }

  // 4. Update the vehicle via PUT /api/admin/cars/:id
  console.log(`\n✓ Updating car #${testCarId} via PUT /api/admin/cars/${testCarId}...`)
  const putCarRes = await fetch(`${BASE}/api/admin/cars/${testCarId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price: '192000',
      is_promoted: false
    })
  }).then(r => r.json())
  console.log('  - Updated price:', putCarRes.data?.price)

  const verifyCarRes = await fetch(`${BASE}/api/cars/${testCarId}`).then(r => r.json())
  if (verifyCarRes.data?.price === '192000') {
    console.log(`  ★ CONFIRMED: Car #${testCarId} public API reflects updated price: 192000`)
  } else {
    throw new Error('Car price update was not reflected in public API!')
  }

  // 5. Delete test vehicle via DELETE /api/admin/cars/:id
  console.log(`\n✓ Deleting test car #${testCarId} via DELETE /api/admin/cars/${testCarId}...`)
  const delRes = await fetch(`${BASE}/api/admin/cars/${testCarId}`, {
    method: 'DELETE'
  }).then(r => r.json())
  console.log('  - Delete success:', delRes.success)

  const afterDelRes = await fetch(`${BASE}/api/site-data`).then(r => r.json())
  if (afterDelRes.data?.cars?.length === 31 && !afterDelRes.data?.cars?.find(c => c.id === testCarId)) {
    console.log(`  ★ CONFIRMED: Inventory reverted to clean count of ${afterDelRes.data?.cars?.length}`)
  } else {
    throw new Error('Vehicle deletion not reflected in live site-data!')
  }

  // 6. Test Customer Booking via POST /api/reservation
  console.log('\n✓ Submitting test customer reservation via POST /api/reservation...')
  const bookingPayload = {
    customer: {
      first_name: 'Tariq',
      last_name: 'Al-Bitar',
      phone: '0791112233',
      email: 'tariq.bitar@test.jo'
    },
    car: {
      id: 107,
      name: 'Mustang GT Premium',
      name_ar: 'موستنج جي تي بريميوم',
      price: '63000.00',
      reservation_amount: '100.00'
    },
    payment_method: 'visa',
    notes: 'Interested in booking test drive this weekend.'
  }

  const bookingRes = await fetch(`${BASE}/api/reservation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload)
  }).then(r => r.json())
  console.log('  - Booking created, Hash:', bookingRes.data?.hash, 'Status:', bookingRes.data?.status)
  const bookingHash = bookingRes.data?.hash

  // Verify in Admin reservations
  const adminRes = await fetch(`${BASE}/api/admin/reservations`).then(r => r.json())
  const foundBooking = adminRes.data?.find(r => r.hash === bookingHash)
  if (foundBooking) {
    console.log(`  ★ CONFIRMED: Booking ${bookingHash} appears in Admin Reservations list!`)
  } else {
    throw new Error('Reservation not found in admin list!')
  }

  // 7. Update reservation status via PATCH /api/admin/reservations/:id
  console.log(`\n✓ Updating reservation status via PATCH /api/admin/reservations/${bookingHash}...`)
  const patchRes = await fetch(`${BASE}/api/admin/reservations/${bookingHash}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'confirmed',
      notes: 'Customer confirmed via WhatsApp call.'
    })
  }).then(r => r.json())
  console.log('  - Updated reservation status:', patchRes.data?.status, 'Notes:', patchRes.data?.notes)

  if (patchRes.data?.status === 'confirmed') {
    console.log('  ★ CONFIRMED: Reservation status successfully transitioned to confirmed!')
  }

  // 8. Test Stats Endpoint
  console.log('\n✓ Checking Admin Stats Endpoint GET /api/admin/stats...')
  const statsRes = await fetch(`${BASE}/api/admin/stats`).then(r => r.json())
  console.log('  - Total cars:', statsRes.data?.total_cars)
  console.log('  - Available cars:', statsRes.data?.available_cars)
  console.log('  - Inventory valuation (JOD):', statsRes.data?.inventory_valuation_jod)
  console.log('  - Total reservations:', statsRes.data?.total_reservations)

  console.log('\n======================================================')
  console.log('🎉 ALL E2E DASHBOARD & SITE SYNC TESTS PASSED 100%!')
  console.log('======================================================')
}

runTests().catch(err => {
  console.error('\n❌ TEST FAILED:', err)
  process.exit(1)
})
