<template>
  <VkBaseButton><slot /></VkBaseButton>
</template>

<script setup lang="ts">
export { default as VkBaseButton } from "@/components/VkBaseButton.vue";
</script>

<style scoped lang="scss">
.header-button {
  max-width: 200px;
  font-weight: bold;
  background: $color-primary;
  color: $color-secondary-25;
  padding: $spacing-large;
  transition: background ease-in-out $duration-short;
  &:hover {
    background: $color-primary-75;
    color: $color-secondary;
    text-decoration: none;
  }
}
</style>
