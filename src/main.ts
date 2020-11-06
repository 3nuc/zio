import { createApp } from "vue";
import App from "./App.vue";

import { router } from "@/utils/router";
import { i18n } from "@/utils/i18n/i18n";
import { store } from "@/utils/store";

import VkInput from "@/atoms/VkInput.vue";
import VkButton from "@/atoms/VkButton.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component("VkInput", VkInput);
app.component("VkButton", VkButton);

app.mount("#app");
