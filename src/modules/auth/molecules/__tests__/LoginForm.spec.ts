import { shallowMount } from "@vue/test-utils";
import { customizer, MountingOptions } from "@/../tests/unit/utilities";
import _ from "lodash";

import LoginForm from "@/modules/auth/molecules/LoginForm.vue";
// import VkInput from "@/atoms/VkInput.vue";
const component = LoginForm;

function createWrapper(options: MountingOptions) {
  const defaultOptions: MountingOptions = {};
  const mergedOptions = _.mergeWith(defaultOptions, options, customizer);
  return shallowMount(component, mergedOptions);
}

describe("LoginForm.vue", () => {
  it("has 2 inputs", () => {
    const wrapper = createWrapper({});
    expect(wrapper.exists()).toBe(true);
  });
});
