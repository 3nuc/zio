<template>
  <LoginForm />
  <router-view />
</template>

<script setup lang="ts">
export { default as LoginForm } from "@/modules/auth/molecules/LoginForm.vue";
</script>
