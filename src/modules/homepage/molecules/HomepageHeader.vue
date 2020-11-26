<template>
  <header class="header-layout">
    <nav>
      <router-link v-slot="{ navigate, isActive }" :to="to" v-for="{ text, to, icon } in headerButtons" :key="text">
        <HeaderButton @click="navigate" :active="isActive">
          <FaIcon :icon="icon"></FaIcon>
          {{ text }}
        </HeaderButton>
      </router-link>
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
  { text: "Pracownicy", to: "/home/employees", icon: ["far", "address-card"] },
  { text: "Szkolenia", to: "/home/trainings", icon: ["far", "lightbulb"] },
  { text: "Kandydaci", to: "/home/candidates", icon: ["far", "grin-stars"] },
  { text: "Projekty", to: "/home/projects", icon: ["far", "handshake"] },
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
