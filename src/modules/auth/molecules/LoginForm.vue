<template>
  <form @submit.prevent="handleLogin()">
    <VkInput v-model:value="username" :placeholder="$t('username')" />
    <VkInput
      v-model:value="password"
      type="password"
      :placeholder="$t('password')"
    />
    <VkButton v-t="'login'" />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../store";
const userStore = useUserStore();
export const username = ref(null);
export const password = ref(null);
export function handleLogin() {
  //login here
  console.log("hello");
}
</script>
