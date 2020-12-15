<template>
  <main class="projects-layout">
    <VkLoader :loading="isLoading">
      <Toolbar class="p-mb-4">
        <template #right>
          <Button class="add-project p-button-success" @click="$router.push({ name: 'AddProject' })">
            Dodaj projekt
          </Button>
        </template>
      </Toolbar>
      <DataTable selection :value="tableItems" class="p-datatable-striped">
        <Column field="idProjekt" header="ID" />
        <Column field="nazwa" header="Nazwa" />
        <Column field="kategoriaProjektu.nazwaKatProjektu" header="Kategoria" />
        <Column>
          <template #body="slotProps">
            <Button @click="$router.push({ path: `/home/projects/${slotProps.data.idProjekt}` })">Dalej ></Button>
          </template>
        </Column>
      </DataTable>
    </VkLoader>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getProjects } from "@/utils/service";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
export default defineComponent({
  setup() {
    const { data, isLoading } = useRequest(getProjects());
    return {
      tableItems: data,
      isLoading,
    };
  },
  components: {
    DataTable,
    Column,
    VkLoader,
    Toolbar,
  },
});
</script>

<style scoped lang="scss">
.projects-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
}
</style>
