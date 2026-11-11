import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { s as siteData } from '../../_/site-data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const reservation_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { car_id, first_name, last_name, phone, email, payment_method } = body;
  if (!car_id || !first_name || !phone) {
    throw createError({
      statusCode: 422,
      statusMessage: "Missing required reservation fields"
    });
  }
  const car = siteData.cars.find((c) => c.id === parseInt(car_id));
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: "Car not found"
    });
  }
  const hash = "AKM-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const reservationDate = (/* @__PURE__ */ new Date()).toISOString();
  return {
    success: true,
    message: "Reservation booked successfully",
    data: {
      hash,
      date: reservationDate,
      status: "confirmed",
      customer: {
        first_name,
        last_name,
        phone,
        email
      },
      car: {
        id: car.id,
        name: car.name_api,
        name_ar: car.name_ar,
        price: car.price,
        reservation_amount: car.reservation_amount || "100.00",
        image: car.images && car.images[0] ? car.images[0].url : null
      },
      payment_method: payment_method || "mastercard"
    }
  };
});

export { reservation_post as default };
//# sourceMappingURL=reservation.post.mjs.map
