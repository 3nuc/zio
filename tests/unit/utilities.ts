import { shallowMount } from "@vue/test-utils";
import { MergeWithCustomizer } from "lodash";

export const customizer: MergeWithCustomizer = (objValue, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue;
  }
};

export type MountingOptions = Parameters<typeof shallowMount>[1];
