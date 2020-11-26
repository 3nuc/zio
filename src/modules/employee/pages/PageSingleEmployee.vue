<template>
  <VkLoader :loading="employee !== null">
    <img src="https://www.placehold.it/100/100" />
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.imie" placeholder="Imie" /></div>
      <div class="p-field"><InputText v-model="edit.nazwisko" placeholder="Nazwisko" /></div>
      <div class="p-field"><Dropdown v-model="edit.stanowisko" placeholder="Stanowisko" /></div>
      <div class="p-field"><Dropdown v-model="edit.typ_konta" placeholder="Typ konta" /></div>
    </template>
    <template v-else>
      <h1 v-text="`${employee.firstName} ${employee.lastName}`" />
      <h3 v-text="`${employee.workTitle}`" />
    </template>
    <div class="p-field">
      <ToggleButton v-model="isEditing" class="p-button-warning" on-label="Anuluj" off-label="Edytuj" />
      <Button class="p-button-danger">Usuń projekt</Button>
    </div>
  </VkLoader>
</template>

<script lang="ts">
import { getSingleEmployee } from "@/utils/service";
import { useRequest } from "@/composables";
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import VkLoader from "@/components/VkLoader.vue";
import { EmployeeProper } from "@/mock-server";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(getSingleEmployee(params.id as string));

    return {
      employee,
      isEmployeeLoading,
      isEditing: ref(false),
      edit: reactive<Omit<EmployeeProper, "id">>({ imie: "", nazwisko: "", stanowisko: 0, typ_konta: 0 }),
    };
  },
  components: {
    VkLoader,
  },
});
</script>
