<template>
  <div v-if="project">
    <main class="split">
      <content class="split__1">
        <template v-if="isEditing">
          <InputText v-model="edit.nazwa" placeholder="Nazwa projektu" />
          <Button class="p-button-success">OK</Button>
        </template>
        <template v-else>
          <header class="header">
            <h1 v-text="project.name" />
          </header>
          <div v-text="project.client.name" />
          <div>{{ project.startDate }} - {{ project.endDate }}</div>
          <div v-text="project.projectManager.name" />
        </template>
      </content>
      <content class="split__2">
        <nav class="edit-buttons">
          <ToggleButton class="p-button-warning" v-model="isEditing" off-label="Edytuj" on-label="Anuluj" />
          <Button class="p-button-danger">Usuń projekt</Button>
        </nav>
        <VkLoader :loading="areEmployeesLoading">
          <EmployeeTileList :employees="employees" />
        </VkLoader>
      </content>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
import { getSingleProject, getEmployees } from "@/utils/service";
import EmployeeTileList from "@/modules/employee/molecules/EmployeeTileList.vue";
import { Project, ProjectProper } from "@/mock-server";

export default defineComponent({
  setup() {
    const router = useRoute();

    const { data: project, isLoading: isProjectLoading } = useRequest(getSingleProject(router.params.id as string));

    const { data: employees, isLoading: areEmployeesLoading } = useRequest(getEmployees());

    const isEditing = ref(false);
    const edit = reactive<Omit<ProjectProper, "id_projekt">>({
      nazwa: "",
      kategoria_projektu: 0,
    });

    const onEditClick = () => {
      isEditing.value = !isEditing.value;
    };

    return {
      project,
      isProjectLoading,
      employees,
      areEmployeesLoading,
      isEditing,
      edit,
    };
  },
  components: {
    VkLoader,
    EmployeeTileList,
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
