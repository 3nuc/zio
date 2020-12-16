import { createApp } from "vue";
import App from "./App.vue";

import { router } from "@/utils/router";
import { i18n } from "@/utils/i18n/i18n";
import { store } from "@/utils/store";

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import Calendar from "primevue/calendar";
import ToggleButton from "primevue/togglebutton";
import MultiSelect from "primevue/multiselect";
import Toolbar from "primevue/toolbar";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

library.add(far);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component("Upload", FileUpload);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);
app.component("Button", Button);
app.component("Calendar", Calendar);
app.component("MultiSelect", MultiSelect);
app.component("ToggleButton", ToggleButton);
app.component("Toolbar", Toolbar);
app.component("FaIcon", FontAwesomeIcon);

app.mount("#app");
