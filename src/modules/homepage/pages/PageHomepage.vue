<template>
  <main class="layout">
    <HomepageHeader>
    <template #right><div class="i-want-die"><div style="margin-right: 10px;">Witaj root</div> <Button @click="onClick">Wyloguj</Button></div></template>
    </HomepageHeader>
    <main class="content">
      <router-view />
    </main>
    <HomepageFooter />
  </main>
</template>

<script setup lang="ts">
import HomepageFooter from "@/modules/homepage/molecules/HomepageFooter.vue";
import HomepageHeader from "../molecules/HomepageHeader.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onClick = () => {
  console.log('go');
  localStorage.removeItem("token");
  window.location.reload();
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content {
  margin-top: $spacing-large;
  height: 70vh;
}
.i-want-die {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
