<template>
  <VkLoader :loading="areEmployeesLoading">
    <employee-tile-list :employees="employees" />
  </VkLoader>
</template>

<script lang="ts">
import VkTileList from "@/components/VkTileList.vue";
import VkLoader from "@/components/VkLoader.vue";
import { useRequest } from "@/composables";
import { getEmployees } from "@/utils/service";
import { defineComponent } from "vue";
import EmployeeTileList from "@/modules/employee/molecules/EmployeeTileList.vue";
export default defineComponent({
  setup() {
    const { data: employees, isLoading: areEmployeesLoading } = useRequest(
      getEmployees()
    );
    return {
      employees,
      areEmployeesLoading,
    };
  },
  components: { VkLoader, EmployeeTileList },
});
</script>
