<template>
  <VkBaseButton class="vk-button"><slot /></VkBaseButton>
</template>

<script setup lang="ts">
export { default as VkBaseButton } from "@/components/VkBaseButton.vue";
</script>

<style scoped lang="scss">
.vk-button {
  border-radius: $border-radius;
  filter: drop-shadow(1px 1px 1px $color-secondary-75);
}
</style>
