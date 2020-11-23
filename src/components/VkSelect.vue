<template>
  <select>
    <template v-for="option in options">
      <slot :option="option">
        <option
          :key="option[keyProp]"
          :value="option[keyProp]"
          v-text="option[labelProp]"
        />
      </slot>
    </template>
  </select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    value: {
      required: true,
    },
    options: {
      required: true,
      type: Array as PropType<Record<string, unknown>[]>,
    },
    keyProp: {
      default: "key",
      type: String,
    },
    labelProp: {
      default: "label",
      type: String,
    },
  },
});
</script>
