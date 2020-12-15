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
        v-model="form.stanowisko"
        :options="positions"
        option-label="label"
        option-key="id"
        placeholder="Stanowisko"
      />
    </div>
    <Button class="p-button-success" @click="onCreate">Dodaj kandydata</Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Candidate } from "@/mock-server";
import { PartialNull } from "@/utils/types";
import { useAllFilled } from "@/composables";
import { addKandydat, getStanowiska } from "@/utils/api";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const form = reactive<any>({
      imie: null,
      nazwisko: null,
      stanowisko: null,
      nazwa_pliku_CV: "plik.pdf",
    });
    const { isAllFilled } = useAllFilled(form);

    const positions = ref<{ key: number; label: string }[]>([]);

    onMounted(async () => {
      positions.value = (await getStanowiska()).map(({ id: key, nazwa: label }) => ({
        key,
        label,
      }));
    });

    const onCreate = async () => {
      await addKandydat({
        ...form,
        //@ts-expect-error foobar
        stanowisko: positions.value.find((x) => form.stanowisko?.key === x.id) ?? undefined,
      });
      router.push("/home/candidates");
    };

    return {
      form,
      isAllFilled,
      positions,
      onCreate,
    };
  },
});
</script>
