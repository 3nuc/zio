<template>
  <table class="table">
    <thead class="table__head">
      <tr>
        <TableHeader v-for="{ name } in headers" v-text="name" :key="name" />
      </tr>
    </thead>
    <tbody class="table__body">
      <tr
        v-for="item in itemsFormatted"
        :key="item.id"
        @click="$router.push(`projects/${item.id}`)"
      >
        <td v-text="item.name" />
        <td v-text="item.client.name" />
        <td v-text="item.projectManager.name" />
        <td v-text="item.memberCount" />
        <td v-text="item.startDate" />
        <td v-text="item.endDate" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Project } from "@/mock-server";
import TableHeader from "@/modules/projects/atoms/TableHeader.vue";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    items: { required: true, type: Array as PropType<Project[]> },
  },
  setup(props) {
    const itemsFormatted = computed(() => {
      const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleString("pl-PL");
      if (!props.items) return [];
      return props.items.map((item) => ({
        ...item,
        startDate: formatDate(item.startDate.toString()),
        endDate: formatDate(item.endDate.toString()),
      }));
    });

    const headers = computed(() => [
      { name: "Nazwa projektu" },
      { name: "Klient" },
      { name: "Project Manager" },
      { name: "Ilość osób w projekcie" },
      { name: "Data rozpoczęcia" },
      { name: "Data zakończenia" },
    ]);

    return { itemsFormatted, headers };
  },
  components: {
    TableHeader,
  },
});
</script>

<style scoped lang="scss">
$border-params: 1px solid $color-secondary-75;
.table {
  padding: $spacing-medium;
  &__body {
    & > tr {
      transition: background-color ease-in-out $duration-short;
      &:hover {
        background: $color-primary-75;
        cursor: pointer;
      }
    }
    & > tr > td {
      text-align: center;
    }
  }
  &__head {
    & > tr > th {
      border-top: $border-params;
      border-bottom: $border-params;
      border-right: $border-params;
      padding: $spacing-large;
      &:first-child {
        border-radius: $border-radius 0 0 $border-radius;
        border-left: $border-params;
      }
      &:last-child {
        border-radius: 0 $border-radius $border-radius 0;
      }
    }
  }
}
</style>
