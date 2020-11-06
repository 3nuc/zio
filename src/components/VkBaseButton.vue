<template>
  <button class="vk-button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.vk-button {
  max-width: 200px;
  font-weight: bold;
  background: $color-light;
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
