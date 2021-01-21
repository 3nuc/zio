<template>
  <div class="center">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/modules/auth/molecules/LoginForm.vue";
</script>

<style lang="scss">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
