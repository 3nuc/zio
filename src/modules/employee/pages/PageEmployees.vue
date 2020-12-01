<template>
  <VkLoader :loading="areEmployeesLoading">
    <Button class="p-button-success" @click="$router.push({ path: '/home/employees/add' })">Dodaj pracownika</Button>
    <employee-tile-list :employees="employees" />
  </VkLoader>
</template>

<script lang="ts">
import VkLoader from "@/components/VkLoader.vue";
import { useRequest } from "@/composables";
import { defineComponent } from "vue";
import EmployeeTileList from "@/modules/employee/molecules/EmployeeTileList.vue";
import { getPracownik } from "@/utils/api";
export default defineComponent({
  setup() {
    const { data: employees, isLoading: areEmployeesLoading } = useRequest(getPracownik());
    return {
      employees,
      areEmployeesLoading,
    };
  },
  components: { VkLoader, EmployeeTileList },
});
</script>
