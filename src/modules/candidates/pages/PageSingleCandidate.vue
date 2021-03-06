<template>
  <VkLoader :loading="isEmployeeLoading && areStanowiskoLoading">
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
        <Button class="p-button-success" @click="onEdit()">Ok</Button>
      </div>
    </template>
    <template v-else>
      <h1 v-text="`${employee.imie} ${employee.nazwisko}`" />
      <h3 v-text="`${stanowisko ?? ''}`" />
    </template>
    <div class="p-field">
      <Button class="p-button-success" @click="onEmploy()">Zatrudnij kandydata</Button>
      <ToggleButton :modelValue="isEditing" @change="onOpenEdit" class="p-button-warning" on-label="Anuluj" off-label="Edytuj" />
      <Button class="p-button-danger" @click="onDelete()">Usuń kandydata</Button>
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
import { apiRoot } from "@/utils/api-root";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const { data: employee, isLoading: isEmployeeLoading } = useRequest(getKandydat(params.id as string));

    const { data: stanowiska, isLoading: areStanowiskoLoading } = useRequest(getStanowiska()); //i love mixing polish and english in code
    const stanowisko = computed(() => stanowiska.value?.find((st) => st.id === employee.value?.stanowisko)?.dzial);

    //@ts-ignore
    const edit = reactive<Omit<EmployeeProper, "id">>({ imie: "", nazwisko: "", stanowisko: "1", typ_konta: "1" });
    const isEditing = ref(false);
    const onOpenEdit = () => {
      if(isEditing.value) {
        isEditing.value = false;
        return;
      }

      edit.imie = employee.value?.imie ?? '';
      edit.nazwisko = employee.value?.nazwisko ?? '';
      //@ts-ignore
      edit.stanowisko = employee.value?.stanowisko ?? "1";
      isEditing.value = true;
    }
    const onEdit = async () => {
      const pracownik: Omit<Candidate, "id"> = {
        imie: edit.imie,
        nazwisko: edit.nazwisko,
        //@ts-expect-error xddd
        stanowisko: stanowiska.value.find((x) => x.key === edit?.stanowisko.id),
      };
      await putKandydat(params.id as string, pracownik);
      router.push("/home/candidates");
    };
    const onEmploy = async () => {
      //@ts-ignore
      await apiRoot.post(`kandydaci/employKandydat/${params.id}`);
      router.push("/home/employees");
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
      isEditing,
      edit,
      onEdit,
      onDelete,
      onEmploy,
      onOpenEdit
    };
  },
  components: {
    VkLoader,
  },
});
</script>
