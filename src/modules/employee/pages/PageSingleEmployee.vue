<template>
  <VkLoader :loading="isEmployeeLoading">
    <img src="https://www.placehold.it/100/100" />
    <h1 v-text="`${employee.firstName} ${employee.lastName}`" />
    <h3 v-text="`${employee.workTitle}`" />
  </VkLoader>
</template>

<script lang="ts">
import { getSingleEmployee } from "@/utils/service";
import { useRequest } from "@/composables";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import VkLoader from "@/components/VkLoader.vue";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(
      getSingleEmployee(params.id as string)
    );

    return {
      employee,
      isEmployeeLoading,
    };
  },
  components: {
    VkLoader,
  },
});
</script>
