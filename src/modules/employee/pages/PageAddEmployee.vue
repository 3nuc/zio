<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.imie" placeholder="Imie" />
    </div>
    <div class="p-field">
      <InputText v-model="form.nazwisko" placeholder="Nazwisko" />
    </div>
    <div class="p-field">
      <Dropdown v-model="form.stanowisko" :options="positions" option-label="label" placeholder="Stanowisko" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.typ_konta"
        :options="account_types"
        option-label="label"
        placeholder="Kategoria projektu"
      />
    </div>
    <div class="p-field">
      <InputText v-model="form.nazwa_pliku" placeholder="Nazwa pliku" />
    </div>
    <Button class="p-button-success" @click="onAddEmployee">Dodaj kandydata</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { EmployeeProper } from "@/mock-server";
import { addPracownik, getStanowiska, Stanowisko } from "@/utils/api";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const form = reactive<Omit<EmployeeProper, "id">>({
      imie: "",
      nazwisko: "",
      stanowisko: 0,
      typ_konta: 0,
    });

    const positions = ref<{ key: number; label: string }[]>([]);

    onMounted(async () => {
      positions.value = (await getStanowiska()).map(({ id: key, nazwa: label }) => ({
        key,
        label,
      }));
    });
    // const positions = computed(() => [
    //   { key: 0, label: "Frontend Developer" },
    //   { key: 1, label: "QA Engineer" },
    //   { key: 2, label: "Backend developer" },
    // ]);

    //hardcoded
    const account_types = computed(() => [
      { key: 0, label: "Normalne" },
      { key: 1, label: "Premium" },
    ]);

    const onAddEmployee = async () => {
      await addPracownik({
        imie: form.imie,
        nazwisko: form.nazwisko,
        //@ts-expect-error xdd
        stanowisko: form.stanowisko.key,
        //@ts-expect-error xdd
        typ_konta: form.typ_konta.key,
      });
      router.push("/home/employees");
    };
    return {
      form,
      positions,
      account_types,
      onAddEmployee,
    };
  },
});
</script>
