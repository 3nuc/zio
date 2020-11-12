<template>
  <article>
    <div v-for="employee in employees">
      <div>{{ employee.firstName }} {{ employee.lastName }}</div>
      <div v-text="employee.workTitle" />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Employee } from "@/mock-server";

export default defineComponent({
  props: {
    employees: Array as PropType<Employee[]>,
  },
  setup(props) {},
});
</script>

<style scoped lang="scss"></style>
