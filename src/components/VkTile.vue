<template>
  <div class="tile">
    <slot name="image" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tile {
  display: block;
  width: 100%;
  color: $color-secondary;
  padding: $spacing-small;
  width: 100%;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @include clickable;
}
.name {
  font-weight: bold;
}
</style>
