<template>hello</template>

<script lang="ts">
import { getSingleEmployee } from "@/utils/service";
import { useRequest } from "@/composables";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const {
      params: { id },
    } = useRoute();
    const { data, isLoading: isEmployeeLoading, VkLoader } = useRequest(
      getSingleEmployee(id as string)
    );

    return {
      data,
      isEmployeeLoading,
      VkLoader,
    };
  },
});
</script>
