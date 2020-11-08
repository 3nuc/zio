<template>
  <VkBaseButton :class="['header-button', { active }]"><slot /></VkBaseButton>
</template>

<script lang="ts">
import VkBaseButton from "@/components/VkBaseButton.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    active: Boolean,
  },
  components: {
    VkBaseButton,
  },
});
</script>

<style scoped lang="scss">
.active {
  background-color: $color-primary;
  color: $color-secondary-25;
  cursor: default;
  &:hover {
    background: $color-primary;
  }
  &:before {
    width: 10px;
    height: 10px;
    background: red;
  }
}
.header-button {
  border-radius: $border-radius $border-radius 0 0;
  max-width: 200px;
  font-weight: bold;
  color: $color-secondary-25;
  padding: $spacing-large;
  transition: background ease-in-out $duration-short;
  &:hover {
    background: $color-primary-75;
    color: $color-secondary;
  }
}
</style>
