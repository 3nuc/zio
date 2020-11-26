<template>
  <VkLoader :loading="isLoading">
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.nazwa" placeholder="Nazwa szkolenia" /></div>
      <div class="p-field"><Calendar v-model="edit.data_szkolenia" placeholder="Data szkolenia" /></div>
      <div class="p-field"><Dropdown v-model="edit.rodzaj_szkolenia" placeholder="" /></div>
    </template>
    <template v-else>
      {{ training.nazwa }}
    </template>
    <div class="p-field">
      <ToggleButton v-model="isEditing" class="p-button-warning" on-label="Anuluj" off-label="Edytuj" />
      <Button class="p-button-danger">Usuń projekt</Button>
    </div>
  </VkLoader>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRequest } from "@/composables";
import { getSingleTraining } from "@/utils/service";
import VkLoader from "@/components/VkLoader.vue";
import { Training } from "@/mock-server";
export default defineComponent({
  props: { id: { required: true, type: String } },
  setup(props) {
    const { data: training, isLoading } = useRequest(getSingleTraining(props.id));
    return {
      training,
      isLoading,
      isEditing: ref(false),
      edit: reactive<Omit<Training, "id">>({ nazwa: "", data_szkolenia: "", rodzaj_szkolenia: 0 }),
    };
  },
  components: {
    VkLoader,
  },
});
</script>
