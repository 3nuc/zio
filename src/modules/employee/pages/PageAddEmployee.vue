<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.imie" placeholder="Imie" />
    </div>
    <div class="p-field">
      <InputText v-model="form.nazwisko" placeholder="Nazwisko" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.typ_konta"
        :options="account_types"
        option-label="label"
        placeholder="Kategoria projektu"
      />
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

    const onAddEmployee = async () => {
      await addPracownik({
        imie: form.imie,
        nazwisko: form.nazwisko,
        //@ts-expect-error xdd
        stanowisko: positions.value.find((x) => form.stanowisko === x.id),
        nazwa_pliku: "foo",
      });
      router.push("/home/employees");
    };
    return {
      form,
      positions,
      onAddEmployee,
    };
  },
});
</script>
