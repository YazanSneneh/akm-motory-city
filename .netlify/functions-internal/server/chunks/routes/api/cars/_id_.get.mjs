import { d as defineEventHandler, b as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { s as siteData } from '../../../_/site-data.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const _id__get = defineEventHandler((event) => {
  var _a, _b;
  const idStr = getRouterParam(event, "id");
  const id = parseInt(idStr || "0");
  const car = siteData.cars.find((c) => c.id === id);
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: "Car not found"
    });
  }
  const brand = (_a = car.attributes.find((a) => a.name === "Brand")) == null ? void 0 : _a.value;
  const body = (_b = car.attributes.find((a) => a.name === "Body")) == null ? void 0 : _b.value;
  const related = siteData.cars.filter((c) => {
    var _a2, _b2;
    return c.id !== id && (((_a2 = c.attributes.find((a) => a.name === "Brand")) == null ? void 0 : _a2.value) === brand || ((_b2 = c.attributes.find((a) => a.name === "Body")) == null ? void 0 : _b2.value) === body);
  }).slice(0, 4);
  return {
    success: true,
    data: {
      ...car,
      related_cars: related
    }
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
