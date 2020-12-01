<template>
  <VkTileList :items="employees" key-prop="id" v-slot="{ item }">
    <router-link :to="`/home/employees/${item.id}`">
      <div class="name">
        <FaIcon :icon="['far', 'address-card']" />
        {{ item.imie }} {{ item.nazwisko }}
      </div>
      <div v-text="item.workTitle" class="title" />
    </router-link>
  </VkTileList>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Employee } from "@/mock-server";
import VkTileList from "@/components/VkTileList.vue";

export default defineComponent({
  props: {
    employees: { required: true, type: Array as PropType<Employee[]> },
  },
  components: {
    VkTileList,
  },
});
</script>

<style lang="scss" scoped>
.name {
  font-weight: bold;
}
</style>
