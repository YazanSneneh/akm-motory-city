import { a as useI18n, f as useFavorites, c as useSeoMeta, s as siteData, _ as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_2 } from './CarCard-D9n78Rtl.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Heart } from 'lucide-vue-next';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './_plugin-vue_export-helper-8jYXDYbZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favourite",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL, t } = useI18n();
    const { favorites } = useFavorites();
    useSeoMeta({
      title: "Favorite Cars | AKM Motor City - \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0641\u0636\u0644\u0629",
      description: "View your saved vehicles at AKM Motor City."
    });
    const favCars = computed(() => {
      return siteData.cars.filter((c) => favorites.value.includes(c.id));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CarCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="flex items-center justify-between pb-6 border-b border-slate-200 mb-8"><div><div class="flex items-center gap-2 text-xs text-slate-500 mb-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("website_cars_hero_home", "Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("website_cars_hero_home", "Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span>/</span><span class="text-slate-900 font-bold">${ssrInterpolate(unref(t)("website_navbar_favourite", "Favorites"))}</span></div><h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">`);
      _push(ssrRenderComponent(unref(Heart), { class: "w-7 h-7 text-rose-500 fill-rose-500" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(t)("website_navbar_favourite", "Favorites"))}</span></h1><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? `\u0644\u062F\u064A\u0643 ${unref(favCars).length} \u0633\u064A\u0627\u0631\u0629 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643` : `You have ${unref(favCars).length} saved vehicles in your wishlist`)}</p></div>`);
      if (unref(favCars).length > 0) {
        _push(`<button class="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors">${ssrInterpolate(unref(t)("website_cars_clear_all", "Clear Wishlist"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(favCars).length === 0) {
        _push(`<div class="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4"><div class="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">`);
        _push(ssrRenderComponent(unref(Heart), { class: "w-10 h-10" }, null, _parent));
        _push(`</div><h2 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(isRTL) ? "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0641\u0627\u0631\u063A\u0629 \u062D\u0627\u0644\u064A\u0627\u064B" : "Your wishlist is empty")}</h2><p class="text-sm text-slate-500 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0642\u0644\u0628 \u0641\u064A \u0623\u064A \u0633\u064A\u0627\u0631\u0629 \u0644\u062D\u0641\u0638\u0647\u0627 \u0647\u0646\u0627 \u0648\u0645\u0642\u0627\u0631\u0646\u062A\u0647\u0627 \u0623\u0648 \u062D\u062C\u0632\u0647\u0627 \u0641\u064A \u0623\u064A \u0648\u0642\u062A \u0644\u0627\u062D\u0642." : "Click the heart icon on any car card to save your favorite vehicles here for easy access and comparison.")}</p><div class="pt-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cars",
          class: "px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black text-sm shadow-md transition-all inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(isRTL) ? "\u062A\u0635\u0641\u062D \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0622\u0646" : "Browse Inventory Now")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(isRTL) ? "\u062A\u0635\u0641\u062D \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0622\u0646" : "Browse Inventory Now"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
        ssrRenderList(unref(favCars), (car) => {
          _push(ssrRenderComponent(_component_CarCard, {
            key: car.id,
            car
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favourite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=favourite-BeuAlqNR.mjs.map
