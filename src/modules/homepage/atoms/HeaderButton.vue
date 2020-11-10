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
.active {
  background-color: $color-primary;
  color: $color-light;
  cursor: default;
  &:hover {
    background: $color-primary;
  }
  text-decoration: underline;
}
</style>
