import { createApp } from "vue";
import App from "./App.vue";

import { router } from "@/utils/router";
import { i18n } from "@/utils/i18n/i18n";
import { store } from "@/utils/store";

import VkInput from "@/components/VkInput.vue";
import VkButton from "@/components/VkButton.vue";
import { makeServer } from "@/mock-server";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(far);
makeServer();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component("VkInput", VkInput);
app.component("VkButton", VkButton);
app.component("FaIcon", FontAwesomeIcon);

app.mount("#app");
