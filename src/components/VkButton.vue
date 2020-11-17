<template>
  <VkBaseButton class="vk-button"><slot /></VkBaseButton>
</template>

<script setup lang="ts">
export { default as VkBaseButton } from "@/components/VkBaseButton.vue";
</script>

<style scoped lang="scss">
.vk-button {
  @include clickable;
  max-width: 150px;
  max-height: 70px;
}
</style>
