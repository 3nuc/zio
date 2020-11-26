<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.nazwa" placeholder="Nazwa projektu" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.kategoria_projektu"
        :options="categories"
        option-label="label"
        placeholder="Kategoria projektu"
      />
    </div>
    <div class="p-field">
      <label>Wybierz pracowników</label>
      <Listbox
        :options="employees ?? []"
        v-model="form.pracownicy"
        option-label="firstName"
        placeholder="Wybierz pracownika"
        multiple
        filter
      />
    </div>
    <Button class="p-button-success" :disabled="!isFormValid">Dodaj projekt</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import { useRequest } from "@/composables";
import { getEmployees } from "@/utils/service";
import { Employee, ProjectProper } from "@/mock-server";

import InputText from "primevue/inputtext";
import Listbox from "primevue/listbox";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { PartialNull } from "@/utils/types";

export default defineComponent({
  components: {
    Button,
    Dropdown,
    InputText,
    Listbox,
  },
  setup() {
    const form = reactive<PartialNull<Omit<ProjectProper, "id_projekt"> & { pracownicy: Employee[] }>>({
      nazwa: null,
      kategoria_projektu: null,
      pracownicy: null,
    });
    const isFormValid = computed(
      () => ![null, ""].includes(form.nazwa) && form.kategoria_projektu !== null && (form.pracownicy?.length ?? 0) > 0
    );
    const categories = computed(() => [
      { key: 1, label: "Kategoria 1" },
      { key: 2, label: "Kategoria 2" },
    ]);

    const { data: employees, isLoading: areEmployeesLoading } = useRequest(getEmployees());
    const currentEmployee = ref<string | null>("0");

    const onEmployeeChange = (event: { target: HTMLSelectElement }) => {
      const isAlreadyAdded = form.pracownicy?.some((pracownik) => pracownik.id === event.target.value) ?? false;
      if (isAlreadyAdded) return;
      currentEmployee.value = null;
      const employeeToAdd = employees.value?.find((e) => e.id === event.target.value);
      if (employeeToAdd !== undefined) form.pracownicy?.push(employeeToAdd);
    };

    const onEmployeeDelete = (employeeId: string) => {
      if (employees.value === null) return;
      employees.value = employees.value.filter((e) => e.id !== employeeId);
    };

    return {
      form,
      isFormValid,
      categories,
      employees,
      areEmployeesLoading,
      currentEmployee,
      onEmployeeChange,
      onEmployeeDelete,
    };
  },
});
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
.submit {
  margin-top: $spacing-large;
}
.added-employee {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50px;
  margin: {
    top: $spacing-small;
    bottom: $spacing-small;
  }
  > span {
    display: flex;
    align-items: center;
  }
}
</style>
