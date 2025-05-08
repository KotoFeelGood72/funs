// src/shims-vue-the-mask.d.ts
declare module "vue-the-mask" {
  import type { Plugin } from "vue";
  const TheMask: Plugin & {
    mask: any;
  };
  export { TheMask, mask };
  export default TheMask;
}
