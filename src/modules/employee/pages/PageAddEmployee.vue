<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.imie" placeholder="Imie" />
    </div>
    <div class="p-field">
      <InputText v-model="form.nazwisko" placeholder="Nazwisko" />
    </div>
    <div class="p-field">
      <Dropdown v-model="form.stanowisko" :options="positions" option-label="label" placeholder="Kategoria projektu" />
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
      <label>Wyślij plik CV:</label>
      <Upload mode="basic" />
    </div>
    <Button class="p-button-success">Dodaj kandydata</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { EmployeeProper } from "@/mock-server";
export default defineComponent({
  setup() {
    const form = reactive<Omit<EmployeeProper, "id">>({
      imie: "",
      nazwisko: "",
      stanowisko: 0,
      typ_konta: 0,
    });

    const positions = computed(() => [
      { key: 0, label: "Frontend Developer" },
      { key: 1, label: "QA Engineer" },
      { key: 2, label: "Backend developer" },
    ]);

    const account_types = computed(() => [
      { key: 0, name: "Normalne" },
      { key: 1, name: "Premium" },
    ]);

    return {
      form,
      positions,
      account_types,
    };
  },
});
</script>
