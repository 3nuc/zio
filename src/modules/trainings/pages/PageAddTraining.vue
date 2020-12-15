<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.nazwa" placeholder="Nazwa szkolenia" />
    </div>
    <div class="p-field">
      <Calendar v-model="form.data_szkolenia" placeholder="Wybierz datę" />
    </div>
    <div class="p-field">
      <Dropdown
        v-model="form.rodzaj_szkolenia"
        :options="training_types"
        option-label="nazwaSzkKat"
        placeholder="Kategoria projektu"
      />
    </div>
    <Button class="p-button-success" :disabled="!isAllFilled" @click="onCreate">Dodaj szkolenie</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { Training } from "@/mock-server";
import { PartialNull } from "@/utils/types";
import { useAllFilled } from "@/composables";
import { addSzkolenie } from "@/utils/api";
import { getSzkoleniaKategorie } from "@/utils/api/szkolenie_kat";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const form = reactive<PartialNull<Omit<Training, "id">>>({
      nazwa: null,
      data_szkolenia: null,
      rodzaj_szkolenia: null,
    });

    const training_types = ref<any>(null);
    const { isAllFilled } = useAllFilled(form);
    onMounted(async () => {
      training_types.value = await getSzkoleniaKategorie();
    });
    const onCreate = async () => {
      //@ts-expect-error xdd
      await addSzkolenie({ ...form, rodzaj_szkolenia: form.rodzaj_szkolenia.key });
      router.push("/home/trainings");
    };
    return {
      form,
      training_types,
      isAllFilled,
      onCreate,
    };
  },
});
</script>
