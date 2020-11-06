<template>
  <header class="header-layout">
    <nav>
      <template v-for="{ text, to } in headerButtons" :key="text">
        <router-link v-slot="{ navigate }" :to="to">
          <HeaderButton v-text="text" @click="navigate" />
        </router-link>
      </template>
    </nav>
    <caption class="right">
      <slot name="right" />
    </caption>
  </header>
</template>

<script setup lang="ts">
export { default as HeaderButton } from "@/modules/homepage/atoms/HeaderButton.vue";
import { computed } from "vue";

export const headerButtons = computed(() => [
  { text: "Pracownicy", to: "employees" },
  { text: "Szkolenia", to: "trainings" },
  { text: "Kandydaci", to: "candidates" },
  { text: "Projekty", to: "/home/projects" },
]);
</script>

<style scoped lang="scss">
.header-layout {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $color-secondary;
  padding-right: $spacing-medium;
}
.right {
  color: $color-light;
}
</style>
