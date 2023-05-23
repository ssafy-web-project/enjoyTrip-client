import Vue from "vue";
import http from "@/util/http.js";
import router from "@/router/index.js";
import util from "@/util/util.js";

const boardStore = {
  namespaced: true,
  state: {
    list: [],
    limit: 10,
    offset: 0,

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,
    currentPageIndex: 1,

    totalListItemCount: 0,

    // detail, update, delete
    noticeId: 0,
    title: "",
    content: "",
    name: "",
    registerTime: {},
    hit: 0,
    sameUser: false,
  },

  getters: {
    getBoardList: function (state) {
      return state.list;
    },
    // pagination
    getPageCount: function (state) {
      return Math.ceil(state.totalListItemCount / state.listRowCount);
    },
    getStartPageIndex: function (state) {
      if (state.currentPageIndex % state.pageLinkCount == 0) {
        //10, 20...맨마지막
        return (
          (state.currentPageIndex / state.pageLinkCount - 1) *
            state.pageLinkCount +
          1
        );
      } else {
        return (
          Math.floor(state.currentPageIndex / state.pageLinkCount) *
            state.pageLinkCount +
          1
        );
      }
    },
    getEndPageIndex: function (state, getters) {
      let ret = 0;
      if (state.currentPageIndex % state.pageLinkCount == 0) {
        //10, 20...맨마지막
        ret =
          (state.currentPageIndex / state.pageLinkCount - 1) *
            state.pageLinkCount +
          state.pageLinkCount;
      } else {
        ret =
          Math.floor(state.currentPageIndex / state.pageLinkCount) *
            state.pageLinkCount +
          state.pageLinkCount;
      }
      // 위 오류나는 코드를 아래와 같이 비교해서 처리
      return ret > getters.getPageCount ? getters.getPageCount : ret;
    },
    getPrev: function (state) {
      if (state.currentPageIndex <= state.pageLinkCount) {
        return false;
      } else {
        return true;
      }
    },
    getNext: function (state, getters) {
      if (
        Math.floor(getters.getPageCount / state.pageLinkCount) *
          state.pageLinkCount <
        state.currentPageIndex
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  mutations: {
    SET_BOARD_LIST(state, list) {
      state.list = list;
    },
    SET_BOARD_TOTAL_LIST_ITEM_COUNT(state, count) {
      state.totalListItemCount = count;
    },
    SET_BOARD_MOVE_PAGE(state, pageIndex) {
      state.offset = (pageIndex - 1) * state.listRowCount;
      state.currentPageIndex = pageIndex;
    },
    SET_BOARD_DETAIL(state, payload) {
      state.noticeId = payload.noticeId;
      state.title = payload.title;
      state.content = payload.content;
      state.name = payload.name;
      state.hit = payload.hit;
      state.registerTime = payload.registerTime;
      state.sameUser = payload.sameUser;
    },
  },
  actions: {
    boardList({ commit, state }) {
      http
        .get("/notices", {
          params: {
            limit: state.limit,
            offset: state.offset,
            searchWord: "",
          },
        })
        .then(({ data }) => {
          commit("SET_BOARD_LIST", data.list);
          commit("SET_BOARD_TOTAL_LIST_ITEM_COUNT", data.count);
        })
        .catch((error) => {
          console.log("ListVue: error ");
          console.log(error);
          Vue.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
    boardDetail({ commit }, { noticeId, id }) {
      http
        .get(`/notices/${noticeId}?userId=${id}`)
        .then(({ data }) => {
          console.log("DetailVue: data : ");
          console.log(data);

          console.log(
            new Date(data.dto.registerTime).getFullYear(),
            new Date(data.dto.registerTime).getMonth() + 1,
            new Date(data.dto.registerTime).getDate()
          );
          commit("SET_BOARD_DETAIL", {
            ...data.dto,
            registerTime: util.makeDateStr(
              new Date(data.dto.registerTime).getFullYear(),
              new Date(data.dto.registerTime).getMonth() + 1,
              new Date(data.dto.registerTime).getDate(),
              "."
            ),
          });

          router.push("/board/detail");
        })
        .catch((error) => {
          console.log(error);
          Vue.$swal("서버에 문제가 발생하였습니다.", { icon: "error" });
        });
    },
  },
};

export default boardStore;
