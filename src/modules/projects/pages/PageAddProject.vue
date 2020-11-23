<template>
  <form class="form">
    <label> Nazwa projektu <VkInput required v-model="form.nazwa" /> </label>
    <label>
      Kategoria
      <VkSelect
        required
        :options="categories ?? []"
        :value="form.kategoria_projektu"
      />
    </label>
    <label>
      Dodaj pracownika:
      <VkSelect
        :options="employees ?? []"
        :value="currentEmployee"
        key-prop="id"
        label-prop="firstName"
        @input="onEmployeeChange"
        placeholder="Wybierz pracownika"
      />
    </label>
    <label>
      Dodani pracownicy:
      <div>
        <div
          v-for="pracownik in form.pracownicy"
          :key="pracownik.id"
          class="added-employee"
        >
          <span>
            <span> {{ pracownik.firstName }} {{ pracownik.lastName }} </span>
          </span>
          <VkButton @click="onEmployeeDelete(pracownik.id)">Usuń</VkButton>
        </div>
      </div>
    </label>
    <VkButton class="submit"
      ><input type="submit" value="Dodaj projekt"
    /></VkButton>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import { useRequest } from "@/composables";
import VkInput from "@/components/VkInput.vue";
import VkSelect from "@/components/VkSelect.vue";
import VkButton from "@/components/VkButton.vue";
import { getEmployees } from "@/utils/service";
import { Employee } from "@/mock-server";
export default defineComponent({
  setup() {
    const form = reactive({
      nazwa: null,
      kategoria_projektu: 1,
      pracownicy: [] as Employee[],
    });
    const categories = computed(() => [
      { key: 1, label: "Kategoria 1" },
      { key: 2, label: "Kategoria 2" },
    ]);

    const { data: employees } = useRequest(getEmployees());
    const currentEmployee = ref<string | null>("0");

    const onEmployeeChange = (event: { target: HTMLSelectElement }) => {
      const isAlreadyAdded = form.pracownicy.some(
        (pracownik) => pracownik.id === event.target.value
      );
      if (isAlreadyAdded) return;
      currentEmployee.value = null;
      const employeeToAdd = employees.value?.find(
        (e) => e.id === event.target.value
      );
      if (employeeToAdd !== undefined) form.pracownicy.push(employeeToAdd);
    };

    const onEmployeeDelete = (employeeId: string) => {
      if (employees.value === null) return;
      employees.value = employees.value.filter((e) => e.id !== employeeId);
    };

    return {
      form,
      categories,
      employees,
      currentEmployee,
      onEmployeeChange,
      onEmployeeDelete,
    };
  },
  components: {
    VkInput,
    VkSelect,
    VkButton,
  },
});
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
.submit {
  margin-top: $spacing-large;
}
.added-employee {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50px;
  margin: {
    top: $spacing-small;
    bottom: $spacing-small;
  }
  > span {
    display: flex;
    align-items: center;
  }
}
</style>
