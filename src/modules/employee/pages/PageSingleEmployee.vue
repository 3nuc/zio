<template>
  <VkLoader :loading="isEmployeeLoading && areStanowiskoLoading">
    <Toolbar style="width: 800px">
      <template #left>
        <h1 v-text="`${employee.imie} ${employee.nazwisko}`" />
      </template>
      <template #right>
        <ToggleButton
          :model-value="isEditing"
          @change="initEdit()"
          class="p-button-warning"
          on-label="Anuluj"
          off-label="Edytuj"
        />
        <Button class="p-button-danger" @click="onDelete()">Zwolnij pracownika</Button>
      </template>
    </Toolbar>
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.imie" placeholder="Imie" /></div>
      <div class="p-field"><InputText v-model="edit.nazwisko" placeholder="Nazwisko" /></div>
      <div class="p-field">
        <Dropdown v-model="edit.stanowisko" :options="stanowiska" option-label="nazwa" placeholder="Stanowisko" />
      </div>
      <div class="p-field">
        <Dropdown
          v-model="edit.typ_konta"
          :options="[
            { key: 0, name: 'Normal' },
            { key: 1, name: 'Premium' },
          ]"
          option-key="key"
          option-label="name"
          placeholder="Typ konta"
        />
      </div>
      <div class="p-field">
        <MultiSelect
          v-model="edit.szkolenia"
          :options="trainings"
          option-label="nazwa"
          placeholder="Dodaj do szkolenia"
        />
      </div>
      <div class="p-field">
        <Button class="p-button-success" @click="onEdit()">Ok</Button>
      </div>
    </template>

    <template v-else>
      <h3 v-text="`Stanowisko: ${stanowiska?.[0].nazwa ?? 'brak'}`" />
      <h3 v-text="'Szkolenia:'" />
      <div v-for="szk in employee.szkolenia" v-text="szk.nazwa" :key="szk.nazwa" />
    </template>
    <div class="p-field"></div>
  </VkLoader>
</template>

<script lang="ts">
import { useRequest } from "@/composables";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VkLoader from "@/components/VkLoader.vue";
import { EmployeeProper } from "@/mock-server";
import { deletePracownik, editPracownik, getPracownikById, getStanowiska, getSzkolenia } from "@/utils/api";
import { getTrainings } from "@/utils/service";
import cloneDeep from "lodash/cloneDeep";
export default defineComponent({
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(getPracownikById(params.id as string));

    const { data: stanowiska, isLoading: areStanowiskoLoading } = useRequest(getStanowiska()); //i love mixing polish and english in code
    const stanowisko = computed(() => stanowiska.value?.find((st) => st.id === employee.value?.stanowisko)?.dzial);

    const { data: trainings, isLoading: isTrainingLoading } = useRequest(getSzkolenia());

    const edit = reactive<any>({ imie: "", nazwisko: "", stanowisko: 0, typ_konta: 0, szkolenia: [] });
    const onEdit = async () => {
      const pracownik: any = {
        imie: edit.imie,
        nazwisko: edit.nazwisko,
        stanowisko: edit.stanowisko,
        typ_konta: edit.typ_konta.key,
        szkolenia: edit.szkolenia,
      };
      await editPracownik(params.id as string, pracownik);
      router.push("/home/employees");
    };
    const onDelete = async () => {
      await deletePracownik(params.id as string);
      router.push("/home/employees");
    };
    const isEditing = ref(false);
    const initEdit = () => {
      //@ts-ignore
      edit.imie = employee.value.imie;
      //@ts-ignore
      edit.nazwisko = employee.value.nazwisko;
      //@ts-ignore
      edit.stanowisko = employee.value.stanowisko;
      //@ts-ignore
      edit.typ_konta = employee.value.typ_konta;
      //@ts-ignore
      edit.szkolenia = employee.szkolenia;
      isEditing.value = !isEditing.value;
    };
    return {
      initEdit,
      employee,
      stanowiska,
      stanowisko,
      isEmployeeLoading,
      areStanowiskoLoading,
      isEditing,
      edit,
      onEdit,
      onDelete,
      trainings,
    };
  },
  components: {
    VkLoader,
  },
});
</script>
