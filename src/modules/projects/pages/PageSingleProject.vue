<template>
  <div v-if="project">
    <main class="split">
      <content class="split__1">
        <header class="header">
          <h1 v-text="project.name" />
        </header>
        <div v-text="project.client.name" />
        <div>{{ project.startDate }} - {{ project.endDate }}</div>
        <div v-text="project.projectManager.name" />
      </content>
      <content class="split__2">
        <nav class="edit-buttons">
          <VkButton v-text="'Usuń projekt'" />
          <VkButton v-text="'Edytuj projekt'" />
        </nav>
        <VkLoader :loading="areEmployeesLoading">
          <EmployeesTable :employees="employees" />
        </VkLoader>
      </content>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
import EmployeesTable from "../molecules/EmployeesTable.vue";
import { getSingleProject, getEmployees } from "@/utils/service";

export default defineComponent({
  setup() {
    const router = useRoute();

    const { data: project, isLoading: isProjectLoading } = useRequest(
      getSingleProject(router.params.id as string)
    );

    const { data: employees, isLoading: areEmployeesLoading } = useRequest(
      getEmployees()
    );

    return {
      project,
      isProjectLoading,
      employees,
      areEmployeesLoading,
    };
  },
  components: {
    VkLoader,
    EmployeesTable,
  },
});
</script>

<style scoped lang="scss">
.header {
  nav > *:first-of-type {
    margin-right: $spacing-large;
  }
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.split {
  margin: {
    right: 50px;
  }
  display: grid;
  grid-template-columns: repeat(2, 50%);
  row-gap: 100px;
  &__2 {
    display: flex;
    flex-direction: column;
  }
}
.edit-buttons {
  * {
    margin-left: 5px;
  }
  display: flex;
  justify-content: flex-end;
}
</style>
