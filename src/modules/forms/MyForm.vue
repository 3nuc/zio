<template></template>

<script setup lang="ts">
const initialForm = {
  nested: {
    very: {
      deeply: {
        firstName: "firstName",
        lastName: "lastName",
      },
    },
  },
} as const;
</script>
