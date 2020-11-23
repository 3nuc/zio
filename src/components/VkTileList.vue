<template>
  <article>
    <vk-tile v-for="item in items" :key="item[keyProp]" class="tile">
      <slot :item="item" />
    </vk-tile>
  </article>
</template>

<script lang="ts">
import VkTile from "@/components/VkTile.vue";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { VkTile },
  props: {
    items: {
      type: Array as PropType<Record<string, unknown>[]>,
      required: true,
    },
    keyProp: { type: String, required: true },
  },
});
</script>

<style scoped lang="scss">
.tile {
  $m-vertical: $spacing-large;
  margin: {
    top: $m-vertical;
    bottom: $m-vertical;
  }
  $p-vertical: $spacing-large;
  $p-horizontal: $spacing-large;
  padding: {
    top: $p-vertical;
    bottom: $p-vertical;
    left: $p-horizontal;
    right: $p-horizontal;
  }
}
</style>
