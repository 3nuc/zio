<template>
  <form class="p-fluid">
    <div class="p-field">
      <InputText v-model="form.imie" placeholder="Imie" />
    </div>
    <div class="p-field">
      <InputText v-model="form.nazwisko" placeholder="Nazwisko" />
    </div>
    <div class="p-field">
      <Dropdown v-model="form.stanowiska" :options="positions" option-label="nazwa" placeholder="Stanowisko" />
    </div>
    <Button class="p-button-success" @click="onAddEmployee" :disabled="!isOk">Dodaj pracownika</Button>
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
    const form = reactive<any>({
      imie: "",
      nazwisko: "",
      stanowisko: 0,
      typ_konta: 0,
    });

    const positions = ref<any>([]);

    onMounted(async () => {
      positions.value = await getStanowiska();
    });

    const onAddEmployee = async () => {
      await addPracownik({
        imie: form.imie,
        nazwisko: form.nazwisko,
        //@ts-expect-error xdd
        stanowisko: positions.value.find((x) => form.stanowisko === x.id),
        //@ts-ignore
        nazwa_pliku: "foo",
      });
      router.push("/home/employees");
    };
    const isOk = computed(() => {
      return form.imie.trim() && form.nazwisko.trim() && form.stanowisko !== null;
    })
    return {
      form,
      positions,
      onAddEmployee,
      isOk
    };
  },
});
</script>
