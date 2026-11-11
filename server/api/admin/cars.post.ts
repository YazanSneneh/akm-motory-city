import { getSiteData, saveSiteData } from '~/server/utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const siteData = getSiteData()

  const newId = Math.max(...siteData.cars.map((c: any) => c.id), 100) + 1

  const newCar = {
    id: newId,
    name_api: body.name_api || 'New Model',
    name_ar: body.name_ar || body.name_api || 'موديل جديد',
    price: body.price ? parseFloat(body.price).toFixed(2) : '25000.00',
    show_price: body.show_price !== false,
    has_offer: !!body.has_offer,
    offer_price: body.offer_price || null,
    offer_ends_at: null,
    reservation_amount: '100.00',
    total_units: parseInt(body.total_units || '1'),
    reserved_count: 0,
    is_full: !!body.is_full,
    is_featured: !!body.is_featured,
    is_used: !!body.is_used,
    views_count: 1,
    images: body.images && body.images.length > 0 ? body.images : [
      {
        id: Date.now(),
        is_main: true,
        url: body.image_url || 'https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp'
      }
    ],
    attributes: [
      { name: 'Brand', value: body.brand || 'Mazda' },
      { name: 'Model', value: body.model || body.name_api || 'Model' },
      { name: 'Body', value: body.body || 'SUV' },
      { name: 'Transmission', value: body.transmission || 'Automatic' },
      { name: 'Drive Type', value: body.drive_type || 'AWD' },
      { name: 'Engine Type', value: body.engine_type || 'Gasoline' },
      { name: 'Wheel Type', value: body.wheel_type || 'Alloy' },
      { name: 'Condition', value: body.is_used ? 'Used' : 'New' }
    ],
    extra_attributes: [
      { name: 'Model Year', value: body.model_year || '2026' },
      { name: 'Performance', value: body.performance || '180 Horsepower' },
      { name: 'Exterior Color', value: body.exterior_color || 'Metallic Silver' },
      { name: 'Interior Color', value: body.interior_color || 'Black Leather' },
      { name: 'Upholstery Material', value: body.upholstery || 'Leather' }
    ],
    created_at: new Date().toISOString(),
    description_api: body.description_api || 'Certified vehicle available for inspection and immediate delivery at AKM Motor City Amman showroom.',
    description_ar: body.description_ar || 'سيارة معتمدة متاحة للمعاينة والتسليم الفوري في معرض مدينة الخياط للسيارات عمّان.',
    features: body.features || [
      { id: 1, name_api: 'Leather Seats', name_ar: 'مقاعد جلدية' },
      { id: 2, name_api: 'Apple CarPlay & Android Auto', name_ar: 'أبل كاربلاي وأندرويد أوتو' },
      { id: 3, name_api: 'Sunroof', name_ar: 'فتحة سقف' },
      { id: 4, name_api: 'Rear Camera & Parking Sensors', name_ar: 'كاميرا خلفية وحساسات اصطفاف' },
      { id: 5, name_api: 'Blind Spot Monitoring', name_ar: 'نظام مراقبة النقطة العمياء' }
    ],
    threesixty: []
  }

  siteData.cars.unshift(newCar)
  saveSiteData(siteData)

  return {
    success: true,
    message: 'Vehicle added to inventory successfully',
    data: newCar
  }
})

