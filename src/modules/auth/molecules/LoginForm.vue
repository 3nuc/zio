<template>
  <form class="p-card card p-fluid" @submit.prevent="handleLogin">
    <span class="rainbow-body">
      <ul class="c-rainbow">
        <li class="c-rainbow__layer c-rainbow__layer--white">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--orange">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--red">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--violet">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--blue">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--green">HR App</li>
        <li class="c-rainbow__layer c-rainbow__layer--yellow">HR App</li>
      </ul>
    </span>
    <div class="gradient" />
    <VkLoader v-if="isLoading" />
    <template v-else>
      <div class="p-field">
        <InputText autofocus v-model="username" placeholder="Nazwa użytkownika" class="item" />
      </div>
      <div class="p-field">
        <InputText v-model="password" type="password" placeholder="Hasło" class="item" />
      </div>
      <Button v-text="'Login'" type="submit" class="p-button-success" @click="handleLogin" />
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

    return {
      username,
      password,
      handleLogin,
      isLoading,
    };
  },
});
</script>

<style lang="scss">
.card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  padding: 2rem;
  margin: 2rem;
}
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
$root: ".c-rainbow";

:root {
  --color-background: #31037d;
  --axis-x: 1px;
  --axis-y: 1rem;
  --delay: 10;

  --color-black: #000;
  --color-white: #fff;
  --color-orange: #d49c3d;
  --color-red: #d14b3d;
  --color-violet: #cf52eb;
  --color-blue: #44a3f7;
  --color-green: #5acb3c;
  --color-yellow: #debf40;

  --color-foreground: var(--color-white);
  --font-name: Arial;
}

.rainbow-body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: var(--font-name);
  height: 100px;
}

#{$root} {
  counter-reset: rainbow;
  position: relative;
  display: block;

  list-style: none;

  padding: 0;
  margin: 0;

  &__layer {
    --text-color: var(--color-foreground);
    counter-increment: rainbow;
    font-size: 3rem;
    color: var(--text-color);

    text-shadow: -1px -1px 0 var(--color-black), 1px -1px 0 var(--color-black), -1px 1px 0 var(--color-black),
      1px 1px 0 var(--color-black), 4px 4px 0 rgba(0, 0, 0, 0.2);

    animation: rainbow 1.5s ease-in-out infinite;

    @for $i from 1 through 7 {
      &:nth-child(#{$i}) {
        animation-delay: calc(#{$i} / var(--delay) * 1s);
        left: calc(var(--axis-x) * #{$i});
        z-index: -#{$i * 10};
      }
    }

    &:not(:first-child) {
      position: absolute;
      top: 0;
    }

    &--white {
      --text-color: var(--color-white);
    }
    &--orange {
      --text-color: var(--color-orange);
    }
    &--red {
      --text-color: var(--color-red);
    }
    &--violet {
      --text-color: var(--color-violet);
    }
    &--blue {
      --text-color: var(--color-blue);
    }
    &--green {
      --text-color: var(--color-green);
    }
    &--yellow {
      --text-color: var(--color-yellow);
    }
  }
}

@keyframes rainbow {
  0%,
  100% {
    transform: translatey(var(--axis-y));
  }
  50% {
    transform: translatey(calc(var(--axis-y) * -1));
  }
}
</style>
