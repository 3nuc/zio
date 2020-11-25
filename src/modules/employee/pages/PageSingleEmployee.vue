<template>
  <VkLoader :loading="isEmployeeLoading">
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.nazwa" placeholder="Nazwa szkolenia" /></div>
      <div class="p-field"><Calendar v-model="edit.data_szkolenia" placeholder="Data szkolenia" /></div>
      <div class="p-field"><Dropdown v-model="edit.rodzaj_szkolenia" placeholder="" /></div>
    </template>
    <template v-else>
      <img src="https://www.placehold.it/100/100" />
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
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import VkLoader from "@/components/VkLoader.vue";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(getSingleEmployee(params.id as string));

    return {
      employee,
      isEmployeeLoading,
      isEditing: ref(false),
    };
  },
  components: {
    VkLoader,
  },
});
</script>
