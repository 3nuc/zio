<template>
  <article>
    <EmployeeTile
      v-for="employee in employees"
      :key="employee.id"
      class="tile"
      :employee="employee"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Employee } from "@/mock-server";
import EmployeeTile from "@/modules/projects/atoms/EmployeeTile.vue";

export default defineComponent({
  components: { EmployeeTile },
  props: {
    employees: { type: Array as PropType<Employee[]>, required: true },
  },
});
</script>

<style scoped lang="scss">
.tile {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
