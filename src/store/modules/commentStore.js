import http from "@/util/http";

const commentStore = {
  namespaced: true,
  state: {
    comments: [],
  },
  mutations: {
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
  },
  actions: {
    async commentCreate(context, { comment }) {
      console.log(comment);
      await http
        .post("/spot/comment", {
          contentId: comment.contentId,
          userId: comment.userId,
          content: comment.content,
        })
        .catch((err) => {
          alert("에러발생");
        });
    },
    getData({ commit }, contentId) {
      http
        .get(`http://localhost:8080/api/v1/spot/comment/${contentId}`)
        .then(({ data }) => {
          commit("SET_COMMENTS", data);
        })
        .catch(() => {
          alert("에러발생");
        });
    },
  },
};

export default commentStore;
