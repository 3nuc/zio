<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.nazwa" placeholder="Nazwa projektu" />
    </div>
    <div class="p-field">
      <Calendar v-model="form.data_szkolenia" placeholder="Wybierz datę" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.rodzaj_szkolenia"
        :options="training_types"
        option-label="name"
        placeholder="Kategoria projektu"
      />
    </div>
    <Button class="p-button-success" :disabled="!isAllFilled">Dodaj szkolenie</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { Training } from "@/mock-server";
import { PartialNull } from "@/utils/types";
import { useAllFilled } from "@/composables";
export default defineComponent({
  setup() {
    const form = reactive<PartialNull<Omit<Training, "id">>>({
      nazwa: null,
      data_szkolenia: null,
      rodzaj_szkolenia: null,
    });

    const training_types = computed(() => [
      { key: 0, name: "Normalne" },
      { key: 1, name: "Premium" },
    ]);

    const { isAllFilled } = useAllFilled(form);
    return {
      form,
      training_types,
      isAllFilled,
    };
  },
});
</script>
