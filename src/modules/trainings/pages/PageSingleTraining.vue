<template>
  <VkLoader :loading="isLoading">
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.nazwa" placeholder="Nazwa szkolenia" /></div>
      <div class="p-field"><Calendar v-model="edit.data_szkolenia" placeholder="Data szkolenia" /></div>
      <div class="p-field">
        <Dropdown
          v-model="edit.rodzaj_szkolenia"
          :options="trainingCategory"
          option-label="nazwaSzkKat"
          placeholder="Kategoria szkolenia"
        />
      </div>
      <div class="p-field"><Button class="p-button-success" @click="onEdit">Ok</Button></div>
    </template>

    <template v-else>
      <h1>
        <div class="p-field">{{ training.nazwa }}</div>
      </h1>
      <div class="p-field">Kategoria: {{ training.rodzaj_szkolenia?.nazwaSzkKat }}</div>
      <div class="p-field">{{ date }}</div>
    </template>

    <div class="p-field">
      <ToggleButton
        :model-value="isEditing"
        @change="initEdit()"
        class="p-button-warning"
        on-label="Anuluj"
        off-label="Edytuj"
      />
      <Button class="p-button-danger" @click="onDelete">Usuń projekt</Button>
    </div>
  </VkLoader>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRequest } from "@/composables";
import VkLoader from "@/components/VkLoader.vue";
import { Training } from "@/mock-server";
import { editSzkolenie, getSzkolenie, removeSzkolenie } from "@/utils/api";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { getSzkoleniaKategorie } from "@/utils/api/szkolenie_kat";
export default defineComponent({
  props: { id: { required: true, type: String } },
  setup() {
    const router = useRouter();
    const { params } = useRoute();
    const { data: training, isLoading } = useRequest(getSzkolenie(params.id as string));
    const { data: trainingCategory, isLoading: isTrainingCategoryLoading } = useRequest(getSzkoleniaKategorie());
    const date = computed(() => dayjs(training.value?.data_szkolenia).locale("pl").format());
    const onEdit = async () => {
      const szkolenie = {
        id: params.id as string,
        data_szkolenia: edit.data_szkolenia,
        nazwa: edit.nazwa,
        rodzaj_szkolenia: edit.rodzaj_szkolenia,
      };
      await editSzkolenie(szkolenie);
      router.push("/home/trainings");
    };

    const onDelete = async () => {
      await removeSzkolenie(params.id as string);
      router.push("/home/trainings");
    };
    const isEditing = ref(false);
    const initEdit = () => {
      isEditing.value = !isEditing.value;
      //@ts-ignore
      edit.nazwa = training.value.nazwa;
      //@ts-ignore
      edit.data_szkolenia = training.value?.data_szkolenia;
      //@ts-ignore
      edit.rodzaj_szkolenia = trainingCategory.value.find(
        //@ts-ignore
        (x: any) => x.idSzkKat === training.value?.rodzaj_szkolenia?.idSzkKat
      );
    };
    const edit = reactive<Omit<Training, "id">>({ nazwa: "", data_szkolenia: "", rodzaj_szkolenia: 0 });
    return {
      initEdit,
      training,
      isLoading,
      isEditing,
      onEdit,
      onDelete,
      edit,
      date,
      trainingCategory,
    };
  },
  components: {
    VkLoader,
  },
});
</script>
