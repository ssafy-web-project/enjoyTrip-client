import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/userStore";
import createPersistedState from "vuex-persistedstate";
import boardStore from "./modules/boardStore";
import planStore from "@/store/modules/planStore";
import spotStore from "./modules/spotStore";
import mainStore from "./modules/mainStore";
import attraction from "./modules/attraction";
import commentStore from "./modules/commentStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    boardStore,
    planStore,
    spotStore,
    mainStore,
    attraction,
    commentStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
