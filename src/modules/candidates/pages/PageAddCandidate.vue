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
      <span>Wyślij plik CV:</span>
      <Upload mode="basic" />
    </div>
    <Button class="p-button-success" :disabled="!isAllFilled">Dodaj kandydata</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Candidate } from "@/mock-server";
import { PartialNull } from "@/utils/types";
import { useAllFilled } from "@/composables";
export default defineComponent({
  setup() {
    const form = reactive<PartialNull<Omit<Candidate, "id">>>({
      imie: null,
      nazwisko: null,
      stanowisko: null,
      nazwa_pliku_CV: null,
    });
    const { isAllFilled } = useAllFilled(form);
    const positions = [
      { key: 0, label: "Frontend Developer" },
      { key: 1, label: "QA Engineer" },
      { key: 2, label: "Backend developer" },
    ];

    return {
      form,
      isAllFilled,
      positions,
    };
  },
});
</script>
