<template>
  <router-link :to="{ name: 'SingleEmployee', params: { id: employee.id } }" v-slot="{ href }" class="tile">
    <div v-text="`${employee.nazwisko} ${employee.imie}`" class="name text" />
    <div v-text="employee.workTitle" class="text" />
  </router-link>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Employee } from "@/mock-server";
export default defineComponent({
  props: {
    employee: { type: Object as PropType<Employee>, required: true },
  },
});
</script>

<style scoped lang="scss">
.tile {
  display: block;
  width: 100%;
  color: $color-secondary;
  padding: $spacing-small;
  width: 100%;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @include clickable;
}
.name {
  font-weight: bold;
}
</style>
