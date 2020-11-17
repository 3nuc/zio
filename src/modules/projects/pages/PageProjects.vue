<template>
  <main class="projects-layout">
    <VkButton class="add-project">Dodaj nowy projekt</VkButton>
    <VkLoader :loading="isLoading">
      <ProjectsTable :items="tableItems" />
    </VkLoader>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectsTable from "@/modules/projects/molecules/ProjectsTable.vue";
import { getProjects } from "@/utils/service";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
export default defineComponent({
  setup() {
    const { data, isLoading } = useRequest(getProjects());
    return {
      tableItems: data,
      isLoading,
    };
  },
  components: {
    ProjectsTable,
    VkLoader,
  },
});
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
