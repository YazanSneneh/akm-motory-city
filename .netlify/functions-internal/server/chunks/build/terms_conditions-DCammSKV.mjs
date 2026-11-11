import { a as useI18n, c as useSeoMeta, s as siteData, _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Scale, ShieldAlert } from 'lucide-vue-next';
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
  __name: "terms_conditions",
  __ssrInlineRender: true,
  setup(__props) {
    const { isRTL, t } = useI18n();
    useSeoMeta({
      title: "Terms & Conditions | AKM Motor City - \u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0627\u0644\u0623\u062D\u0643\u0627\u0645",
      description: "Legal terms and conditions for vehicle reservation and sales at AKM Motor City Jordan."
    });
    const termsText = computed(() => {
      var _a;
      const paragraph = (_a = siteData.terms) == null ? void 0 : _a[0];
      if (!paragraph) return "";
      return isRTL.value ? paragraph.description_ar : paragraph.description;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="mb-10 text-center"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">`);
      _push(ssrRenderComponent(unref(Scale), { class: "w-4 h-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0636" : "Legal & Reservation Policies")}</span></div><h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">${ssrInterpolate(unref(t)("website_terms_conditions", "Terms & Conditions"))}</h1><p class="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0627\u0644\u0623\u062D\u0643\u0627\u0645 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u062E\u062F\u0645\u0629 \u0627\u0644\u062D\u062C\u0632 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0634\u0631\u0627\u0621 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A \u0644\u062F\u0649 \u0634\u0631\u0643\u0629 \u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u062E\u064A\u0627\u0637 \u0644\u0644\u0633\u064A\u0627\u0631\u0627\u062A (AKM Motor City)" : "Terms and conditions governing the online booking and reservation services of AKM Motor City")}</p></div><div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8"><div class="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">${ssrInterpolate(unref(termsText))}</div><div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"><h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(ShieldAlert), { class: "w-4 h-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(isRTL) ? "\u0645\u0644\u062E\u0635 \u0646\u0642\u0627\u0637 \u0627\u0644\u062D\u062C\u0632 \u0627\u0644\u0647\u0627\u0645\u0629:" : "Key Booking Policy Highlights:")}</span></h3><ul class="text-xs text-slate-600 space-y-2 list-disc ps-5"><li>${ssrInterpolate(unref(isRTL) ? "\u0631\u0633\u0648\u0645 \u0627\u0644\u062D\u062C\u0632 \u0627\u0644\u062B\u0627\u0628\u062A\u0629 \u0647\u064A 100 \u062F\u064A\u0646\u0627\u0631 \u0623\u0631\u062F\u0646\u064A \u0641\u0642\u0637." : "A fixed deposit of 100 JOD is required for online reservation.")}</li><li>${ssrInterpolate(unref(isRTL) ? "\u064A\u062A\u0645 \u062E\u0635\u0645 \u0645\u0628\u0644\u063A \u0627\u0644\u0640 100 \u062F\u064A\u0646\u0627\u0631 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0644\u0644\u0633\u064A\u0627\u0631\u0629 \u0639\u0646\u062F \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621." : "The 100 JOD fee is fully deducted from the final purchase price.")}</li><li>${ssrInterpolate(unref(isRTL) ? "\u062A\u062E\u0636\u0639 \u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0627\u0644\u0623\u062D\u0643\u0627\u0645 \u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0623\u0631\u062F\u0646\u064A\u0629 \u0627\u0644\u0647\u0627\u0634\u0645\u064A\u0629." : "Governed under the laws of the Hashemite Kingdom of Jordan.")}</li></ul></div><div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div>${ssrInterpolate(unref(isRTL) ? "\u0644\u0623\u064A\u0629 \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u0631\u0643\u0632 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: 0791663333" : "For inquiries regarding terms, contact: 0791663333")}</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cars",
        class: "px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isRTL) ? "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A" : "Return to Inventory")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isRTL) ? "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A" : "Return to Inventory"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms_conditions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=terms_conditions-DCammSKV.mjs.map
