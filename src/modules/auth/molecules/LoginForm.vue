<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <picture class="splash">HR App</picture>
    <div class="gradient" />
    <VkLoader v-if="isLoading" />
    <template v-else>
      <div class="p-field">
        <InputText ref="first" autofocus v-model="username" :placeholder="$t('username')" class="item" />
      </div>
      <div class="p-field">
        <InputText v-model="password" type="password" :placeholder="$t('password')" class="item" />
      </div>
      <VkButton v-text="'Login'" @click="handleLogin" />
    </template>
  </form>
</template>

<script lang="ts">
import VkInput from "@/components/VkInput.vue";
import VkButton from "@/components/VkButton.vue";
import VkLoader from "@/components/VkLoader.vue";
import { getLogin } from "@/utils/api/login";
import { defineComponent, onMounted, ref } from "vue";
import { useUserStore } from "../store";
import { useRouter } from "vue-router";
const userStore = useUserStore();

export default defineComponent({
  components: {
    VkInput,
    VkButton,
    VkLoader,
  },
  setup() {
    const username = ref<string | null>("");
    const password = ref<string | null>("");
    const router = useRouter();
    const isLoading = ref(false);
    async function handleLogin() {
      isLoading.value = true;
      const { access_token, bearer_token } = await getLogin(username.value!, password.value!);
      localStorage.setItem("token", access_token);
      router.push("/home");
    }

    const first = ref<any>();
    onMounted(() => {
      first.value.$el.focus();
    });
    return {
      username,
      password,
      handleLogin,
      isLoading,
      first,
    };
  },
});
</script>

<style lang="scss">
.splash {
  font-size: 60px;
}
.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
}
.item {
  margin: 16px;
}
</style>
