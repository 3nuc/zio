<template>
  <main class="projects-layout">
    <VkButton class="add-project">Dodaj nowy projekt</VkButton>
    <ProjectsTable
      :items="tableItems ?? []"
      v-if="componentStatus === 'loaded'"
    />
  </main>
</template>

<script lang="ts">
import { apiRoot } from "@/utils/api-root";
import { defineComponent, computed } from "vue";
import { Project } from "@/mock-server";
import ProjectsTable from "@/modules/projects/molecules/ProjectsTable.vue";
import { useRequest } from "@/composables";
export default defineComponent({
  setup() {
    const getProjects = () => apiRoot.get("projects").json<Project[]>();
    const { data, isLoading } = useRequest(getProjects());
    const componentStatus = computed(() =>
      isLoading.value ? "loading" : "loaded"
    );
    return {
      tableItems: data,
      isLoading,
      componentStatus,
    };
  },
  components: {
    ProjectsTable,
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
