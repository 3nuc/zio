<template>
  <main class="layout">
    <HomepageHeader>
      <template #right> Witaj Hubert </template>
    </HomepageHeader>
    <main class="content">
      <router-view />
    </main>
    <HomepageFooter />
  </main>
</template>

<script setup lang="ts">
export { default as HomepageHeader } from "../molecules/HomepageHeader.vue";
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content {
  margin-top: $spacing-large;
  height: 100%;
}
</style>
