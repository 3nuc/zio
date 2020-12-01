<template>
  <VkLoader :loading="isEmployeeLoading && areStanowiskoLoading">
    <img src="https://www.placehold.it/100/100" />
    <template v-if="isEditing">
      <div class="p-field"><InputText v-model="edit.imie" placeholder="Imie" /></div>
      <div class="p-field"><InputText v-model="edit.nazwisko" placeholder="Nazwisko" /></div>
      <div class="p-field">
        <Dropdown
          v-model="edit.stanowisko"
          :options="stanowiska"
          option-key="id"
          option-label="nazwa"
          placeholder="Stanowisko"
        />
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
        <Button class="p-button-success" @click="onEdit()">Ok</Button>
      </div>
    </template>
    <template v-else>
      <h1 v-text="`${employee.imie} ${employee.nazwisko}`" />
      <h3 v-text="`${stanowisko}`" />
    </template>
    <div class="p-field">
      <ToggleButton v-model="isEditing" class="p-button-warning" on-label="Anuluj" off-label="Edytuj" />
      <Button class="p-button-danger" @click="onDelete()">Usuń pracownika</Button>
    </div>
  </VkLoader>
</template>

<script lang="ts">
import { useRequest } from "@/composables";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import VkLoader from "@/components/VkLoader.vue";
import { Candidate, EmployeeProper } from "@/mock-server";
import { deleteKandydat, getKandydat, getPracownikById, getStanowiska, putKandydat } from "@/utils/api";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(getKandydat(params.id as string));

    const { data: stanowiska, isLoading: areStanowiskoLoading } = useRequest(getStanowiska()); //i love mixing polish and english in code
    const stanowisko = computed(() => stanowiska.value?.find((st) => st.id === employee.value?.stanowisko)?.dzial);

    const edit = reactive<Omit<EmployeeProper, "id">>({ imie: "", nazwisko: "", stanowisko: 0, typ_konta: 0 });
    const onEdit = async () => {
      const pracownik: Omit<Candidate, "id"> = {
        imie: edit.imie,
        nazwisko: edit.nazwisko,
        //@ts-expect-error xdd
        stanowisko: edit.stanowisko.id,
        //@ts-expect-error xdd
        typ_konta: edit.typ_konta.key,
      };
      await putKandydat(params.id as string, pracownik);
      router.push("/home/candidates");
    };
    const onDelete = async () => {
      await deleteKandydat(params.id as string);
      router.push("/home/candidates");
    };
    return {
      employee,
      stanowiska,
      stanowisko,
      isEmployeeLoading,
      areStanowiskoLoading,
      isEditing: ref(false),
      edit,
      onEdit,
      onDelete,
    };
  },
  components: {
    VkLoader,
  },
});
</script>
