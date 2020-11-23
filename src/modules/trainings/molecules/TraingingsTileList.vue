<template>
  <vk-tile-list :items="trainings" key-prop="id" v-slot="{ item }">
    <router-link :to="{ name: 'SingleTraining', params: { id: item.id } }">
      <FaIcon :icon="['far', 'lightbulb']" />
      {{ item.nazwa }}
    </router-link>
  </vk-tile-list>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { Training } from "@/mock-server";
import VkTileList from "@/components/VkTileList.vue";
export default defineComponent({
  props: {
    trainings: { type: Array as PropType<Training[]>, required: true },
  },
  components: {
    VkTileList,
  },
});
</script>
