<template>
  <table class="table">
    <thead>
      <tr>
        <TableHeader>Nazwa projektu</TableHeader>
        <TableHeader>Klient</TableHeader>
        <TableHeader>Project Manager</TableHeader>
        <TableHeader>Ilość osób w projekcie</TableHeader>
        <TableHeader>Data rozpoczęcia</TableHeader>
        <TableHeader>Data zakończenia</TableHeader>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr
        v-for="{
          id,
          name,
          client,
          projectManager,
          memberCount,
          startDate,
          endDate,
        } in items"
        :key="id"
      >
        <td v-text="name" />
        <td v-text="client.name" />
        <td v-text="projectManager.name" />
        <td v-text="memberCount" />
        <td v-text="startDate" />
        <td v-text="endDate" />
      </tr>
    </tbody>
  </table>
</template>

<script setup="props" lang="ts">
export { default as TableHeader } from "@/modules/projects/atoms/TableHeader.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const props: {
  items: {
    id: string;
    name: string;
    client: { name: string };
    projectManager: { name: string };
    memberCount: number;
    startDate: Date;
    endDate: Date;
  }[];
};
</script>

<style lang="scss">
.table {
  padding: $spacing-medium;
  &__body {
    min-height: 1000px;
  }
}
</style>
