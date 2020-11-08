<template>
  <div v-if="project">
    <h1 v-text="project.name" />
    <VkButton v-text="'Usuń projekt'" />
    <VkButton v-text="'Edytuj projekt'" />
    Lista czlonkow todo
    {{ project.client.name }}
    {{ project.startDate }} - {{ project.endDate }}
  </div>
</template>

<script lang="ts">
import { apiRoot } from "@/utils/api-root";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { Project } from "@/mock-server";
import { useRequest } from "@/composables";

export default defineComponent({
  setup() {
    const router = useRoute();
    const getSingleProject = (id: string) =>
      apiRoot.get(`projects/${id}`).json<Project>();
    const { data, isLoading } = useRequest(
      getSingleProject(router.params.id as string)
    );

    return {
      project: data,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss"></style>
