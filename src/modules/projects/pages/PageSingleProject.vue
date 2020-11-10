<template>
  <div v-if="data">
    <header class="header">
      <h1 v-text="data.name" />
      <nav>
        <VkButton v-text="'Usuń projekt'" />
        <VkButton v-text="'Edytuj projekt'" />
      </nav>
    </header>
    <main>
      Lista czlonkow todo
      <content>
        <div v-text="data.client.name" />
        <div>{{ data.startDate }} - {{ data.endDate }}</div>
        <div v-text="data.projectManager.name" />
      </content>
      <content>
        <div></div>
      </content>
    </main>
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
      apiRoot.get(`project/${id}`).json<Project>();

    const { data, isLoading } = useRequest(
      getSingleProject(router.params.id as string)
    );

    return {
      data,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  nav > *:first-of-type {
    margin-right: $spacing-large;
  }
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
