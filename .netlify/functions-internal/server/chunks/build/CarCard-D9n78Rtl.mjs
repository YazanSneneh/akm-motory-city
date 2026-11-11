import { a as useI18n, d as useCurrency, f as useFavorites, g as useCompare, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Rotate3d, ArrowLeftRight, Heart, Eye, Car, Zap, Gauge, Compass, ChevronRight } from 'lucide-vue-next';
import { _ as _export_sfc } from './_plugin-vue_export-helper-8jYXDYbZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CarCard",
  __ssrInlineRender: true,
  props: {
    car: {}
  },
  setup(__props) {
    const props = __props;
    const { isRTL, t } = useI18n();
    const { formatPrice } = useCurrency();
    const { isFavorite } = useFavorites();
    const { isComparing } = useCompare();
    const activeImageIndex = ref(0);
    const carTitle = computed(() => {
      if (isRTL.value && props.car.name_ar) {
        return props.car.name_ar;
      }
      return props.car.name_api || props.car.name || "AKM Vehicle";
    });
    const currentImage = computed(() => {
      if (props.car.images && props.car.images.length > 0) {
        const img = props.car.images[activeImageIndex.value] || props.car.images[0];
        return img.url;
      }
      return "https://cms-motorcity.akm.jo/storage/cars/c174a5e9dc7a2d33c30b85a430d1cba7c9065551.webp";
    });
    const has360 = computed(() => {
      return Array.isArray(props.car.threesixty) && props.car.threesixty.length > 0;
    });
    const brandName = computed(() => {
      var _a, _b;
      const brand = (_b = (_a = props.car.attributes) == null ? void 0 : _a.find((a) => a.name === "Brand")) == null ? void 0 : _b.value;
      return brand || "AKM";
    });
    const bodyShape = computed(() => {
      var _a, _b;
      return (_b = (_a = props.car.attributes) == null ? void 0 : _a.find((a) => a.name === "Body")) == null ? void 0 : _b.value;
    });
    const engineType = computed(() => {
      var _a, _b;
      return (_b = (_a = props.car.attributes) == null ? void 0 : _a.find((a) => a.name === "Engine Type")) == null ? void 0 : _b.value;
    });
    const transmission = computed(() => {
      var _a, _b;
      return (_b = (_a = props.car.attributes) == null ? void 0 : _a.find((a) => a.name === "Transmission")) == null ? void 0 : _b.value;
    });
    const driveType = computed(() => {
      var _a, _b;
      return (_b = (_a = props.car.attributes) == null ? void 0 : _a.find((a) => a.name === "Drive Type")) == null ? void 0 : _b.value;
    });
    const modelYear = computed(() => {
      var _a, _b;
      return (_b = (_a = props.car.extra_attributes) == null ? void 0 : _a.find((a) => a.name === "Model Year")) == null ? void 0 : _b.value;
    });
    const unitsLeft = computed(() => {
      if (props.car.total_units && typeof props.car.reserved_count === "number") {
        return props.car.total_units - props.car.reserved_count;
      }
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-primary/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col relative" }, _attrs))} data-v-bdbfc9aa><div class="absolute top-3 end-3 z-20 flex items-center gap-1.5" data-v-bdbfc9aa>`);
      if (unref(has360)) {
        _push(`<span class="px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-sky-400 tracking-wider uppercase flex items-center gap-1 shadow-sm" title="360\xB0 Interactive Viewer Available" data-v-bdbfc9aa>`);
        _push(ssrRenderComponent(unref(Rotate3d), { class: "w-3 h-3 text-sky-400 animate-spin-slow" }, null, _parent));
        _push(`<span data-v-bdbfc9aa>360\xB0</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([unref(isComparing)(__props.car.id) ? "bg-primary text-white ring-2 ring-primary/30" : "bg-white/90 text-slate-700 hover:bg-white hover:text-primary", "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md"])}"${ssrRenderAttr("title", unref(isComparing)(__props.car.id) ? unref(t)("website_car_card_remove_from_compare", "Remove from Compare") : unref(t)("website_car_card_add_to_compare", "Add to Compare"))} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(ArrowLeftRight), { class: "w-4 h-4" }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([unref(isFavorite)(__props.car.id) ? "bg-rose-50 text-rose-500 ring-2 ring-rose-300" : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500", "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md"])}"${ssrRenderAttr("title", unref(isFavorite)(__props.car.id) ? "Remove from favorites" : "Add to favorites")} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(Heart), {
        class: ["w-4 h-4", unref(isFavorite)(__props.car.id) ? "fill-rose-500 text-rose-500" : ""]
      }, null, _parent));
      _push(`</button></div><div class="absolute top-3 start-3 z-20 flex flex-col gap-1.5 items-start" data-v-bdbfc9aa><span class="${ssrRenderClass([__props.car.is_used ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-600 text-white", "px-2.5 py-1 rounded-lg text-xs font-black tracking-wide uppercase shadow-sm"])}" data-v-bdbfc9aa>${ssrInterpolate(__props.car.is_used ? unref(isRTL) ? "\u0645\u0633\u062A\u0639\u0645\u0644 \u0648\u0645\u0641\u062D\u0648\u0635" : "Pre-Owned" : unref(isRTL) ? "\u062C\u062F\u064A\u062F 0 \u0643\u0645" : "Brand New")}</span>`);
      if (__props.car.is_full) {
        _push(`<span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-600 text-white shadow-sm" data-v-bdbfc9aa>${ssrInterpolate(unref(isRTL) ? "\u0645\u062D\u062C\u0648\u0632 \u0628\u0627\u0644\u0643\u0627\u0645\u0644" : "Fully Reserved")}</span>`);
      } else if (unref(unitsLeft) !== null && unref(unitsLeft) <= 2) {
        _push(`<span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-white shadow-sm" data-v-bdbfc9aa>${ssrInterpolate(unref(isRTL) ? `\u0645\u062A\u0628\u0642\u064A ${unref(unitsLeft)} \u0641\u0642\u0637` : `Only ${unref(unitsLeft)} Left`)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/cars/${__props.car.id}`,
        class: "block relative aspect-16/10 bg-slate-100 overflow-hidden cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(currentImage))}${ssrRenderAttr("alt", unref(carTitle))} class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" data-v-bdbfc9aa${_scopeId}>`);
            if (__props.car.images && __props.car.images.length > 1) {
              _push2(`<div class="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity" data-v-bdbfc9aa${_scopeId}><!--[-->`);
              ssrRenderList(__props.car.images.slice(0, 5), (_2, idx) => {
                _push2(`<button class="${ssrRenderClass([unref(activeImageIndex) === idx ? "w-5 bg-white" : "bg-white/60 hover:bg-white", "w-2 h-2 rounded-full transition-all"])}"${ssrRenderAttr("aria-label", `Image slide ${idx + 1}`)} data-v-bdbfc9aa${_scopeId}></button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="absolute bottom-2 end-2 z-10 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white/90 flex items-center gap-1" data-v-bdbfc9aa${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Eye), { class: "w-3 h-3 text-slate-300" }, null, _parent2, _scopeId));
            _push2(`<span data-v-bdbfc9aa${_scopeId}>${ssrInterpolate(__props.car.views_count || 120)}</span></div>`);
          } else {
            return [
              createVNode("img", {
                src: unref(currentImage),
                alt: unref(carTitle),
                class: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500",
                loading: "lazy"
              }, null, 8, ["src", "alt"]),
              __props.car.images && __props.car.images.length > 1 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.car.images.slice(0, 5), (_2, idx) => {
                  return openBlock(), createBlock("button", {
                    key: idx,
                    onMouseenter: withModifiers(($event) => activeImageIndex.value = idx, ["stop", "prevent"]),
                    class: ["w-2 h-2 rounded-full transition-all", unref(activeImageIndex) === idx ? "w-5 bg-white" : "bg-white/60 hover:bg-white"],
                    "aria-label": `Image slide ${idx + 1}`
                  }, null, 42, ["onMouseenter", "aria-label"]);
                }), 128))
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "absolute bottom-2 end-2 z-10 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white/90 flex items-center gap-1" }, [
                createVNode(unref(Eye), { class: "w-3 h-3 text-slate-300" }),
                createVNode("span", null, toDisplayString(__props.car.views_count || 120), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-5 flex-1 flex flex-col justify-between gap-4" data-v-bdbfc9aa><div data-v-bdbfc9aa><div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1" data-v-bdbfc9aa><span data-v-bdbfc9aa>${ssrInterpolate(unref(brandName))}</span>`);
      if (unref(modelYear)) {
        _push(`<span class="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded" data-v-bdbfc9aa>${ssrInterpolate(unref(modelYear))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/cars/${__props.car.id}`,
        class: "font-black text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-1 block leading-snug"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(carTitle))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(carTitle)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100" data-v-bdbfc9aa><div class="flex items-center gap-1.5 truncate"${ssrRenderAttr("title", unref(bodyShape))} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(Car), { class: "w-3.5 h-3.5 text-primary shrink-0" }, null, _parent));
      _push(`<span class="truncate" data-v-bdbfc9aa>${ssrInterpolate(unref(bodyShape) || (unref(isRTL) ? "\u0633\u064A\u062F\u0627\u0646" : "Sedan"))}</span></div><div class="flex items-center gap-1.5 truncate"${ssrRenderAttr("title", unref(engineType))} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(Zap), { class: "w-3.5 h-3.5 text-amber-500 shrink-0" }, null, _parent));
      _push(`<span class="truncate" data-v-bdbfc9aa>${ssrInterpolate(unref(engineType) || (unref(isRTL) ? "\u0628\u0646\u0632\u064A\u0646" : "Gasoline"))}</span></div><div class="flex items-center gap-1.5 truncate"${ssrRenderAttr("title", unref(transmission))} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(Gauge), { class: "w-3.5 h-3.5 text-primary shrink-0" }, null, _parent));
      _push(`<span class="truncate" data-v-bdbfc9aa>${ssrInterpolate(unref(transmission) || (unref(isRTL) ? "\u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643" : "Automatic"))}</span></div><div class="flex items-center gap-1.5 truncate"${ssrRenderAttr("title", unref(driveType))} data-v-bdbfc9aa>`);
      _push(ssrRenderComponent(unref(Compass), { class: "w-3.5 h-3.5 text-primary shrink-0" }, null, _parent));
      _push(`<span class="truncate" data-v-bdbfc9aa>${ssrInterpolate(unref(driveType) || "FWD")}</span></div></div><div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2" data-v-bdbfc9aa><div data-v-bdbfc9aa><div class="text-[11px] font-medium text-slate-400" data-v-bdbfc9aa>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0646\u0642\u062F\u064A" : "Cash Price")}</div><div class="text-xl font-black text-primary tracking-tight" data-v-bdbfc9aa>`);
      if (__props.car.show_price && __props.car.price) {
        _push(`<span data-v-bdbfc9aa>${ssrInterpolate(unref(formatPrice)(__props.car.price))}</span>`);
      } else {
        _push(`<span class="text-base text-slate-600 font-bold" data-v-bdbfc9aa>${ssrInterpolate(unref(t)("website_car_price_on_request", "Price on Request"))}</span>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/cars/${__props.car.id}`,
        class: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-extrabold shadow-sm transition-all group-hover:shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-bdbfc9aa${_scopeId}>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" : "Details")}</span>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", null, toDisplayString(unref(isRTL) ? "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" : "Details"), 1),
              createVNode(unref(ChevronRight), { class: "w-3.5 h-3.5 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdbfc9aa"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=CarCard-D9n78Rtl.mjs.map
