<template>
  <main class="projects-layout">
    <VkButton class="add-project">Dodaj nowy projekt</VkButton>
    <ProjectsTable :items="tableItems" />
  </main>
</template>

<script setup lang="ts">
export { default as VkButton } from "@/components/VkButton.vue";
export { default as ProjectsTable } from "@/modules/projects/molecules/ProjectsTable.vue";
import { computed } from "vue";

export const tableItems = computed(() => [
  {
    id: "123",
    name: "Skoczna w Villingen",
    client: { name: "Adam Małysz" },
    projectManager: { name: "Jane Ahonen" },
    memberCount: 15,
    startDate: new Date(Date.now() - 1_000_000),
    endDate: new Date(Date.now() + 1_000_000),
  },
]);
</script>

<style scoped lang="scss">
.add-project {
  margin-bottom: $spacing-small;
  align-self: flex-end;
}
.projects-layout {
  display: flex;
  flex-direction: column;
}
</style>
