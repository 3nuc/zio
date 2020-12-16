<template>
  <div v-if="project" class="root">
    <Toolbar>
      <template #right>
        <template v-if="isEditing">
          <Button class="p-button-success" @click="onEdit">OK</Button>
        </template>
        <ToggleButton class="p-button-warning p-m-r-3" v-model="isEditing" off-label="Edytuj" on-label="Anuluj" />
        <Button class="p-button-danger" @click="onDelete">Usuń projekt</Button>
      </template>
      <template #left>
        <template v-if="!isEditing">
          <header class="header">
            <h1 v-text="project.nazwa" />
          </header>
        </template>
        <InputText v-else v-model="edit.nazwa" placeholder="Nazwa projektu" />
      </template>
    </Toolbar>
    <main class="split" style="padding-top: 30px">
      <content class="split__1">
        <h2>Nazwa kategorii</h2>
        <Dropdown
          v-if="isEditing"
          v-model="edit.kategoria_projektu"
          :options="categories"
          option-label="nazwaKatProjektu"
        />
        <template v-else>
          {{ project.kategoriaProjektu?.nazwaKatProjektu }}
        </template>
      </content>
      <content class="split__2">
        <h2>Pracownicy</h2>
        <template v-if="isEditing">
          <Listbox
            :options="employeesFormatted"
            v-model="edit.employees"
            option-label="fullName"
            placeholder="Wybierz pracownika"
            multiple
            filter
          />
        </template>
        <template v-else>
          <div v-if="project.pracownicy?.length ?? 0 === 0">Brak pracownków</div>
          <EmployeeTileList :employees="project.pracownicy" v-else />
        </template>
      </content>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
import { getSingleProject, getEmployees, getProjectCategories } from "@/utils/service";
import EmployeeTileList from "@/modules/employee/molecules/EmployeeTileList.vue";
import { Project, ProjectProper } from "@/mock-server";
import { getPracownik } from "@/utils/api";
import { apiRoot } from "@/utils/api-root";
import Listbox from "primevue/listbox";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { data: project, isLoading: isProjectLoading } = useRequest(getSingleProject(route.params.id as string));
    const { data: categories } = useRequest(getProjectCategories());
    const { data: employees } = useRequest(getPracownik());
    const employeesFormatted = computed(() =>
      (employees.value ?? []).map((x) => ({ ...x, fullName: `${x.imie} ${x.nazwisko}` }))
    );

    const isEditing = ref(false);
    const edit = reactive<any>({
      nazwa: "",
      //@ts-ignore
      kategoria_projektu: null,
    });
    const onEdit = async () => {
      const json = {};
      await apiRoot.put(`projekt/${route.params.id}`, { json });
      router.push("/home/projects");
    };

    const onDelete = async () => {
      await apiRoot.delete(`projekt/${route.params.id}`);
      router.push("/home/projects");
    };

    return {
      onEdit,
      onDelete,
      project,
      isProjectLoading,
      edit,
      isEditing,
      categories,
      employees,
    };
  },
  components: {
    VkLoader,
    Listbox,
    EmployeeTileList,
  },
});
</script>

<style scoped lang="scss">
.root {
  width: 800px;
}
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
