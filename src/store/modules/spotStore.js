import http from "@/util/http";

const spotStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    spots: [],
    filters: [],
    spot: null,
  },
  getters: {},
  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoId, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunId, text: gugun.gugunName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시도선택" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구군선택" }];
    },
    CLEAR_SPOT_LIST(state) {
      state.spots = [];
      state.spot = null;
    },
    CLEAR_DETAIL_SPOT(state) {
      state.spot = null;
    },
    CLEAR_SPOT_WID(state) {
      state.spotWid = null;
    },
    CLEAR_FILTER_LIST(state) {
      state.filters = [];
      state.spot = null;
    },
    SET_SPOT_LIST(state, spots) {
      state.spots = spots;
      state.filters = spots;
    },
    SET_DETAIL_SPOT(state, spot) {
      state.spot = spot;
    },
    FILTER_SPOTS_THEME(state, contentTypeId) {
      state.filters = [];
      if (contentTypeId == "0") state.filters = state.spots;
      else {
        state.spots.forEach((spot) => {
          if (spot.contentTypeId == contentTypeId) {
            state.filters.push(spot);
          }
        });
      }
    },
  },
  actions: {
    getSido({ commit }) {
      http
        .get(`http://localhost:8080/api/v1/spot/sido`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoId) {
      console.log(sidoId);
      http
        .get(`http://localhost:8080/api/v1/spot/${sidoId}`)
        .then(({ data }) => {
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSpotList({ commit }, param) {
      console.log(param.sidoId, param.gugunId);
      http
        .get(
          `http://localhost:8080/api/v1/spot/${param.sidoId}/${param.gugunId}`
        )
        .then(({ data }) => {
          commit("SET_SPOT_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getSpotDetail({ commit, state }, spotid) {
      await http
        .get(`http://localhost:8080/api/v1/spot/detail/${spotid}`)
        .then(({ data }) => {
          commit("SET_DETAIL_SPOT", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default spotStore;
