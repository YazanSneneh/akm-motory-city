import { a as useI18n, c as useSeoMeta, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Glasses, Maximize2, Move, Car, CalendarCheck } from 'lucide-vue-next';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "showroom",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL, t } = useI18n();
    ref(null);
    useSeoMeta({
      title: "3D VR Virtual Showroom | AKM Motor City Jordan",
      description: "Walk through AKM Motor City virtually with our interactive 360-degree showroom tour."
    });
    const tourUrl = computed(() => {
      const lang = isRTL.value ? "ar" : "en";
      return `https://tourmkr.com/F1zGuCY9xc/47655706p&269h&90t/lang:${lang}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="mb-6"><div class="flex items-center gap-2 text-xs text-slate-500 mb-2">`);
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
      _push(`<span>/</span><span class="text-slate-900 font-bold">${ssrInterpolate(unref(t)("website_navbar_vr", "VR Showroom"))}</span></div><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">`);
      _push(ssrRenderComponent(unref(Glasses), { class: "w-8 h-8 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F 360\xB0" : "3D Virtual Showroom Tour")}</span></h1><p class="text-xs sm:text-sm text-slate-500 mt-1">${ssrInterpolate(unref(isRTL) ? "\u062A\u062C\u0648\u0644 \u0641\u064A \u0645\u0639\u0631\u0636 AKM Motor City \u0628\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0648\u0627\u0642\u0639 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0648\u062A\u0641\u0642\u062F \u0633\u064A\u0627\u0631\u0627\u062A\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u0643\u0623\u0646\u0643 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636" : "Experience the AKM flagship showroom with realistic 360\xB0 virtual reality walkthrough")}</p></div><div class="flex items-center gap-3"><button class="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-2xs">`);
      _push(ssrRenderComponent(unref(Maximize2), { class: "w-4 h-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629" : "Fullscreen")}</span></button></div></div></div><div class="relative w-full aspect-16/10 lg:aspect-21/9 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl"><iframe${ssrRenderAttr("src", unref(tourUrl))} class="absolute inset-0 w-full h-full border-0" allow="autoplay; fullscreen; gyroscope; accelerometer" title="AKM Motor City Virtual Tour"></iframe></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"><div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2"><div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Move), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><h3 class="font-extrabold text-slate-900 text-base">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u062D\u0631" : "Free 360\xB0 Navigation")}</h3><p class="text-xs text-slate-500 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0627\u0646\u0642\u0631 \u0648\u0627\u0633\u062D\u0628 \u0628\u0627\u0644\u0641\u0623\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0633 \u0627\u0644\u0634\u0627\u0634\u0629 \u0644\u0644\u0627\u0644\u062A\u0641\u0627\u0641 \u0641\u064A \u0623\u064A \u0627\u062A\u062C\u0627\u0647\u060C \u0648\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0627\u0626\u0631 \u0627\u0644\u0628\u064A\u0636\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u0623\u0631\u0636\u064A\u0629 \u0644\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0628\u064A\u0646 \u0623\u062C\u0646\u062D\u0629 \u0627\u0644\u0645\u0639\u0631\u0636." : "Click and drag or swipe to look in any direction. Click floor waypoints to move seamlessly between showroom sections.")}</p></div><div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2"><div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Car), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><h3 class="font-extrabold text-slate-900 text-base">${ssrInterpolate(unref(isRTL) ? "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0627\u062A" : "Inspect Vehicle Cockpits")}</h3><p class="text-xs text-slate-500 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0627\u0642\u062A\u0631\u0628 \u0645\u0646 \u0623\u064A \u0633\u064A\u0627\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u062E\u0627\u0631\u062C\u064A \u0648\u0627\u0644\u062F\u0627\u062E\u0644\u064A \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0627\u062E\u0631\u0629 \u0628\u062F\u0642\u0629 \u0645\u062A\u0646\u0627\u0647\u064A\u0629." : "Step inside vehicles to examine dashboard layouts, seating ergonomics, and premium finishes in high-res detail.")}</p></div><div class="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2"><div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(CalendarCheck), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><h3 class="font-extrabold text-slate-900 text-base">${ssrInterpolate(unref(isRTL) ? "\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u062A\u062C\u0631\u0628\u0629 \u0642\u064A\u0627\u062F\u0629" : "Book a Live Test Drive")}</h3><p class="text-xs text-slate-500 leading-relaxed">${ssrInterpolate(unref(isRTL) ? "\u0623\u0639\u062C\u0628\u062A\u0643 \u0633\u064A\u0627\u0631\u0629 \u0645\u0639\u064A\u0646\u0629\u061F \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0644\u062A\u062C\u0631\u0628\u0629 \u0642\u064A\u0627\u062F\u062A\u0647\u0627 \u0648\u0632\u064A\u0627\u0631\u0629 \u0645\u0631\u0643\u0632\u0646\u0627 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u062F\u0631 \u0628\u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0645\u0639 \u0641\u0631\u064A\u0642\u0646\u0627." : "Found the car you love? Schedule a personalized in-person test drive at our Bayader showroom.")}</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/showroom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=showroom-DbHeJ7PQ.mjs.map
