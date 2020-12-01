<template>
  <VkLoader :loading="areEmployeesLoading">
    <Button class="p-button-success" @click="$router.push({ path: '/home/candidates/add' })">Dodaj kandydata</Button>
    <employee-tile-list :employees="employees" />
  </VkLoader>
</template>

<script lang="ts">
import { useRequest } from "@/composables";
import { getEmployees } from "@/utils/service";
import { defineComponent } from "vue";

import VkLoader from "@/components/VkLoader.vue";
import EmployeeTileList from "@/modules/employee/molecules/EmployeeTileList.vue";
import { getKandydaci } from "@/utils/api";
export default defineComponent({
  setup() {
    const { data: employees, isLoading: areEmployeesLoading } = useRequest(getKandydaci());
    return {
      employees,
      areEmployeesLoading,
    };
  },
  components: { VkLoader, EmployeeTileList },
});
</script>
