<template>
  <vk-loader :is="VkLoader" :loading="isTrainingLoading">
    <traingings-tile-list :trainings="trainings" />
  </vk-loader>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/composables";
import { getTrainings } from "@/utils/service";
import TraingingsTileList from "@/modules/trainings/molecules/TraingingsTileList.vue";
import VkLoader from "@/components/VkLoader.vue";
export default defineComponent({
  components: { TraingingsTileList, VkLoader },
  setup() {
    const { data: trainings, isLoading: isTrainingLoading } = useRequest(
      getTrainings()
    );
    return {
      trainings,
      isTrainingLoading,
    };
  },
});
</script>
