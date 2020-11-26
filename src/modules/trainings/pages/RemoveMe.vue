<template>
  <Button :disabled="!isFromValid">Dodaj kandydata</Button>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { Training } from "@/mock-server";
export default defineComponent({
  setup() {
    const form = reactive<Omit<Training, "id">>({
      nazwa: "",
      data_szkolenia: new Date(),
      rodzaj_szkolenia: 0,
    });

    const isFromValid = computed(() => Object.values(form).every((formValue) => !!formValue));
    return {
      form,
      isFromValid,
    };
  },
});
</script>
