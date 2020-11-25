<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.nazwa" placeholder="Nazwa projektu" />
    </div>
    <div class="p-field">
      <Calendar v-model="form.data_skolenia" placeholder="Wybierz datę" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.rozdzaj_szkolenia"
        :options="training_types"
        option-label="name"
        placeholder="Kategoria projektu"
      />
    </div>
    <Button class="p-button-success">Dodaj kandydata</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { EmployeeProper, Training } from "@/mock-server";
export default defineComponent({
  setup() {
    const form = reactive<Omit<Training, "id">>({
      nazwa: "",
      data_szkolenia: new Date(),
      rodzaj_szkolenia: 0,
    });

    const training_types = computed(() => [
      { key: 0, name: "Normalne" },
      { key: 1, name: "Premium" },
    ]);

    return {
      form,
      training_types,
    };
  },
});
</script>
