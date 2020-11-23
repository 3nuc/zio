<template>
  <VkLoader :loading="isLoading">
    {{ training.nazwa }}
  </VkLoader>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/composables";
import { getSingleTraining } from "@/utils/service";
import VkLoader from "@/components/VkLoader.vue";
export default defineComponent({
  props: { id: { required: true, type: String } },
  setup(props) {
    const { data: training, isLoading } = useRequest(
      getSingleTraining(props.id)
    );
    return {
      training,
      isLoading,
    };
  },
  components: {
    VkLoader,
  },
});
</script>
