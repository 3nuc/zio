import { createStore } from "pinia";

interface UserStore {
  name: string;
}

const initialState: UserStore = {
  name: "Pinia",
};

export const useUserStore = createStore({
  id: "userStore",
  state: () => initialState,
  getters: {
    nameCapitalized() {
      this.name.toUpperCase();
    },
  },
});
