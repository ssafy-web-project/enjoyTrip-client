import http from "@/util/http";

const planStore = {
  namespaced: true,
  state: {
    searchSpots: [],
    schedules: [],
    boardid: null,
  },
  getters: {},
  mutations: {
    CLEAR_SEARCHSPOT_LIST(state) {
      state.searchSpots = [];
    },
    CLEAR_SCHEDULE_LIST(state) {
      state.schedules = [];
    },
    CLEAR_BOARD_ID(state) {
      state.boardid = null;
    },
    SET_SEARCHSPOT_LIST(state, searchSpots) {
      state.searchSpots = searchSpots;
    },
    SET_SCHEDULE_LIST(state, schedules) {
      state.schedules = schedules;
    },
    SET_BOARD_ID(state, boardid) {
      state.boardid = boardid;
    },
  },
  actions: {
    searchSpot({ commit }, keyword) {
      http
        .get(`http://localhost:8080/api/v1/spot/search/${keyword}`)
        .then(({ data }) => {
          commit("SET_SEARCHSPOT_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async writeSchedule(context, param) {
      console.log(param.userId, param.title, param.content);
      await http
        .post(`http://localhost:8080/api/v1/notices/writeSchedule`, {
          userId: param.userId,
          title: param.title,
          content: param.content,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    writeScheduleSpot(context, param) {
      http
        .post(`http://localhost:8080/api/v1/notices/writeScheduleSpot`, {
          scheduleId: param.scheduleId,
          contentId: param.contentId,
          memo: param.memo,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getBoardid({ commit }, uid) {
      await http
        .get(
          `http://localhost:8080/api/v1/notices/writeSchedule/boardid/${uid}`
        )
        .then(({ data }) => {
          commit("SET_BOARD_ID", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default planStore;
