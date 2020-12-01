<template>
  <vk-loader :loading="isTrainingLoading">
    <Button class="p-button-success" @click="$router.push({ path: '/home/trainings/add' })">Dodaj szkolenie</Button>
    <traingings-tile-list :trainings="trainings" />
  </vk-loader>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/composables";
import TraingingsTileList from "@/modules/trainings/molecules/TraingingsTileList.vue";
import VkLoader from "@/components/VkLoader.vue";
import Button from "primevue/button";
import { getSzkolenia } from "@/utils/api";
export default defineComponent({
  components: { TraingingsTileList, VkLoader, Button },
  setup() {
    const { data: trainings, isLoading: isTrainingLoading } = useRequest(getSzkolenia());
    return {
      trainings,
      isTrainingLoading,
    };
  },
});
</script>
